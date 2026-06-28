import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { ArtistaComissaoDetalhes } from './ArtistaComissaoDetalhes'
import { CommissionStatus } from '../../types/api'
import type { Commission, User, Delivery } from '../../types/api'

const client: User = {
  id: 'client-1',
  name: 'Maria Cliente',
  email: 'maria@test.com',
  role: 'CLIENT',
  createdAt: '2024-01-01',
}

const commission: Commission = {
  id: '1',
  title: 'Retrato Digital',
  description: 'Ilustração digital em alta resolução',
  price: 150,
  status: CommissionStatus.PENDING,
  deadline: '2024-06-01',
  clientId: 'client-1',
  artistId: 'artist-1',
  client,
  createdAt: '2024-05-01',
}

const deliveries: Delivery[] = []

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/artista/comissoes/1']}>
      <Routes>
        <Route path="/artista/comissoes/:id" element={<ArtistaComissaoDetalhes />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ArtistaComissaoDetalhes', () => {
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
    expect(screen.getByText(/Maria Cliente/)).toBeInTheDocument()
    expect(screen.getByText(/150\.00/)).toBeInTheDocument()
    expect(screen.getAllByText('Pendente').length).toBeGreaterThanOrEqual(1)
  })

  it('shows status select', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
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
})
