import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/AuthContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Role } from '../../types/api'
import type { ApiError } from '../../types/api'
import { isAxiosError } from 'axios'

interface FormErrors {
  name?: string
  email?: string
  password?: string
}

function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Nome é obrigatório'
}

function validateEmail(email: string): string | undefined {
  if (!email) return 'Email é obrigatório'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Senha é obrigatória'
  if (password.length < 8) return 'Mínimo 8 caracteres'
}

function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.'
    }
    if (error.response.status === 502) {
      return 'Servidor indisponível. Tente novamente.'
    }
    const data = error.response.data as ApiError | undefined
    const msg = data?.message
    if (Array.isArray(msg)) {
      if (msg[0] === 'Invalid credentials') return 'Email ou senha incorretos'
      return msg[0]
    }
    if (msg) {
      if (msg === 'Invalid credentials') return 'Email ou senha incorretos'
      return msg
    }
    return 'Erro inesperado. Tente novamente.'
  }
  if (error instanceof Error) return error.message
  return 'Erro ao criar conta'
}

export function Cadastro() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>(Role.CLIENT)
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    setErrors({ name: nameError, email: emailError, password: passwordError })

    if (nameError || emailError || passwordError) return

    setIsLoading(true)
    try {
      await register({ name: name.trim(), email, password, role })
      if (role === Role.CLIENT) {
        navigate('/cliente/comissoes')
      } else {
        navigate('/artista/painel')
      }
    } catch (error) {
      setApiError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md px-4">
      <h1 className="font-display text-2xl font-bold text-on-surface text-center mb-8">
        Criar conta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {apiError && (
          <div
            role="alert"
            className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          >
            {apiError}
          </div>
        )}

        <Input
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          fullWidth
          placeholder="Seu nome"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          fullWidth
          placeholder="seu@email.com"
        />

        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          fullWidth
          placeholder="Mínimo 8 caracteres"
        />

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-tertiary mb-1"
          >
            Tipo de conta
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="block w-full rounded-sm border border-[#e5e4e7] bg-surface px-3 py-2.5 text-sm text-on-surface focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          >
            <option value={Role.CLIENT}>Cliente</option>
            <option value={Role.ARTIST}>Artista</option>
          </select>
        </div>

        <Button type="submit" isLoading={isLoading} fullWidth>
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-tertiary">
        Já tem conta?{' '}
        <Link to="/login" className="text-primary font-medium no-underline hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}
