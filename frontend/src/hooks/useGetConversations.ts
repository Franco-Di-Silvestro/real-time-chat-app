import React from "react"
import toast from "react-hot-toast"
import { User } from "../classes/User"

const useGetConversations = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [conversations, setConversations] = React.useState<User[]>([])

  React.useEffect(()=> {
    const getConversations = async () => {
      setLoading(true) 
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setConversations(data)
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

    getConversations()
  },[])
  return {loading, conversations}
}


export default useGetConversations