import { Link } from 'react-router-dom'
import { useAuth } from '../../stores/AuthContext'
import { Role } from '../../types/api'

function getDashboardLink(role: Role): string {
  if (role === Role.ARTIST) return '/artista/painel'
  return '/cliente/comissoes'
}

export function Landing() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div>
      <section className="mx-auto mt-16 max-w-3xl px-4 text-center sm:mt-24">
        <h1 className="font-display text-4xl font-bold text-on-surface sm:text-5xl">
          CommissionTrack
        </h1>
        <p className="mt-4 text-lg text-tertiary">
          Conectando artistas e clientes.
        </p>
        <p className="mt-2 text-sm text-tertiary">
          Gerencie comissões, acompanhe prazos e organize entregas em um só lugar.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          {isAuthenticated && user ? (
            <Link
              to={getDashboardLink(user.role)}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:brightness-90"
            >
              Ir para o painel
            </Link>
          ) : (
            <>
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:brightness-90"
              >
                Começar agora
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#e5e4e7] bg-surface px-6 py-2.5 text-sm font-semibold text-on-surface no-underline transition-colors hover:bg-[#f9f9f9]"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-4 sm:mt-32">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e60023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            </div>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Gerencie Comissões
            </h3>
            <p className="mt-1 text-sm text-tertiary">
              Crie e acompanhe pedidos de forma organizada.
            </p>
          </div>

          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e60023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Controle de Prazos
            </h3>
            <p className="mt-1 text-sm text-tertiary">
              Nunca perca um prazo de entrega novamente.
            </p>
          </div>

          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e60023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Entregas Organizadas
            </h3>
            <p className="mt-1 text-sm text-tertiary">
              Mantenha um histórico completo de entregas.
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-24 max-w-7xl border-t border-[#e5e4e7] px-4 py-8 text-center sm:mt-32">
        <p className="text-sm text-tertiary">
          &copy; {new Date().getFullYear()} CommissionTrack. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}
