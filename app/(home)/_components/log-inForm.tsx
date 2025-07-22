'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'
import { useAuth } from '@/app/contexts/auth-context'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-900/70">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      
      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-gray-100">Enter password</CardTitle>
          <CardDescription className="text-gray-400">
            to access the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-gray-900/50 border-green-900 text-gray-100 placeholder-gray-500 focus:border-green-500"
                required
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-700 hover:bg-green-600 text-gray-100"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}