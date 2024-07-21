import toast from 'react-hot-toast'
import { IInputs } from '../pages/signUp/SignUp'
import React from 'react'

const useSignUp = () => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const signup = async ({ fullName, username, password, confirmPassword, gender }: IInputs) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })

    if (!success) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      })
      const data = await res.json()

      console.log('DATA', data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }
  return { loading, signup }
}

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }: IInputs) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill all the fields')
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Passwords don't match")
    return false
  }

  if (password.length < 6) {
    toast.error('Passwords must be at least 6 characters long')
    return false
  }

  return true
}

export default useSignUp
