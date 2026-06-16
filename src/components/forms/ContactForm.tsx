'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { submitLead, type FormState } from '@/app/(frontend)/actions/submitLead'
import { vi } from '@/dictionaries/vi'

const inputClass =
  'w-full rounded-[var(--radius-brand)] border border-border-soft bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-[var(--radius-brand)] bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
    >
      {pending ? vi.cta.sending : vi.cta.submit}
    </button>
  )
}

export function ContactForm({ sourcePage = '/lien-he' }: { sourcePage?: string }) {
  const [state, formAction] = useActionState<FormState, FormData>(submitLead, null)

  if (state?.ok) {
    return (
      <div className="flex items-start gap-3 rounded-[var(--radius-brand-lg)] border border-primary/30 bg-primary/5 p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-ink">Đã gửi thành công</p>
          <p className="mt-1 text-sm text-slate">{vi.form.successLead}</p>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={vi.form.fullName} required>
          <input name="fullName" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label={vi.form.company}>
          <input name="company" className={inputClass} autoComplete="organization" />
        </Field>
        <Field label={vi.form.email}>
          <input name="email" type="email" className={inputClass} autoComplete="email" />
        </Field>
        <Field label={vi.form.phone}>
          <input name="phone" className={inputClass} autoComplete="tel" />
        </Field>
        <Field label={vi.form.needType}>
          <select name="needType" className={inputClass} defaultValue="">
            <option value="" disabled>
              Chọn nhu cầu
            </option>
            <option value="product">Sản phẩm</option>
            <option value="solution">Giải pháp</option>
            <option value="consulting">Tư vấn bảo mật</option>
            <option value="other">Hỗ trợ khác</option>
          </select>
        </Field>
        <Field label={vi.form.companySize}>
          <select name="companySize" className={inputClass} defaultValue="">
            <option value="" disabled>
              Chọn quy mô
            </option>
            <option value="1-50">1–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1000</option>
            <option value="1000+">Trên 1000</option>
          </select>
        </Field>
      </div>
      <Field label={vi.form.message}>
        <textarea name="message" rows={4} className={inputClass} />
      </Field>

      {state && !state.ok && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
