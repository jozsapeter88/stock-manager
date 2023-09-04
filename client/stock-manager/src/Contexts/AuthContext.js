import { createContext, useState, useContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);

   console.log("auth: " + user)
    const login = (userData) => {
       
        setUser(userData);
      };
    
      const logout = () => {
       
        setUser(null);
      };
    
      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {props.children}
        </AuthContext.Provider>
      );
    };
    
    export const useAuth = () => {
      return useContext(AuthContext);
    };
