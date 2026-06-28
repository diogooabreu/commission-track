/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import api from '../services/api'
import type { User, LoginRequest, RegisterRequest, LoginResponse } from '../types/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

function getStoredToken(): string | null {
  return localStorage.getItem('token')
}

function getStoredUser(): User | null {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: getStoredUser(),
    token: getStoredToken(),
    isLoading: false,
  })

  const login = useCallback(async (data: LoginRequest) => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      const { data: res } = await api.post<LoginResponse>('/auth/login', data)
      localStorage.setItem('token', res.accessToken)

      const { data: userRes } = await api.get<User>('/users/me')
      localStorage.setItem('user', JSON.stringify(userRes))

      setState({ user: userRes, token: res.accessToken, isLoading: false })
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      const { data: res } = await api.post<LoginResponse>('/auth/register', data)
      localStorage.setItem('token', res.accessToken)

      const { data: userRes } = await api.get<User>('/users/me')
      localStorage.setItem('user', JSON.stringify(userRes))

      setState({ user: userRes, token: res.accessToken, isLoading: false })
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setState({ user: null, token: null, isLoading: false })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        isAuthenticated: !!state.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
