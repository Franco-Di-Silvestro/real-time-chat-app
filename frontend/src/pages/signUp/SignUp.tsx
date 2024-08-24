import React from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

export interface IInputs {
  fullName: string,
  username: string,
  email:string,
  password: string,
  confirmPassword: string,
  gender: string
}


const SignUp = () => {

  const [inputs, setInputs] =
    React.useState<IInputs>({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
    })

  const { loading, signup } = useSignUp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(inputs);
  }

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender })
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Pedro Perez"
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              onChange={(e) => {
                setInputs({ ...inputs, fullName: e.target.value })
              }}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="pedroperez1"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value })
              }}
            />
          </div>
          
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="pedroperez1"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value })
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value })
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "SignUp"}</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default SignUp;
