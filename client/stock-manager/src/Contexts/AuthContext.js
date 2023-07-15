import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [userId, setuserId] = useState(null);
    return (
        <AuthContext.Provider value={{userId, setuserId}}>
        {props.children}
        </AuthContext.Provider>
    )
}