import { useState, useEffect, useMemo } from 'react'
import api from '../../services/api'
import type { User } from '../../types/api'

export function ArtistaClientes() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get<User[]>('/users/clients')
      .then(({ data }) => setUsers(data))
      .catch(() => setApiError('Erro ao carregar clientes. Tente novamente.'))
      .finally(() => setIsLoading(false))
  }, [])

  function handleRetry() {
    setIsLoading(true)
    setApiError('')
    api.get<User[]>('/users/clients')
      .then(({ data }) => setUsers(data))
      .catch(() => setApiError('Erro ao carregar clientes. Tente novamente.'))
      .finally(() => setIsLoading(false))
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Deseja mesmo excluir "${name}"?`)) return
    try {
      await api.delete(`/users/${id}`)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch {
      setApiError('Erro ao excluir usuário.')
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return users
    const q = search.toLowerCase()
    return users.filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
  }, [users, search])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-tertiary">Carregando...</p>
      </div>
    )
  }

  if (apiError && users.length === 0) {
    return (
      <div className="mx-auto mt-16 max-w-md px-4 text-center">
        <div
          role="alert"
          className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {apiError}
        </div>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 cursor-pointer rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-90"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
        Gerenciar Clientes
      </h1>

      <input
        type="text"
        placeholder="Buscar por nome ou email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
      />

      {filtered.length === 0 ? (
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-12 text-center">
          <p className="text-tertiary">
            {search ? 'Nenhum cliente encontrado para esta busca.' : 'Nenhum cliente encontrado.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card"
            >
              <div className="flex-1">
                <p className="font-display text-base font-semibold text-on-surface">
                  {user.name}
                </p>
                <p className="text-sm text-tertiary">{user.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-700">
                    {user.role}
                  </span>
                  <span className="text-xs text-tertiary">
                    Cadastro: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(user.id, user.name)}
                className="ml-4 cursor-pointer rounded-sm bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
