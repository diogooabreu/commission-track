import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Login } from './Login'
import type { LoginRequest } from '../../types/api'

const mockLogin = vi.fn()

vi.mock('../../stores/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    register: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<div>Cadastro Page</div>} />
        <Route path="/artista/painel" element={<div>Painel do Artista</div>} />
        <Route path="/cliente/comissoes" element={<div>Comissões Cliente</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Login', () => {
  beforeEach(() => {
    mockLogin.mockReset()
  })

  it('renders form fields', () => {
    renderLogin()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('has link to cadastro', () => {
    renderLogin()
    expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    renderLogin()
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('shows error for invalid email', async () => {
    renderLogin()
    await userEvent.type(screen.getByLabelText('Email'), 'invalido')
    await userEvent.type(screen.getByLabelText('Senha'), '12345678')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  it('calls login with form data on submit', async () => {
    mockLogin.mockResolvedValueOnce(undefined)
    renderLogin()
    await userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'teste@teste.com',
        password: 'Senha123',
      } satisfies LoginRequest)
    })
  })

  it('shows loading state during login', async () => {
    mockLogin.mockImplementation(() => new Promise(() => {}))
    renderLogin()
    await userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })

  it('shows error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Credenciais inválidas'))
    renderLogin()
    await userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    await waitFor(() => {
      expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument()
    })
  })
})
