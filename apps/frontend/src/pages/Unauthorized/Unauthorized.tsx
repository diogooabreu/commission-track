import { Link } from 'react-router-dom'

export function Unauthorized() {
  return (
    <div className="mx-auto mt-24 max-w-md px-4 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e60023"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h1 className="font-display text-2xl font-bold text-on-surface">Acesso negado</h1>
      <p className="mt-2 text-tertiary">
        Você não tem permissão para acessar esta página.
      </p>
      <p className="mt-1 text-sm text-tertiary">
        Entre em contato com o administrador se precisar de acesso.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-sm bg-primary px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:brightness-90"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
