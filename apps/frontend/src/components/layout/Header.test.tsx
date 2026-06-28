import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { Header } from './Header'
import { AuthProvider } from '../../stores/AuthContext'
import { Role } from '../../types/api'

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders logo', () => {
    renderWithRouter()
    expect(screen.getByText('CommissionTrack')).toBeInTheDocument()
  })

  it('shows login and cadastro links when not authenticated', () => {
    renderWithRouter()
    expect(screen.getByText('Entrar')).toBeInTheDocument()
    expect(screen.getByText('Cadastrar')).toBeInTheDocument()
  })

  it('shows artist nav links when authenticated as ARTIST', () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Artista', email: 'a@a.com', role: Role.ARTIST, createdAt: '2024-01-01' }))

    renderWithRouter()
    expect(screen.getByText('Painel')).toBeInTheDocument()
    expect(screen.getByText('Clientes')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('Artista')).toBeInTheDocument()
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument()
  })

  it('shows client nav links when authenticated as CLIENT', () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: '2', name: 'Cliente', email: 'c@c.com', role: Role.CLIENT, createdAt: '2024-01-01' }))

    renderWithRouter()
    expect(screen.getByText('Minhas Comissões')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument()
  })
})
