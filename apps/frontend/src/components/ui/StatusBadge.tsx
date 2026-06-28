import { CommissionStatus } from '../../types/api'

interface StatusBadgeProps {
  status: CommissionStatus
}

const statusConfig: Record<CommissionStatus, { label: string; className: string }> = {
  [CommissionStatus.PENDING]: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800',
  },
  [CommissionStatus.IN_PROGRESS]: {
    label: 'Em andamento',
    className: 'bg-blue-100 text-blue-800',
  },
  [CommissionStatus.WAITING_PAYMENT]: {
    label: 'Aguardando pagamento',
    className: 'bg-purple-100 text-purple-800',
  },
  [CommissionStatus.COMPLETED]: {
    label: 'Concluído',
    className: 'bg-green-100 text-green-800',
  },
  [CommissionStatus.CANCELLED]: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={[
        'inline-block rounded-full px-3 py-1 text-xs font-semibold',
        config.className,
      ].join(' ')}
    >
      {config.label}
    </span>
  )
}
