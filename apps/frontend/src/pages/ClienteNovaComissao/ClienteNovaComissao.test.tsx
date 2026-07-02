import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, afterEach, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { ClienteNovaComissao } from './ClienteNovaComissao'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const artists = [
  { id: 'art-1', name: 'Ana Artista', email: 'ana@test.com', role: 'ARTIST', createdAt: '2024-01-01' },
  { id: 'art-2', name: 'Bob Artista', email: 'bob@test.com', role: 'ARTIST', createdAt: '2024-02-01' },
]

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
  vi.clearAllMocks()
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/cliente/nova']}>
      <ClienteNovaComissao />
    </MemoryRouter>,
  )
}

describe('ClienteNovaComissao', () => {
  it('shows loading while fetching artists', () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(() => new Promise(() => {}))

    renderPage()
    expect(screen.getByText(/carregando artistas/i)).toBeInTheDocument()
  })

  it('renders the form with all fields', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, artists)

    renderPage()

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    })
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prazo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/artista/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar comissão/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, artists)

    renderPage()

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /criar comissão/i }))

    expect(screen.getByText(/título é obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
    expect(screen.getByText(/preço é obrigatório/i)).toBeInTheDocument()
    expect(screen.getAllByText(/selecione um artista/i).length).toBeGreaterThanOrEqual(1)
  })

  it('submits the form successfully and redirects', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, artists)
    mock.onPost('/commissions').reply(201)

    renderPage()

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    })

    await userEvent.type(screen.getByLabelText(/título/i), 'Nova Ilustração')
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Quero uma ilustração do meu gato')
    await userEvent.type(screen.getByLabelText(/preço/i), '150')
    await userEvent.type(screen.getByLabelText(/prazo/i), '2026-08-15')
    await userEvent.selectOptions(screen.getByLabelText(/artista/i), 'art-1')

    await userEvent.click(screen.getByRole('button', { name: /criar comissão/i }))

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1)
      expect(JSON.parse(mock.history.post[0].data)).toEqual({
        title: 'Nova Ilustração',
        description: 'Quero uma ilustração do meu gato',
        price: 150,
        deadline: '2026-08-15',
        artistId: 'art-1',
      })
    })

    expect(mockNavigate).toHaveBeenCalledWith('/cliente/comissoes')
  })

  it('shows error message on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, artists)
    mock.onPost('/commissions').reply(500)

    renderPage()

    await waitFor(() => {
      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    })

    await userEvent.type(screen.getByLabelText(/título/i), 'Nova Ilustração')
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Quero uma ilustração')
    await userEvent.type(screen.getByLabelText(/preço/i), '150')
    await userEvent.selectOptions(screen.getByLabelText(/artista/i), 'art-1')

    await userEvent.click(screen.getByRole('button', { name: /criar comissão/i }))

    await waitFor(() => {
      expect(screen.getByText(/erro ao criar comissão/i)).toBeInTheDocument()
    })
  })
})
