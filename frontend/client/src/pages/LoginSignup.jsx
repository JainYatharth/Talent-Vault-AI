import React, { useContext } from 'react'
import Welcome from '../components/Welcome'
import LoginForm from '../components/LoginForm'
import { AppContext } from '../context/AppContext'
import SignupForm from '../components/SignupForm'

const Login_Signup = () => {

  const { signUp, setSignUp } = useContext(AppContext);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="hidden md:grid grid-cols-20 w-[55%] h-[63%] rounded-xl shadow-2xl border border-gray-200  bg-[rgb(217,234,253)]">
        <div className='col-span-8 flex items-center h-full p-1'>
          <Welcome />
        </div>

        <div className='col-span-12 px-6'>
          {!signUp ? <LoginForm /> : <SignupForm />}
        </div>

      </div>
      <div className='block md:hidden w-[90%] min-w-[400px] max-w-md p-6 bg-[rgb(217,234,253)] rounded-lg shadow-lg'>
        {!signUp ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  )
}

export default Login_Signup
