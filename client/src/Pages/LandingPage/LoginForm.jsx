import React, { useState} from "react";
import SignIn from "../SignIn/SignIn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const LoginForm = () => {
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(true)
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    
    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };
    const onSubmit = async (e) => {
        setShowMsg(true);
        e.preventDefault();
        sessionStorage.clear()
        
        const user ={
            userName: e.target.formBasicUsername.value,
            passWord: e.target.formBasicPassword.value,
            rememberMe: rememberMe
        }
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify( user),
            });
      
            if (response.ok) {
                // Check if the response contains JSON data before parsing
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                  const userData = await response.json();
                  login(userData); // Update the user state in AuthContext
                  console.log(userData)
                  navigate(`/facilities/${userData.id}`); // Navigate to the home page
                } else {
                  console.error('Login response is not JSON'); // Handle this case
                }
              } else {
                // Handle login failure
                console.error('Login failed');
              }
            } catch (error) {
              // Handle network or other errors
              console.error('Error logging in:', error);
            }
          };
    
    return (
    <SignIn 
    onSubmit={onSubmit} 
    showMsg={showMsg} 
    rememberMe={rememberMe}
    handleRememberMeChange={handleRememberMeChange}></SignIn>)
}

export default LoginForm