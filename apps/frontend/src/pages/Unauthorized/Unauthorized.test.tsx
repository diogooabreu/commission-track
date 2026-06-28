import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { Unauthorized } from './Unauthorized'

function renderUnauthorized() {
  return render(
    <MemoryRouter>
      <Unauthorized />
    </MemoryRouter>,
  )
}

describe('Unauthorized', () => {
  it('renders access denied message', () => {
    renderUnauthorized()
    expect(screen.getByText(/acesso negado/i)).toBeInTheDocument()
  })

  it('renders permission message', () => {
    renderUnauthorized()
    expect(screen.getByText(/permissão/i)).toBeInTheDocument()
  })

  it('renders guidance text', () => {
    renderUnauthorized()
    expect(screen.getByText(/entre em contato/i)).toBeInTheDocument()
  })

  it('has link back to home', () => {
    renderUnauthorized()
    const link = screen.getByRole('link', { name: /voltar ao início/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
