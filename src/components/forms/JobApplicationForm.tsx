'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import {
  submitJobApplication,
  type FormState,
} from '@/app/(frontend)/actions/submitJobApplication'
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
      {pending ? vi.cta.sending : vi.cta.apply}
    </button>
  )
}

export function JobApplicationForm({ jobId, jobTitle }: { jobId: number; jobTitle: string }) {
  const [state, formAction] = useActionState<FormState, FormData>(submitJobApplication, null)

  if (state?.ok) {
    return (
      <div className="flex items-start gap-3 rounded-[var(--radius-brand-lg)] border border-primary/30 bg-primary/5 p-6">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-ink">Đã nhận hồ sơ</p>
          <p className="mt-1 text-sm text-slate">{vi.form.successApplication}</p>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="jobId" value={jobId} />
      <p className="text-sm text-slate">
        Ứng tuyển vị trí: <span className="font-semibold text-ink">{jobTitle}</span>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={vi.form.fullName} required>
          <input name="fullName" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label={vi.form.email} required>
          <input name="email" type="email" required className={inputClass} autoComplete="email" />
        </Field>
        <Field label={vi.form.phone}>
          <input name="phone" className={inputClass} autoComplete="tel" />
        </Field>
        <Field label={vi.form.portfolioUrl}>
          <input name="portfolioUrl" className={inputClass} placeholder="https://" />
        </Field>
      </div>
      <Field label={vi.form.cv}>
        <input
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full text-sm text-slate file:mr-4 file:rounded-[var(--radius-brand)] file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
        />
      </Field>
      <Field label={vi.form.coverMessage}>
        <textarea name="coverMessage" rows={4} className={inputClass} />
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
