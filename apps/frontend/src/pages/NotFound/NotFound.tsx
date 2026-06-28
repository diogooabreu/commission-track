import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto mt-24 max-w-md px-4 text-center">
      <h1 className="font-display text-7xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-tertiary">
        Página não encontrada
      </p>
      <p className="mt-2 text-sm text-tertiary">
        A página que você procura não existe ou foi removida.
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
