import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { AuthCard } from '../components/auth-card/auth-card'
import { PasswordField } from '../components/password-field/password-field'
import { BASE_PATH } from '../routes'

type FormValues = {
  token: string
  newPassword: string
  confirmPassword: string
}

const schema = z
  .object({
    token: z.string().min(6, 'Token must be at least 6 characters'),
    newPassword: z
      .string()
      .min(12, 'Must be at least 12 characters')
      .refine((v) => /[A-Z]/.test(v), 'Must contain at least one uppercase letter')
      .refine((v) => /[a-z]/.test(v), 'Must contain at least one lowercase letter')
      .refine((v) => /[0-9]/.test(v), 'Must contain at least one digit')
      .refine((v) => /[^A-Za-z0-9]/.test(v), 'Must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const PasswordResetPage: React.FC = () => {
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    register,
    control,
    trigger,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const newPassword = useWatch({ control, name: 'newPassword' })

  useEffect(() => {
    if (isSubmitted) {
      trigger('confirmPassword')
    }
  }, [newPassword, isSubmitted, trigger])

  const onSubmit = () => {
    setDone(true)
  }

  if (done) {
    return (
      <AuthCard>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '4px' }}>Password reset</h2>
          <p className="text-muted" style={{ fontSize: '13.5px', marginBottom: 'var(--space-6)' }}>
            Your password has been reset successfully.
          </p>
          <button className="btn btn-primary btn-block" onClick={() => navigate(BASE_PATH)}>
            Go to login
          </button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <h2 style={{ marginBottom: '4px' }}>Reset your password</h2>
      <p className="text-muted" style={{ fontSize: '13.5px', marginBottom: 'var(--space-6)' }}>
        Please enter the reset token sent to your email and your new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field" style={{ marginBottom: 'var(--space-4)' }}>
          <label htmlFor="token">Reset Token</label>
          <input
            className="input"
            id="token"
            type="text"
            placeholder="Enter 6-digit token"
            aria-invalid={!!errors.token}
            {...register('token')}
          />
          {errors.token && (
            <p
              style={{
                fontSize: '12px',
                color: '#c0392b',
                marginTop: '4px',
                marginBottom: 0,
              }}
            >
              {errors.token.message}
            </p>
          )}
        </div>

        <PasswordField
          id="newPassword"
          label="New Password"
          placeholder="Enter new password"
          wrapperStyle={{ marginBottom: 'var(--space-4)' }}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm new password"
          wrapperStyle={{ marginBottom: 'var(--space-6)' }}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <button type="submit" className="btn btn-primary btn-block">
          Reset Password
        </button>
      </form>

      <p
        style={{
          textAlign: 'center',
          fontSize: '13.5px',
          marginTop: 'var(--space-6)',
          marginBottom: 0,
        }}
      >
        <span
          role="button"
          tabIndex={0}
          onClick={() => navigate(BASE_PATH)}
          onKeyDown={(e) => e.key === 'Enter' && navigate(BASE_PATH)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '13px',
            color: 'var(--color-accent-700)',
            cursor: 'pointer',
          }}
        >
          Back to login
        </span>
      </p>
    </AuthCard>
  )
}
