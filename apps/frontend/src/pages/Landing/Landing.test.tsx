import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { Landing } from './Landing'

vi.mock('../../stores/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}))

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
  )
}

describe('Landing', () => {
  it('renders hero title', () => {
    renderLanding()
    expect(screen.getByText('CommissionTrack')).toBeInTheDocument()
  })

  it('renders hero subtitle', () => {
    renderLanding()
    expect(screen.getByText(/conectando artistas e clientes/i)).toBeInTheDocument()
  })

  it('has call-to-action buttons for unauthenticated users', () => {
    renderLanding()
    const cadastrar = screen.getByRole('link', { name: /começar agora/i })
    expect(cadastrar).toBeInTheDocument()
    expect(cadastrar).toHaveAttribute('href', '/cadastro')

    const entrar = screen.getByRole('link', { name: /entrar/i })
    expect(entrar).toBeInTheDocument()
    expect(entrar).toHaveAttribute('href', '/login')
  })

  it('renders feature cards', () => {
    renderLanding()
    expect(screen.getByText('Gerencie Comissões')).toBeInTheDocument()
    expect(screen.getByText('Controle de Prazos')).toBeInTheDocument()
    expect(screen.getByText('Entregas Organizadas')).toBeInTheDocument()
  })

  it('renders footer with current year', () => {
    renderLanding()
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument()
  })
})
