import { Routes, Route } from 'react-router-dom'
import { PasswordResetPage } from './pages/password-reset.page'
import { LoginSplashPage } from './pages/login-splash.page'
import { RegisterPage } from './pages/register.page'
import { EmailVerificationPage } from './pages/email-verification.page'
import { RequestVerificationTokenPage } from './pages/request-verification-token.page'
import { RequestResetPage } from './pages/request-reset.page'

const App = () => (
  <Routes>
    <Route index element={<LoginSplashPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="verify-email" element={<EmailVerificationPage />} />
    <Route path="request-verification" element={<RequestVerificationTokenPage />} />
    <Route path="request-reset" element={<RequestResetPage />} />
    <Route path="reset-password" element={<PasswordResetPage />} />
  </Routes>
)

export default App
