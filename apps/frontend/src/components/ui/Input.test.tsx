import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders input element', () => {
    render(<Input label="Nome" id="name" />)
    expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input label="Email" id="email" error="Email inválido" />)
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('applies error styles to input', () => {
    render(<Input label="Email" id="email" error="Erro" />)
    const input = screen.getByLabelText('Email')
    expect(input.className).toContain('border-red-500')
  })

  it('calls onChange handler', async () => {
    const onChange = vi.fn()
    render(<Input label="Nome" id="name" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('forwards additional HTML attributes', () => {
    render(<Input label="Senha" id="password" type="password" />)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })

  it('applies fullWidth class', () => {
    render(<Input label="Nome" id="name" fullWidth />)
    const wrapper = screen.getByLabelText('Nome').parentElement
    expect(wrapper?.className).toContain('w-full')
  })
})
