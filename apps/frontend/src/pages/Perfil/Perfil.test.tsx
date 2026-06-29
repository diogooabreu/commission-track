import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, afterEach, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'
import { Perfil } from './Perfil'
import type { User } from '../../types/api'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockLogout = vi.fn()
vi.mock('../../stores/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user-1', name: 'Maria', email: 'maria@test.com', role: 'CLIENT' },
    logout: mockLogout,
  }),
}))

const userMe: User = {
  id: 'user-1',
  name: 'Maria Artista',
  email: 'maria@test.com',
  role: 'ARTIST',
  createdAt: '2024-01-15T10:00:00Z',
}

let mock: MockAdapter

afterEach(() => {
  mock?.restore()
  vi.clearAllMocks()
})

function renderPage() {
  return render(
    <MemoryRouter>
      <Perfil />
    </MemoryRouter>,
  )
}

describe('Perfil', () => {
  it('shows loading state initially', () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/me').reply(() => new Promise(() => {}))

    renderPage()
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders user profile with avatar and info', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/me').reply(200, userMe)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Artista')).toBeInTheDocument()
    })
    expect(screen.getByText('maria@test.com')).toBeInTheDocument()
    expect(screen.getByText('ARTIST')).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/novo nome/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /editar perfil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /trocar senha/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /excluir conta/i })).toBeInTheDocument()
  })

  it('edits user name successfully', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/me').reply(200, userMe)
    mock.onPatch('/users/user-1').reply(200, { id: 'user-1', name: 'Novo Nome' })

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Artista')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText(/novo nome/i)
    await userEvent.clear(input)
    await userEvent.type(input, 'Novo Nome')

    await userEvent.click(screen.getByRole('button', { name: /editar perfil/i }))

    await waitFor(() => {
      expect(mock.history.patch).toHaveLength(1)
      expect(JSON.parse(mock.history.patch[0].data)).toEqual({ name: 'Novo Nome' })
    })
    expect(screen.getByText('Novo Nome')).toBeInTheDocument()
  })

  it('deletes account with confirmation and redirects to login', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/me').reply(200, userMe)
    mock.onDelete('/users/user-1').reply(200)

    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(() => true)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Artista')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /excluir conta/i }))

    expect(confirmSpy).toHaveBeenCalled()
    expect(mock.history.delete).toHaveLength(1)
    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')

    confirmSpy.mockRestore()
  })

  it('shows error on API failure', async () => {
    mock = new MockAdapter(api)
    mock.onGet('/users/me').reply(200, userMe)
    mock.onPatch('/users/user-1').reply(500)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Maria Artista')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /editar perfil/i }))

    await waitFor(() => {
      expect(screen.getByText(/erro ao atualizar perfil/i)).toBeInTheDocument()
    })
  })
})
