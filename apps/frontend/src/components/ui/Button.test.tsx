import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Entrar</Button>)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Ok</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-primary')
    expect(btn.className).toContain('text-white')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Ok</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-secondary')
  })

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ok</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-transparent')
  })

  it('applies danger variant', () => {
    render(<Button variant="danger">Ok</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-red')
  })

  it('is disabled when isLoading', () => {
    render(<Button isLoading>Salvar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards additional HTML attributes', () => {
    render(<Button type="submit">Enviar</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Ok</Button>)
    expect(screen.getByRole('button').className).toContain('w-full')
  })
})
