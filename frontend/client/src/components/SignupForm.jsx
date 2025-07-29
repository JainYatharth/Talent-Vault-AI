import React, { useContext, useState } from 'react'
import {
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { AppContext } from '../context/AppContext'
import { signupApiCall } from '../services/apiCalls' // for sign up call
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignupForm = () => {

  const navigate = useNavigate()

  const { signUp, setSignUp } = useContext(AppContext)

  const handleSignUp = () => {
    setSignUp(false);
  }

  const { signupEmail, setSignUpEmail, signupPassword,
    setSignUpPassword, signupName, setSignupName, role, setRole } = useContext(AppContext);

  const handleNameChange = (e) => {
    setSignupName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setSignUpEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {

    setSignUpPassword(e.target.value);
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }

  const handlSignupSubmit = async () => {
    try {
      const result = await signupApiCall({
        name: signupName,
        email: signupEmail,
        passwordHash: signupPassword,
        role: role,
      });

      // navigate('/dashboard');

      // if (result && result?.success) {
      toast.success("Successful Login", {
        onClose: () => {
          // navigate('/dashboard');
        },
        autoClose: 1000,
      }
      );
      // navigate('/dashboard');
      // } else {
      //   toast.error("Error: ", result.message)
      // console.error("Login failed:", response.message);
      // }

    } catch (error) {
      toast.error("Error: ", error)
      // console.error("Error during login:", error);
    }
  }


  return (
    <div className='flex flex-col w-full h-full justify-center'>

      <div>
        <h1 className='text-[rgb(67,82,113)] text-4xl mb-3'>Sign Up</h1>

        <div>
          <TextField fullWidth size='small' sx={{ width: '100%', marginBottom: '5px', backgroundColor: 'white' }} id="signupFormName" label="Name" variant="outlined" name='name' autoComplete="off" value={signupName} onChange={handleNameChange} />

          <TextField fullWidth size='small' sx={{ width: '100%', marginBottom: '5px', backgroundColor: 'white' }} id="signupFormEmail" label="Email" variant="outlined" margin="dense" name='email' autoComplete="off" value={signupEmail} onChange={handleEmailChange} />

          <TextField fullWidth size='small' sx={{ width: '100%', marginBottom: '5px', backgroundColor: 'white' }} id='signupFormPassword' label="Password" type="password" variant="outlined" margin="dense" name='password' value={signupPassword} onChange={handlePasswordChange} />

          <FormControl sx={{ width: '100%', marginBottom: '5px', backgroundColor: 'white' }} size="small" margin='dense'>
            <InputLabel id="role">Role</InputLabel>
            <Select
              value={role}
              onChange={handleRoleChange}
              id="role-select"
              label="Role"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Recruiter">Recruiter</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='mt-3'>
          <Button
            variant="contained"
            fullWidth
            className='bg-[rgb(67,82,113)] hover:bg-blue-800 py-2'
            size='small'
            onClick={handlSignupSubmit}
          >
            Sign Up
          </Button>
          <div className='flex items-center justify-center text-gray-500 '>
            <p className='h-full'>Already have an account ? <span className='cursor-pointer hover:underline' onClick={handleSignUp}>Login</span> </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignupForm