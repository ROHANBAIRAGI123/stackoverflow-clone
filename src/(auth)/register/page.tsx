"use client"
import React from 'react'
import { useAuthStore } from '@/store/Auth'
function RegisterPage() {
    const {register, login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const name = formData.get('name') as string

        const {success, error} =  await register(email, password, name)
        setIsLoading(false)

        if(!success){
            setError(error?.message || 'Registration failed')
        }else{
          await login(email, password);
        }
    }


  return (
    <div>RegisterPage
    
    </div>
  )
}

export default RegisterPage