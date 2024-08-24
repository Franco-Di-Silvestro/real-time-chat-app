import toast from "react-hot-toast"
import { IRecoverPassword } from "../pages/login/RecoverPassword"
import React from "react"

const useRecoverPassword = () => {
  const [loading, setLoading] = React.useState(false)


  const recoverPassword = async ({ email }: IRecoverPassword) => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }
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
  return { loading, recoverPassword }
}

export default useRecoverPassword