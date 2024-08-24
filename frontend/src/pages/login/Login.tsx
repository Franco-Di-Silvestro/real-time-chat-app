import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import React, { useState } from "react";



export interface ILogin {

  username: string,
  password: string
}
const Login = () => {

  const { loading, login } = useLogin()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="flex justify-between">
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Don't have an account
            </Link>
            <Link
              to="/recover-password"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Forgot your password?
            </Link>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;