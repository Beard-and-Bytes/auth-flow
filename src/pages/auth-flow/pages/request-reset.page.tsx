import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthCard } from '../components/auth-card/auth-card'
import { BASE_PATH } from '../routes'

type FormValues = { email: string }

const schema = z.object({
  email: z.email('Please enter a valid email'),
})

export const RequestResetPage: React.FC = () => {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    setSent(true)
  }

  return (
    <AuthCard>
      <h2 style={{ marginBottom: '4px' }}>Reset your password</h2>
      <p className="text-muted" style={{ fontSize: '13.5px', marginBottom: 'var(--space-6)' }}>
        Enter your email and we&apos;ll send you a reset token.
      </p>

      {sent ? (
        <div>
          <p style={{ fontSize: '14px', margin: '0 0 var(--space-6)' }}>
            Check your email for a link to reset your password. If it doesn&apos;t appear within a
            few minutes, check your spam folder.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => navigate(`${BASE_PATH}/reset-password`)}
          >
            Enter reset token
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field" style={{ marginBottom: 'var(--space-6)' }}>
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p
                style={{
                  fontSize: '12px',
                  color: '#c0392b',
                  marginTop: '4px',
                  marginBottom: 0,
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      )}

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
