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
    mock.onGet('/users/clients').reply(() => new Promise(() => {}))

    renderPage()
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders list of clients', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/clients').reply(200, users)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    })
    expect(screen.getByText('João Cliente')).toBeInTheDocument()
    expect(screen.getByText('maria@test.com')).toBeInTheDocument()
    expect(screen.getAllByText('CLIENT')).toHaveLength(2)
  })

  it('filters clients by search term', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/clients').reply(200, users)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(searchInput, 'Maria')

    expect(screen.getByText('Maria Cliente')).toBeInTheDocument()
    expect(screen.queryByText('João Cliente')).not.toBeInTheDocument()
  })

  it('shows empty state when no clients', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/clients').reply(200, [])

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/nenhum cliente/i)).toBeInTheDocument()
    })
  })

  it('shows error message on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/clients').reply(500)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText(/erro/i)).toBeInTheDocument()
    })
  })

  it('deletes a user with confirmation', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/clients').reply(200, users)
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
