import React from 'react'
import useRecoverPassword from '../../hooks/useRecoverPassword.ts'


export interface IRecoverPassword {
  email: string
}

const RecoverPassword = () => {
  const { loading, recoverPassword} = useRecoverPassword()

   const [email, setEmail] = React.useState('')

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     await recoverPassword({ email })
   }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Recover password
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Recover password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecoverPassword