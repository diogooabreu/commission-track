import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/AuthContext'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Role } from '../../types/api'
import type { ApiError } from '../../types/api'
import { isAxiosError } from 'axios'

interface FormErrors {
  email?: string
  password?: string
}

function validateEmail(email: string): string | undefined {
  if (!email) return 'Email é obrigatório'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Senha é obrigatória'
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
  return 'Erro ao fazer login'
}

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    setErrors({ email: emailError, password: passwordError })

    if (emailError || passwordError) return

    setIsLoading(true)
    try {
      await login({ email, password })
      const storedUser = localStorage.getItem('user')
      const user = storedUser ? JSON.parse(storedUser) : null
      if (user?.role === Role.CLIENT) {
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
        Entrar
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
          placeholder="Sua senha"
        />

        <Button type="submit" isLoading={isLoading} fullWidth>
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-tertiary">
        Não tem conta?{' '}
        <Link to="/cadastro" className="text-primary font-medium no-underline hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
