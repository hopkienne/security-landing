'use server'

import { getPayloadClient } from '@/lib/payload'

export type FormState = { ok: boolean; message?: string } | null

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const MAX_CV_BYTES = 5 * 1024 * 1024 // 5 MB

/**
 * Job application form. Uploads the CV into Media, then creates a JobApplication.
 * Email notification is sent only when SMTP is configured, otherwise skipped+logged.
 */
export async function submitJobApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const fullName = String(formData.get('fullName') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const portfolioUrl = String(formData.get('portfolioUrl') || '').trim()
  const coverMessage = String(formData.get('coverMessage') || '').trim()
  const jobId = String(formData.get('jobId') || '').trim()
  const cv = formData.get('cv')

  if (!fullName || !email) {
    return { ok: false, message: 'Vui lòng nhập họ tên và email.' }
  }
  if (!isEmail(email)) {
    return { ok: false, message: 'Email không hợp lệ.' }
  }

  try {
    const payload = await getPayloadClient()

    let cvFileId: number | undefined
    if (cv && cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES) {
        return { ok: false, message: 'Tệp CV vượt quá 5MB.' }
      }
      const buffer = Buffer.from(await cv.arrayBuffer())
      const media = await payload.create({
        collection: 'media',
        overrideAccess: true,
        data: { alt: `CV - ${fullName}` },
        file: {
          data: buffer,
          name: cv.name,
          mimetype: cv.type || 'application/octet-stream',
          size: cv.size,
        },
      })
      cvFileId = media.id
    }

    await payload.create({
      collection: 'job-applications',
      overrideAccess: true,
      data: {
        job: jobId ? Number(jobId) : undefined,
        fullName,
        email,
        phone: phone || undefined,
        portfolioUrl: portfolioUrl || undefined,
        coverMessage: coverMessage || undefined,
        cvFile: cvFileId,
        status: 'new',
      },
    })

    if (process.env.SMTP_HOST) {
      try {
        await payload.sendEmail({
          to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
          subject: `[SecureOps] Hồ sơ ứng tuyển mới từ ${fullName}`,
          text: `Họ tên: ${fullName}\nEmail: ${email}\nĐiện thoại: ${phone}\nPortfolio: ${portfolioUrl}\nThư: ${coverMessage}`,
        })
      } catch (err) {
        payload.logger.warn(
          `[submitJobApplication] Email notification failed: ${(err as Error).message}`,
        )
      }
    } else {
      payload.logger.info(
        '[submitJobApplication] SMTP not configured — application saved, email notification skipped.',
      )
    }

    return { ok: true, message: 'success' }
  } catch (err) {
    console.error('[submitJobApplication] failed:', err)
    return { ok: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại.' }
  }
}
