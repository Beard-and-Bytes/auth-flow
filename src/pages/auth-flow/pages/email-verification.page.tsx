import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BASE_PATH } from '../routes'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { FormWrapper } from '../components/form-wrapper/form-wrapper'

export const EmailVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [resendSent, setResendSent] = useState(false)
  const token = searchParams.get('token')

  if (token) {
    return (
      <FormWrapper
        title="Email Verified"
        subtitle="Your email address has been successfully verified."
      >
        <Link
          to={BASE_PATH}
          className="block text-center text-blue-500 font-medium hover:underline dark:text-blue-400"
        >
          Go to Login
        </Link>
      </FormWrapper>
    )
  }

  if (resendSent) {
    return (
      <FormWrapper
        title="Verification Email Sent"
        subtitle="Check your email for a new verification link."
      />
    )
  }

  return (
    <FormWrapper
      title="Link Expired"
      subtitle="Your verification link has expired. Enter your email to receive a new one."
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button className="w-full" disabled={!email} onClick={() => setResendSent(true)}>
          Resend Verification
        </Button>
      </div>
    </FormWrapper>
  )
}
