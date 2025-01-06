import { Link } from 'react-router-dom'
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm'

export function ResetPassword() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <ResetPasswordForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/signin" className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}