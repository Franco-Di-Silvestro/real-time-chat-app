import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ILogin } from '../pages/login/Login';

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }: ILogin) => {
        try {
            setLoading(true)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();

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
    return { loading, login }

}

export default useLogin