import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../stores/AuthContext'
import type { User } from '../../types/api'

export function Perfil() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [profile, setProfile] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const [editName, setEditName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    api.get<User>('/users/me')
      .then(({ data }) => {
        setProfile(data)
        setEditName(data.name)
      })
      .catch(() => setApiError('Erro ao carregar perfil.'))
      .finally(() => setIsLoading(false))
  }, [])

  async function handleEditProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!profile || !editName.trim()) return
    setIsSaving(true)
    setApiError('')

    try {
      const { data } = await api.patch<User>(`/users/${profile.id}`, { name: editName.trim() })
      setProfile(prev => prev ? { ...prev, name: data.name } : null)
    } catch {
      setApiError('Erro ao atualizar perfil.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteAccount() {
    if (!profile) return
    if (!window.confirm(`Tem certeza que deseja excluir sua conta "${profile.name}"? Esta ação é irreversível.`)) return

    try {
      await api.delete(`/users/${profile.id}`)
      logout()
      navigate('/login')
    } catch {
      setApiError('Erro ao excluir conta.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-tertiary">Carregando...</p>
      </div>
    )
  }

  if (apiError && !profile) {
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
          onClick={() => window.location.reload()}
          className="mt-4 cursor-pointer rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-90"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (!profile) return null

  const initials = profile.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-8">
        Meu Perfil
      </h1>

      {apiError && (
        <div
          role="alert"
          className="mb-4 rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {apiError}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
            {initials}
          </div>
          <h2 className="font-display text-lg font-bold text-on-surface">
            {profile.name}
          </h2>
          <p className="text-sm text-tertiary">{profile.email}</p>
          <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold text-gray-700">
            {profile.role}
          </span>
          <p className="mt-4 text-xs text-tertiary">
            Membro desde {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-4">
          <form
            onSubmit={handleEditProfile}
            className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card space-y-3"
          >
            <h3 className="font-display text-base font-bold text-on-surface">
              Editar Perfil
            </h3>
            <input
              type="text"
              placeholder="Novo nome"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
            />
            <button
              type="submit"
              disabled={isSaving || !editName.trim()}
              className="w-full cursor-pointer rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Editar Perfil'}
            </button>
          </form>

          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card space-y-3">
            <h3 className="font-display text-base font-bold text-on-surface">
              Segurança
            </h3>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-tertiary"
              title="Em breve"
            >
              Trocar Senha
            </button>
          </div>

          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card space-y-3">
            <h3 className="font-display text-base font-bold text-on-surface">
              Zona de Perigo
            </h3>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full cursor-pointer rounded-sm bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Excluir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
