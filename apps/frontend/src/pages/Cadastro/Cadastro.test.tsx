import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Cadastro } from './Cadastro'
import { Role } from '../../types/api'
import type { RegisterRequest } from '../../types/api'

const mockRegister = vi.fn()

vi.mock('../../stores/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister,
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

function renderCadastro() {
  return render(
    <MemoryRouter initialEntries={['/cadastro']}>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/artista/painel" element={<div>Painel do Artista</div>} />
        <Route path="/cliente/comissoes" element={<div>Comissões Cliente</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Cadastro', () => {
  beforeEach(() => {
    mockRegister.mockReset()
  })

  it('renders form fields', () => {
    renderCadastro()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Tipo de conta')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument()
  })

  it('has link to login', () => {
    renderCadastro()
    expect(screen.getByText(/faça login/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    renderCadastro()
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    })
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
  })

  it('shows error for invalid email', async () => {
    renderCadastro()
    await userEvent.type(screen.getByLabelText('Nome'), 'Teste')
    await userEvent.type(screen.getByLabelText('Email'), 'invalido')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  it('shows error for weak password', async () => {
    renderCadastro()
    await userEvent.type(screen.getByLabelText('Nome'), 'Teste')
    await userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), '123')
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
    })
  })

  it('calls register with form data on submit', async () => {
    mockRegister.mockResolvedValueOnce(undefined)
    renderCadastro()
    await userEvent.type(screen.getByLabelText('Nome'), 'Novo Usuário')
    await userEvent.type(screen.getByLabelText('Email'), 'novo@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.selectOptions(screen.getByLabelText('Tipo de conta'), Role.CLIENT)
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'Novo Usuário',
        email: 'novo@teste.com',
        password: 'Senha123',
        role: Role.CLIENT,
      } satisfies RegisterRequest)
    })
  })

  it('shows loading state during register', async () => {
    mockRegister.mockImplementation(() => new Promise(() => {}))
    renderCadastro()
    await userEvent.type(screen.getByLabelText('Nome'), 'Teste')
    await userEvent.type(screen.getByLabelText('Email'), 'teste@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeDisabled()
  })

  it('shows error message on register failure', async () => {
    mockRegister.mockRejectedValueOnce(new Error('Email já cadastrado'))
    renderCadastro()
    await userEvent.type(screen.getByLabelText('Nome'), 'Teste')
    await userEvent.type(screen.getByLabelText('Email'), 'existente@teste.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'Senha123')
    await userEvent.click(screen.getByRole('button', { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText('Email já cadastrado')).toBeInTheDocument()
    })
  })
})
