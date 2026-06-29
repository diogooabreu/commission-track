import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/AuthContext'
import { Role } from '../../types/api'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-surface border-b border-[#e5e4e7]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-xl font-bold text-primary no-underline">
          CommissionTrack
        </Link>

        <nav className="flex items-center gap-4">
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-tertiary no-underline hover:text-on-surface transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white no-underline transition-colors hover:brightness-90"
              >
                Cadastrar
              </Link>
            </>
          )}

          {isAuthenticated && user && (
            <>
              {user.role === Role.ARTIST && (
                <>
                  <Link
                    to="/artista/painel"
                    className="text-sm font-medium text-tertiary no-underline hover:text-on-surface transition-colors"
                  >
                    Painel
                  </Link>
                  <Link
                    to="/artista/clientes"
                    className="text-sm font-medium text-tertiary no-underline hover:text-on-surface transition-colors"
                  >
                    Clientes
                  </Link>
                </>
              )}
              {user.role === Role.CLIENT && (
                <Link
                  to="/cliente/comissoes"
                  className="text-sm font-medium text-tertiary no-underline hover:text-on-surface transition-colors"
                >
                  Minhas Comissões
                </Link>
              )}

              <Link
                to="/perfil"
                className="text-sm font-medium text-tertiary no-underline hover:text-on-surface transition-colors"
              >
                {user.name}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer text-sm font-medium text-tertiary no-underline hover:text-primary transition-colors"
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
