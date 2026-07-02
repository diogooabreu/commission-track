import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { NotFound } from './NotFound'

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  )
}

describe('NotFound', () => {
  it('renders 404 message', () => {
    renderNotFound()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders page not found text', () => {
    renderNotFound()
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument()
  })

  it('has link back to home', () => {
    renderNotFound()
    const link = screen.getByRole('link', { name: /voltar ao início/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
