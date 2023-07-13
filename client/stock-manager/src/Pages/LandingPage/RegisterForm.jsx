import { useState } from "react"
import SignUp from "../Pages/SignUp/SignUp"
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import { useCookies } from "react-cookie";


const Authorize = async (username, password) => {
    const loginObj = {"UserName": username, "Password": password}
    return await fetch("/api/user/register", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(loginObj)
    }).then(res => {
        return  {"status": res.status, "token": res.text()}; 
     })
}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const [showMsg, setShowMsg] = useState(true);
    const [successfulReg, setReg] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.formBasicUsername.value;
        const password = e.target.formBasicPassword.value;
        const auth = await Authorize(username, password);
        if(auth.status === 401) {
            setShowMsg(false);
            console.error("Username is already taken!")
        }
        else if(auth.status === 500){
            console.error("Can't communicate with server!")
        }
        else if(auth.status === 200){
            //setCookie("token", await auth.token)
            setShowMsg(true);
            setReg(true)
            console.log("Registration successful!")
            await timeout(1000);
            navigate("/");
        }
    }
    
    return <SignUp onSubmit={onSubmit} showMsg={showMsg} successfulReg={successfulReg}></SignUp>
}

export default RegisterForm