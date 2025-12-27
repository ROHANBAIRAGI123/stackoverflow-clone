"use client"
import React from 'react'
import { useAuthStore } from '@/store/Auth'

function LoginPage() {
    const {login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const {success, error} =  await login(email, password)
        setIsLoading(false)

        if(!success){
            setError(error?.message || 'Login failed')
        }
    }

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage