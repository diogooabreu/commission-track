import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatusBadge } from './StatusBadge'
import { CommissionStatus } from '../../types/api'

describe('StatusBadge', () => {
  it('renders PENDING status', () => {
    render(<StatusBadge status={CommissionStatus.PENDING} />)
    const badge = screen.getByText('Pendente')
    expect(badge).toBeInTheDocument()
  })

  it('renders IN_PROGRESS status', () => {
    render(<StatusBadge status={CommissionStatus.IN_PROGRESS} />)
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
  })

  it('renders WAITING_PAYMENT status', () => {
    render(<StatusBadge status={CommissionStatus.WAITING_PAYMENT} />)
    expect(screen.getByText('Aguardando pagamento')).toBeInTheDocument()
  })

  it('renders COMPLETED status', () => {
    render(<StatusBadge status={CommissionStatus.COMPLETED} />)
    expect(screen.getByText('Concluído')).toBeInTheDocument()
  })

  it('renders CANCELLED status', () => {
    render(<StatusBadge status={CommissionStatus.CANCELLED} />)
    expect(screen.getByText('Cancelado')).toBeInTheDocument()
  })
})
