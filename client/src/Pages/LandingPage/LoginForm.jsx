import React, { useState} from "react";
import SignIn from "../SignIn/SignIn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

/*const LoginUser = async (user) => {
    console.log(user);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      // Check if the response status indicates success (e.g., HTTP status code 200)
      if (response.ok) {
        // Assuming your API returns JSON data, you can parse it like this:
        const responseData = await response.json();
  
        // You can do something with the response data here
        console.log("Login successful:", responseData);
  
        // Return the response data or a status code if needed
        return { status: 200, data: responseData };
      } else {
        // Handle non-successful responses (e.g., authentication failure)
        console.error("Login failed. Status:", response.status);
        return { status: response.status };
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error logging in:", error);
      return { status: 500 };
    }
  };
  export {LoginUser};*/

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
                  navigate(`facilities/${userData.id}`); // Navigate to the home page
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