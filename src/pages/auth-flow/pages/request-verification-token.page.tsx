import React, { useState } from 'react'
import { FormWrapper } from '../components/form-wrapper/form-wrapper'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export const RequestVerificationTokenPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <FormWrapper
        title="Verification Email Sent"
        subtitle="Check your email for a verification link."
      />
    )
  }

  return (
    <FormWrapper
      title="Request Verification Token"
      subtitle="Enter your email address to receive a verification token."
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
        <Button className="w-full" disabled={!email} onClick={() => setSent(true)}>
          Resend Verification
        </Button>
      </div>
    </FormWrapper>
  )
}
