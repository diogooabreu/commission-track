import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../stores/AuthContext'
import { Role } from '../../types/api'

interface ProtectedRouteProps {
  children?: React.ReactNode
  allowedRoles?: Role[]
}

function getDefaultRoute(role: Role): string {
  if (role === Role.ARTIST) return '/artista/painel'
  return '/cliente/comissoes'
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRoute(user.role)} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
