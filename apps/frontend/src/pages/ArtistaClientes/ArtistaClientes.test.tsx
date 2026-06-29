import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, afterEach, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { ArtistaClientes } from './ArtistaClientes'
import type { User } from '../../types/api'

const users: User[] = [
  {
    id: '1',
    name: 'Maria Cliente',
    email: 'maria@test.com',
    role: 'CLIENT',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'João Cliente',
    email: 'joao@test.com',
    role: 'CLIENT',
    createdAt: '2024-03-20',
  },
  {
    id: '3',
    name: 'Carlos Artista',
    email: 'carlos@test.com',
    role: 'ARTIST',
    createdAt: '2024-02-10',
  },
]

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
})

function renderPage() {
  return render(
    <MemoryRouter>
      <ArtistaClientes />
    </MemoryRouter>,
  )
}

describe('ArtistaClientes', () => {
  it('shows loading state initially', () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(() => new Promise(() => {}))

    renderPage()
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders list of users', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, users)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    })
    expect(screen.getByText('João Cliente')).toBeInTheDocument()
    expect(screen.getByText('Carlos Artista')).toBeInTheDocument()
    expect(screen.getByText('maria@test.com')).toBeInTheDocument()
    expect(screen.getAllByText('CLIENT').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('ARTIST')).toBeInTheDocument()
  })

  it('filters users by search term', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, users)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(searchInput, 'Maria')

    expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    expect(screen.queryByText('João Cliente')).not.toBeInTheDocument()
    expect(screen.queryByText('Carlos Artista')).not.toBeInTheDocument()
  })

  it('shows empty state when no users', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/nenhum usuário/i)).toBeInTheDocument()
    })
  })

  it('shows error message on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(500)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/erro/i)).toBeInTheDocument()
    })
  })

  it('deletes a user with confirmation', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users').reply(200, users)
    mock.onDelete('/users/1').reply(200)

    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(() => true)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i })
    await userEvent.click(deleteButtons[0])

    expect(confirmSpy).toHaveBeenCalled()
    expect(mock.history.delete).toHaveLength(1)
    expect(mock.history.delete[0].url).toContain('/users/1')

    confirmSpy.mockRestore()
  })
})
