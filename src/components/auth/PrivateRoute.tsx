import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/hooks/useAuth'
import { LoadingSpinner } from '../shared/LoadingSpinner'

export function PrivateRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />
}