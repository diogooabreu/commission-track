import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { CommissionStatus } from '../../types/api'
import type { Commission } from '../../types/api'

function getStatusCounts(commissions: Commission[]) {
  const total = commissions.length
  const pending = commissions.filter(c => c.status === CommissionStatus.PENDING).length
  const inProgress = commissions.filter(c => c.status === CommissionStatus.IN_PROGRESS).length
  const completed = commissions.filter(c => c.status === CommissionStatus.COMPLETED).length
  return { total, pending, inProgress, completed }
}

export function ClienteComissoes() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    api.get<Commission[]>('/commissions')
      .then(({ data }) => setCommissions(data))
      .catch(() => setApiError('Erro ao carregar comissões. Tente novamente.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-tertiary">Carregando...</p>
      </div>
    )
  }

  if (apiError) {
    return (
      <div className="mx-auto mt-16 max-w-md px-4 text-center">
        <div
          role="alert"
          className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {apiError}
        </div>
      </div>
    )
  }

  const counts = getStatusCounts(commissions)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-on-surface">
          Minhas Comissões
        </h1>
        <Link
          to="/cliente/nova"
          className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-90"
        >
          Nova Comissão
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card">
          <p className="text-sm text-tertiary">Total</p>
          <p className="font-display text-2xl font-bold text-on-surface">{counts.total}</p>
        </div>
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card">
          <p className="text-sm text-tertiary">Pendentes</p>
          <p className="font-display text-2xl font-bold text-yellow-600">{counts.pending}</p>
        </div>
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card">
          <p className="text-sm text-tertiary">Em andamento</p>
          <p className="font-display text-2xl font-bold text-blue-600">{counts.inProgress}</p>
        </div>
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card">
          <p className="text-sm text-tertiary">Concluídas</p>
          <p className="font-display text-2xl font-bold text-green-600">{counts.completed}</p>
        </div>
      </div>

      {commissions.length === 0 ? (
        <div className="rounded-sm border border-[#e5e4e7] bg-surface p-12 text-center">
          <p className="text-tertiary">Nenhuma comissão encontrada.</p>
          <p className="mt-1 text-sm text-tertiary">
            Crie uma nova comissão para começar.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {commissions.map(commission => (
            <div
              key={commission.id}
              className="flex items-center justify-between rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/cliente/comissoes/${commission.id}`}
                    className="font-display text-base font-semibold text-on-surface no-underline hover:text-primary"
                  >
                    {commission.title}
                  </Link>
                  <StatusBadge status={commission.status} />
                </div>
                <p className="mt-1 text-sm text-tertiary">
                  Artista: {commission.artist?.name ?? '---'} &middot; R$ {Number(commission.price).toFixed(2)}
                  {commission.deadline && ` · Prazo: ${new Date(commission.deadline).toLocaleDateString('pt-BR')}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
