import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Conteúdo</p></Card>)
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })

  it('applies shadow-card class', () => {
    render(<Card data-testid="card">Card</Card>)
    expect(screen.getByTestId('card').className).toContain('shadow-card')
  })

  it('applies hover class when hover is true', () => {
    render(<Card data-testid="card" hover>Card</Card>)
    expect(screen.getByTestId('card').className).toContain('hover:shadow-card-hover')
  })

  it('does not apply hover class when hover is false', () => {
    render(<Card data-testid="card">Card</Card>)
    expect(screen.getByTestId('card').className).not.toContain('hover:shadow-card-hover')
  })

  it('applies custom className', () => {
    render(<Card data-testid="card" className="custom-class">Card</Card>)
    expect(screen.getByTestId('card').className).toContain('custom-class')
  })
})
