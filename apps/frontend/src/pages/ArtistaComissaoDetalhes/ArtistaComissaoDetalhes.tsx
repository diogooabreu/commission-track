import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { CommissionStatus } from '../../types/api'
import type { Commission, Delivery } from '../../types/api'

export function ArtistaComissaoDetalhes() {
  const { id } = useParams<{ id: string }>()
  const [commission, setCommission] = useState<Commission | null>(null)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    Promise.all([
      api.get<Commission>(`/commissions/${id}`),
      api.get<Delivery[]>(`/deliveries/${id}`),
    ])
      .then(([commissionRes, deliveriesRes]) => {
        if (cancelled) return
        setCommission(commissionRes.data)
        setDeliveries(deliveriesRes.data)
      })
      .catch(() => {
        if (!cancelled) setApiError('Erro ao carregar comissão. Tente novamente.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => { cancelled = true }
  }, [id])

  async function handleStatusChange(newStatus: CommissionStatus) {
    if (!id) return
    setUpdating(true)
    try {
      await api.patch(`/commissions/${id}/status`, { status: newStatus })
      setCommission(prev => prev ? { ...prev, status: newStatus } : null)
    } catch {
      setApiError('Erro ao atualizar status.')
    } finally {
      setUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-tertiary">Carregando...</p>
      </div>
    )
  }

  if (apiError || !commission) {
    return (
      <div className="mx-auto mt-16 max-w-md px-4 text-center">
        <div
          role="alert"
          className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {apiError || 'Comissão não encontrada.'}
        </div>
        <Link
          to="/artista/painel"
          className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-90"
        >
          Voltar para o painel
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/artista/painel"
        className="mb-6 inline-block text-sm text-tertiary no-underline hover:text-primary"
      >
        &larr; Voltar
      </Link>

      <div className="rounded-sm border border-[#e5e4e7] bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-on-surface">
            {commission.title}
          </h1>
          <StatusBadge status={commission.status} />
        </div>

        <p className="text-sm text-tertiary leading-relaxed mb-6">
          {commission.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <p className="text-xs text-tertiary uppercase tracking-wide">Cliente</p>
            <p className="text-sm font-semibold text-on-surface">
              {commission.client?.name ?? '---'}
            </p>
          </div>
          <div>
            <p className="text-xs text-tertiary uppercase tracking-wide">Valor</p>
            <p className="text-sm font-semibold text-on-surface">
              R$ {Number(commission.price).toFixed(2)}
            </p>
          </div>
          {commission.deadline && (
            <div>
              <p className="text-xs text-tertiary uppercase tracking-wide">Prazo</p>
              <p className="text-sm font-semibold text-on-surface">
                {new Date(commission.deadline).toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-tertiary uppercase tracking-wide">Criada em</p>
            <p className="text-sm font-semibold text-on-surface">
              {commission.createdAt
                ? new Date(commission.createdAt).toLocaleDateString('pt-BR')
                : '---'}
            </p>
          </div>
        </div>

        <div className="border-t border-[#e5e4e7] pt-4">
          <label
            htmlFor="status-select"
            className="text-xs text-tertiary uppercase tracking-wide block mb-2"
          >
            Status
          </label>
          <select
            id="status-select"
            value={commission.status}
            onChange={(e) => handleStatusChange(e.target.value as CommissionStatus)}
            disabled={updating}
            className="rounded-sm border border-[#e5e4e7] bg-surface px-3 py-2 text-sm text-on-surface focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          >
            <option value={CommissionStatus.PENDING}>Pendente</option>
            <option value={CommissionStatus.IN_PROGRESS}>Em andamento</option>
            <option value={CommissionStatus.WAITING_PAYMENT}>Aguardando pagamento</option>
            <option value={CommissionStatus.COMPLETED}>Concluído</option>
            <option value={CommissionStatus.CANCELLED}>Cancelado</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-bold text-on-surface mb-4">
          Entregas
        </h2>

        {deliveries.length === 0 ? (
          <div className="rounded-sm border border-[#e5e4e7] bg-surface p-8 text-center">
            <p className="text-tertiary">Nenhuma entrega realizada ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deliveries.map(delivery => (
              <div
                key={delivery.id}
                className="rounded-sm border border-[#e5e4e7] bg-surface p-4 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface">{delivery.notes}</span>
                  <p className="text-xs text-tertiary">
                    {new Date(delivery.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
