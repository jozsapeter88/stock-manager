import { AuthContextProvider, useAuth } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import React, { useEffect} from "react";
import ErrorPage from "./Pages/ErrorPage";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Statistics from "./Pages/Statistics/Statistics";
import "./index.css";
import "./App.css";
import LoginForm from "./Pages/LandingPage/LoginForm";
import RegisterForm from "./Pages/LandingPage/RegisterForm";
import FacilitiesOfUser from "./Pages/FacilitiesOfUser/FacilitiesOfUser";
import AdminPage from "./Pages/AdminPage/AdminPage";
import FacilityDetails from "./Pages/FacilityDetails/FacilityDetails";
import SupplierPage from "./Pages/SupplierPage/SupplierPage";
import DispatchHistory from "./Pages/DispatchHistory/DispatchHistory";
import CreateItemForm from "./Pages/AdminPage/CreateItemForm";

const App = () => {
  const { user, login } = useAuth();
  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    if (userJSON) {
      const userData = JSON.parse(userJSON);
      login(userData);
    }
  }, []);

  const isAuthenticated = (allowedRoles) => {
    if (user === null) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="facilities/:id" element={isAuthenticated([0,1]) ? <FacilitiesOfUser /> : <LoginForm/>} />
        <Route path="facilityDetails/:id" element={isAuthenticated([0,1]) ? <FacilityDetails /> : <LoginForm />} />
        <Route path="orderhistory/:id" element={isAuthenticated([0,1]) ? <OrderHistory /> : <LoginForm/>} />
        <Route path="dispatchHistory/:id" element={isAuthenticated([0,1]) ? <DispatchHistory/> : <LoginForm/>} />
        <Route path="statistics" element={isAuthenticated([0,1]) ? <Statistics /> : <LoginForm/>} />
        <Route path="suppliers" element={isAuthenticated([0,1]) ? <SupplierPage /> : <LoginForm/>} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="admin" element={ isAuthenticated([0]) ? (<AdminPage />) : (
              <p>You are not authorized to access this page.</p>)}/>
        <Route path="addItem" element={ isAuthenticated([0]) ? (<CreateItemForm />) : (
              <p>You are not authorized to access this page.</p>)}/>     
      </Routes>
    </div>
  );
};

const AppWithAuthContext = () => (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

export default AppWithAuthContext;
