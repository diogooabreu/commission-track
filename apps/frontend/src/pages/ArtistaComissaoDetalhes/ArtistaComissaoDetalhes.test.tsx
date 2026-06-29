import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('shows accept and refuse buttons when commission is PENDING', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /aceitar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /recusar/i })).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('hides accept/refuse and shows status select after accepting', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)
    mock.onPatch('/commissions/1/status').reply(200)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /aceitar/i }))

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
    expect(screen.queryByRole('button', { name: /aceitar/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /recusar/i })).not.toBeInTheDocument()
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

  it('shows delivery form with fileUrl and notes fields', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })

    expect(screen.getByPlaceholderText(/url do arquivo/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/observações/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar entrega/i })).toBeInTheDocument()
  })

  it('creates delivery and updates the list', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })

    const newDelivery: Delivery = {
      id: 'del-1',
      fileUrl: 'https://cdn.example.com/art.png',
      notes: 'Versão final',
      commissionId: '1',
      createdAt: '2024-06-01',
    }

    mock.onPost('/deliveries').reply(201, newDelivery)

    await userEvent.type(screen.getByPlaceholderText(/url do arquivo/i), 'https://cdn.example.com/art.png')
    await userEvent.type(screen.getByPlaceholderText(/observações/i), 'Versão final')
    await userEvent.click(screen.getByRole('button', { name: /adicionar entrega/i }))

    await waitFor(() => {
      expect(screen.getByText('Versão final')).toBeInTheDocument()
    })
    expect(screen.getByText(/ver arquivo/i)).toBeInTheDocument()
  })

  it('shows error when delivery creation fails', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/commissions/1').reply(200, commission)
    mock.onGet('/deliveries/1').reply(200, deliveries)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Retrato Digital')).toBeInTheDocument()
    })

    mock.onPost('/deliveries').reply(500)

    await userEvent.type(screen.getByPlaceholderText(/url do arquivo/i), 'https://cdn.example.com/art.png')
    await userEvent.click(screen.getByRole('button', { name: /adicionar entrega/i }))

    await waitFor(() => {
      expect(screen.getByText(/erro ao adicionar entrega/i)).toBeInTheDocument()
    })
  })
})
