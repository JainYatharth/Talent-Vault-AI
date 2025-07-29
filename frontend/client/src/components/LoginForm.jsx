  import React, { useContext, useState } from 'react'
import { 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material'
import { AppContext } from '../context/AppContext'
import { loginApiCall } from '../services/apiCalls'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login_form = () => {

  const navigate = useNavigate();

  const {loginEmail,loginPassword,setLoginEmail,setLoginPassword ,rememberMe, setRememberMe} = useContext(AppContext);
  
  const {signUp,setSignUp} = useContext(AppContext)

  const handleSignUp = () => {
    setSignUp(true);
  }

  //setting up handle change functions for remember me , email and password
  const handleEmailChange = (e) =>
  {
    const newVal = e.target.value
    setLoginEmail(newVal);
    console.log(newVal);
  }

  const handlePasswordChange = (e) =>
  {
    const newVal = e.target.value
    setLoginPassword(newVal);
    // console.log(newVal);
  }

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    // console.log(rememberMe);
  }

  const handleLoginSubmit = async () => {
      try {
          const response = await loginApiCall({
              email: loginEmail,
              passwordHash: loginPassword,
              rememberMe: rememberMe
          });
          
         if (response && response.success) {
  // Assuming the backend response structure:
  // {
  //   "success": true,
  //   "message": "Login successful",
  //   "data": {
  //     "user": { ... },
  //     "token": "<JWT>"
  //   }
  // }

  const { token, user } = response.data; // correctly extract nested fields

  // Save to localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  console.log("JWT token:", token);
  console.log("User info:", user);

  // Redirect to upload page
  navigate('/dashboard');
} else {
  console.error("Login failed:", response?.message);
  alert(response?.message || "Login failed.");
}

          
         
      } catch (error) {
          toast.error("Error: ", error);
          // console.error("Error:", error);
      }
      
  };


  return (
    <div className='flex flex-col w-full h-full justify-center'>
      
      <div>
        <h1 className='text-[rgb(67,82,113)] text-4xl mb-3'>Login</h1>

        <div>
        <TextField fullWidth size='small' sx={{width:'100%',marginBottom:'5px',backgroundColor:'white'}} id="loginFormEmail" label="Email" variant="outlined" autoComplete="off" value={loginEmail} onChange={handleEmailChange}/>
        <TextField fullWidth size='small' sx={{width:'100%',marginBottom:'5px',backgroundColor:'white'}} id='loginFormPassword' label="Password" type="password" variant="outlined" margin="dense" value={loginPassword} onChange={handlePasswordChange}/>
        </div>

        <div className="flex justify-between items-center mb-[3px]">
          
          <FormControlLabel
          control={<Checkbox size="small"
                    checked={rememberMe}
                    onChange={handleRememberMe}/>
                  }
          label={<span className="text-sm">Remember me</span>}
          />
          <button className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot Password?</button>
          
        </div>

        <Button // add the functionality to send data to the api
          variant="contained"
          fullWidth
          className='bg-[rgb(67,82,113)] hover:bg-blue-800 py-2 mb-4'
          size='small'
          onClick={handleLoginSubmit}
        >
          Login
        </Button>
        <div className='flex items-center justify-center text-gray-500 '>
          <p className='h-full'>Don't have an account ? <span className='cursor-pointer hover:underline' onClick={handleSignUp}>Sign Up</span></p>
        </div>

      </div>
    </div>
  )
}

export default Login_form