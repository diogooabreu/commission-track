import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { ArtistaPainel } from './ArtistaPainel'
import { CommissionStatus } from '../../types/api'
import type { Commission, User } from '../../types/api'

const client: User = {
  id: 'client-1',
  name: 'Maria',
  email: 'maria@test.com',
  role: 'CLIENT',
  createdAt: '2024-01-01',
}

const commissions: Commission[] = [
  {
    id: '1',
    title: 'Retrato Digital',
    description: 'Descrição',
    price: 150,
    status: CommissionStatus.PENDING,
    deadline: null,
    clientId: 'client-1',
    artistId: 'artist-1',
    client,
  },
  {
    id: '2',
    title: 'Ilustração',
    description: 'Descrição',
    price: 200,
    status: CommissionStatus.IN_PROGRESS,
    deadline: '2024-06-01',
    clientId: 'client-1',
    artistId: 'artist-1',
    client,
  },
]

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
})

function renderPainel() {
  return render(
    <MemoryRouter>
      <ArtistaPainel />
    </MemoryRouter>,
  )
}

describe('ArtistaPainel', () => {
  it('shows loading state initially', () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions').reply(() => new Promise(() => {}))

    renderPainel()
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders list of commissions', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions').reply(200, commissions)

    renderPainel()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })
    expect(screen.getByText('Ilustração')).toBeInTheDocument()
    expect(screen.getAllByText(/Maria/)).toHaveLength(2)
    expect(screen.getAllByText('Pendente').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Em andamento').length).toBeGreaterThanOrEqual(1)
  })

  it('shows summary cards', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions').reply(200, commissions)

    renderPainel()

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  it('shows empty state when no commissions', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions').reply(200, [])

    renderPainel()

    await waitFor(() => {
      expect(screen.getByText(/nenhuma comissão/i)).toBeInTheDocument()
    })
  })

  it('shows error message on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions').reply(500)

    renderPainel()

    await waitFor(() => {
      expect(screen.getByText(/erro/i)).toBeInTheDocument()
    })
  })
})
