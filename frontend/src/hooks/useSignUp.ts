import toast from 'react-hot-toast'
import { IInputs } from '../pages/signUp/SignUp'
import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const useSignUp = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({ fullName, username,email, password, confirmPassword, gender }: IInputs) => {
    const success = handleInputErrors({ fullName, username,email, password, confirmPassword, gender })

    if (!success) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username,email, password, confirmPassword, gender }),
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)

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
