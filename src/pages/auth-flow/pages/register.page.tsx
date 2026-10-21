import React from 'react'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/register-form/register-form'

export const RegisterPage: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
      <RegisterForm />
      <p className="flex justify-center items-center h-screen">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500 font-medium hover:underline dark:text-blue-400">
          Login
        </Link>
      </p>
    </>
  )
}
