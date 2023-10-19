import { createContext, useState, useContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
      sessionStorage.setItem('user', JSON.stringify(userData))
      setUser(userData);
      };
    
      const logout = () => {
        sessionStorage.clear();
        setUser(null);
        console.log("User is logged out")
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
