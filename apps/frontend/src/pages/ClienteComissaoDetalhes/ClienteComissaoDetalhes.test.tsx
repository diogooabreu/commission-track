import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { ClienteComissaoDetalhes } from './ClienteComissaoDetalhes'
import { CommissionStatus } from '../../types/api'
import type { Commission, User, Delivery } from '../../types/api'

const artist: User = {
  id: 'artist-1',
  name: 'Carlos Artista',
  email: 'carlos@test.com',
  role: 'ARTIST',
  createdAt: '2024-01-01',
}

const commission: Commission = {
  id: '1',
  title: 'Retrato Digital',
  description: 'Ilustração digital em alta resolução',
  price: 150,
  status: CommissionStatus.IN_PROGRESS,
  deadline: '2024-06-01',
  clientId: 'client-1',
  artistId: 'artist-1',
  artist,
  createdAt: '2024-05-01',
}

const deliveries: Delivery[] = [
  {
    id: 'd1',
    fileUrl: 'https://exemplo.com/entrega.jpg',
    notes: 'Primeira versão',
    commissionId: '1',
    createdAt: '2024-05-15',
  },
]

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/cliente/comissoes/1']}>
      <Routes>
        <Route path="/cliente/comissoes/:id" element={<ClienteComissaoDetalhes />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ClienteComissaoDetalhes', () => {
  it('shows loading state initially', () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(() => new Promise(() => {}))
    mock.onGet('/deliveries/1').reply(() => new Promise(() => {}))

    renderPage()
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders commission details', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })
    expect(screen.getByText(/Ilustração digital em alta resolução/)).toBeInTheDocument()
    expect(screen.getByText(/Carlos Artista/)).toBeInTheDocument()
    expect(screen.getByText(/150\.00/)).toBeInTheDocument()
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
    expect(screen.getByText(/Primeira versão/)).toBeInTheDocument()
  })

  it('shows error message on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(500)
    mock.onGet('/deliveries/1').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/erro/i)).toBeInTheDocument()
    })
  })

  it('shows no deliveries message', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/Nenhuma entrega/i)).toBeInTheDocument()
    })
  })

  it('shows waiting message when commission is PENDING', async () => {
    const pendingCommission = { ...commission, status: CommissionStatus.PENDING }

    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, pendingCommission)
    mock.onGet('/deliveries/1').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/aguardando resposta/i)).toBeInTheDocument()
    })
  })

  it('shows refused message when commission is CANCELLED', async () => {
    const cancelledCommission = { ...commission, status: CommissionStatus.CANCELLED }

    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, cancelledCommission)
    mock.onGet('/deliveries/1').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/recusada/i)).toBeInTheDocument()
    })
  })

  it('shows accepted message when commission is IN_PROGRESS', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/aceita/i)).toBeInTheDocument()
    })
  })
})
