import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthProvider } from '../../stores/AuthContext'
import { Role } from '../../types/api'

function renderWithProviders(path: string, ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <Routes>
          <Route path="/protegida" element={ui} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/artista/painel" element={<div>Painel do Artista</div>} />
          <Route path="/cliente/comissoes" element={<div>Comissões Cliente</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects to /login when not authenticated', async () => {
    renderWithProviders(
      '/protegida',
      <ProtectedRoute>
        <div>Conteúdo Protegido</div>
      </ProtectedRoute>,
    )
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })
    expect(screen.queryByText('Conteúdo Protegido')).not.toBeInTheDocument()
  })

  it('redirects ARTIST to /artista/painel when trying to access client route', async () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Test', email: 'test@test.com', role: Role.ARTIST, createdAt: '2024-01-01' }))

    renderWithProviders(
      '/protegida',
      <ProtectedRoute allowedRoles={[Role.CLIENT]}>
        <div>Conteúdo Cliente</div>
      </ProtectedRoute>,
    )
    await waitFor(() => {
      expect(screen.getByText('Painel do Artista')).toBeInTheDocument()
    })
    expect(screen.queryByText('Conteúdo Cliente')).not.toBeInTheDocument()
  })

  it('redirects CLIENT to /cliente/comissoes when trying to access artist route', async () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: '2', name: 'Client', email: 'client@test.com', role: Role.CLIENT, createdAt: '2024-01-01' }))

    renderWithProviders(
      '/protegida',
      <ProtectedRoute allowedRoles={[Role.ARTIST]}>
        <div>Conteúdo Artista</div>
      </ProtectedRoute>,
    )
    await waitFor(() => {
      expect(screen.getByText('Comissões Cliente')).toBeInTheDocument()
    })
    expect(screen.queryByText('Conteúdo Artista')).not.toBeInTheDocument()
  })

  it('renders children when authenticated with matching role', () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Test', email: 'test@test.com', role: Role.ARTIST, createdAt: '2024-01-01' }))

    renderWithProviders(
      '/protegida',
      <ProtectedRoute allowedRoles={[Role.ARTIST]}>
        <div>Conteúdo Protegido</div>
      </ProtectedRoute>,
    )
    expect(screen.getByText('Conteúdo Protegido')).toBeInTheDocument()
  })
})
