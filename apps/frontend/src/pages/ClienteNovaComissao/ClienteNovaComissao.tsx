import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import type { User, CreateCommissionRequest } from '../../types/api'

interface FieldErrors {
  title?: string
  description?: string
  price?: string
  artistId?: string
}

export function ClienteNovaComissao() {
  const navigate = useNavigate()

  const [artists, setArtists] = useState<User[]>([])
  const [isLoadingArtists, setIsLoadingArtists] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [deadline, setDeadline] = useState('')
  const [artistId, setArtistId] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  useEffect(() => {
    api.get<User[]>('/users')
      .then(({ data }) => setArtists(data.filter(u => u.role === 'ARTIST')))
      .catch(() => setApiError('Erro ao carregar artistas.'))
      .finally(() => setIsLoadingArtists(false))
  }, [])

  function validate(): FieldErrors {
    const errs: FieldErrors = {}
    if (!title.trim()) errs.title = 'Título é obrigatório.'
    if (!description.trim()) errs.description = 'Descrição é obrigatória.'
    if (!price || Number(price) <= 0) errs.price = 'Preço é obrigatório.'
    if (!artistId) errs.artistId = 'Selecione um artista.'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')

    const fieldErrors = validate()
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    setIsSubmitting(true)

    const payload: CreateCommissionRequest = {
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      deadline: deadline || undefined,
      artistId,
    }

    try {
      await api.post('/commissions', payload)
      navigate('/cliente/comissoes')
    } catch {
      setApiError('Erro ao criar comissão. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingArtists) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-tertiary">Carregando artistas...</p>
      </div>
    )
  }

  if (apiError && artists.length === 0) {
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-on-surface mb-6">
        Nova Comissão
      </h1>

      {apiError && (
        <div
          role="alert"
          className="mb-4 rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card space-y-5"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-tertiary"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-tertiary"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={2000}
            rows={4}
            className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary resize-y"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-tertiary"
          >
            Preço (R$)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-tertiary"
          >
            Prazo (opcional)
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface placeholder-tertiary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          />
        </div>

        <div>
          <label
            htmlFor="artistId"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-tertiary"
          >
            Artista
          </label>
          <select
            id="artistId"
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            className="w-full rounded-sm border border-[#e5e4e7] bg-surface px-4 py-2 text-sm text-on-surface focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          >
            <option value="">Selecione um artista</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name} — {artist.email}
              </option>
            ))}
          </select>
          {errors.artistId && (
            <p className="mt-1 text-xs text-red-600">{errors.artistId}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Criando...' : 'Criar Comissão'}
        </button>
      </form>
    </div>
  )
}
