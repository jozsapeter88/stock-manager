import { AuthContextProvider, useAuth } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import React, { useEffect} from "react";
import Home from "./Pages/Home/Home";
import ErrorPage from "./Pages/ErrorPage";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Statistics from "./Pages/Statistics/Statistics";
import "./index.css";
import LoginForm from "./Pages/LandingPage/LoginForm";
import RegisterFormNew from "./Pages/LandingPage/RegisterFormNew";
import ProductList from "./Pages/Products/ProductList";
import FacilitiesOfUser from "./Pages/FacilitiesOfUser/FacilitiesOfUser";
import AdminPage from "./Pages/AdminPage/AdminPage";
import FacilityDetails from "./Pages/FacilityDetails/FacilityDetails";
import SupplierPage from "./Pages/SupplierPage/SupplierPage";

const App = () => {
  const { user, login } = useAuth();
  console.log(user)
  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');
    console.log(userJSON)
    if (userJSON) {
      const userData = JSON.parse(userJSON);
      login(userData); // Log the user in using the data from localStorage
    }
  }, []);

  const isAuthenticated = (allowedRoles) => {
    if (user === null) return false;
    return allowedRoles.includes(user.role); // Use 'includes' for array filtering
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="register" element={<RegisterFormNew />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="facilities/:id" element={<FacilitiesOfUser />} />
        <Route path="facilityDetails/:id" element={<FacilityDetails />} />
        <Route path="orderhistory/:id" element={<OrderHistory />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="suppliers" element={<SupplierPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="admin"
          element={
            isAuthenticated([0]) ? (
              <AdminPage />
            ) : (
              <p>You are not authorized to access this page.</p>
            )
          }
        />
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
