'use client'

import { useAuth } from '@/app/contexts/auth-context'
import { ReactNode } from 'react'
import LoginForm from './log-inForm'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}