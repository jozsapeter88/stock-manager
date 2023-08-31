import React, { useState, useContext } from "react";
import SignIn from "../SignIn/SignIn";
import { useNavigate } from "react-router-dom";

const LoginUser = async (user) => {
    console.log(user)
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        return { status: response.status };
      } catch (error) {
        console.error("Error logging in:", error);
        return { status: 500 };;
      }
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(true)
    const [rememberMe, setRememberMe] = useState(false);
    //const { setUserId } = useContext();
    
    
    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };
    const onSubmit = async (e) => {
        setShowMsg(true);
        e.preventDefault();
        const user ={
            userName: e.target.formBasicUsername.value,
            passWord: e.target.formBasicPassword.value,
            rememberMe: rememberMe
        }
        const login = await LoginUser(user);
        if(login.status === 401) {
            setShowMsg(false);
            console.error("Wrong login credentials!")
        }
        else if(login.status === 500){
            console.error("Can't communicate with server!")
        }
        else if(login.status === 200){
            //setUserId(login.content);
            console.log("User ID:", login.content);
            console.log("Login successful!")
            navigate("/home");
        }
    }
    
    return (
    <SignIn 
    onSubmit={onSubmit} 
    showMsg={showMsg} 
    rememberMe={rememberMe}
    handleRememberMeChange={handleRememberMeChange}></SignIn>)
}

export default LoginForm