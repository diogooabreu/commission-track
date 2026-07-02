import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Loading } from './Loading'

describe('Loading', () => {
  it('renders spinner by default', () => {
    render(<Loading />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders message when provided', () => {
    render(<Loading message="Carregando..." />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('does not render message when not provided', () => {
    render(<Loading />)
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument()
  })
})
