'use client'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type User = {
  id: string
  email?: string
  username?: string
  password: string
  firstName?: string
  lastName?: string
  role?: string
  token?: string
}

export type AuthContextType = {
  user: User | undefined
  isAuthenticated: boolean
  saveSession: (session: User) => void
  removeSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

const authSessionKey = '_BOOKING_AUTH_KEY_'

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | undefined>()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const hasAuth = await hasCookie(authSessionKey)
      setIsAuthenticated(hasAuth)
      if (hasAuth) {
        const fetchedCookie = getCookie(authSessionKey)?.toString()
        if (fetchedCookie) {
          setUser(JSON.parse(fetchedCookie))
        }
      }
    }
    checkAuth()
  }, [])

  const saveSession = (userData: User) => {
    setCookie(authSessionKey, JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
  }

  const removeSession = () => {
    deleteCookie(authSessionKey)
    setUser(undefined)
    setIsAuthenticated(false)
    router.push('/auth/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        saveSession,
        removeSession,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
