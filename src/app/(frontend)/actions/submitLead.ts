'use server'

import { getPayloadClient } from '@/lib/payload'

export type FormState = { ok: boolean; message?: string } | null

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Contact / consultation form. Always persists a Lead. Sends an email
 * notification only when SMTP is configured; otherwise logs that it was skipped.
 */
export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get('fullName') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const needType = String(formData.get('needType') || '').trim()
  const companySize = String(formData.get('companySize') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const sourcePage = String(formData.get('sourcePage') || '/lien-he').trim()

  if (!fullName || (!email && !phone)) {
    return { ok: false, message: 'Vui lòng nhập họ tên và ít nhất một cách liên hệ (email hoặc số điện thoại).' }
  }
  if (email && !isEmail(email)) {
    return { ok: false, message: 'Email không hợp lệ.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        fullName,
        email: email || undefined,
        phone: phone || undefined,
        company: company || undefined,
        needType: (needType || undefined) as never,
        companySize: (companySize || undefined) as never,
        message: message || undefined,
        sourcePage,
        status: 'new',
      },
    })

    if (process.env.SMTP_HOST) {
      try {
        await payload.sendEmail({
          to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
          subject: `[SecureOps] Yêu cầu tư vấn mới từ ${fullName}`,
          text: `Họ tên: ${fullName}\nCông ty: ${company}\nEmail: ${email}\nĐiện thoại: ${phone}\nNhu cầu: ${needType}\nQuy mô: ${companySize}\nNội dung: ${message}\nTrang: ${sourcePage}`,
        })
      } catch (err) {
        payload.logger.warn(`[submitLead] Email notification failed: ${(err as Error).message}`)
      }
    } else {
      payload.logger.info('[submitLead] SMTP not configured — lead saved, email notification skipped.')
    }

    return { ok: true, message: 'success' }
  } catch (err) {
    console.error('[submitLead] failed:', err)
    return { ok: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại.' }
  }
}
