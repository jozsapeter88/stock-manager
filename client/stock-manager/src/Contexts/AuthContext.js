import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [doctorId, setDoctorId] = useState(null);
    return (
        <AuthContext.Provider value={{doctorId, setDoctorId}}>
        {props.children}
        </AuthContext.Provider>
    )
}