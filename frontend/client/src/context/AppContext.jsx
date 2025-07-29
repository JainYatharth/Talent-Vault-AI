import React, { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [signUp,setSignUp] = useState(false);

    // handling login data
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    //handling signup data
    const [signupEmail, setSignUpEmail] = useState('');
    const [signupPassword, setSignUpPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [role, setRole] = useState('');

    const value = {signUp,setSignUp,loginEmail,loginPassword,
        setLoginEmail,setLoginPassword,rememberMe, setRememberMe,
        signupEmail, setSignUpEmail,signupPassword, setSignUpPassword,
        signupName, setSignupName,role,setRole,
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
