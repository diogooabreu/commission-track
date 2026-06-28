import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { AppLayout } from './AppLayout'
import { AuthProvider } from '../../stores/AuthContext'

describe('AppLayout', () => {
  it('renders header', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<div>Conteúdo</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )
    expect(screen.getByText('CommissionTrack')).toBeInTheDocument()
  })

  it('renders children via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<div>Conteúdo da Página</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )
    expect(screen.getByText('Conteúdo da Página')).toBeInTheDocument()
  })
})
