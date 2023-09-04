import { AuthContextProvider, AuthContext } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ErrorPage from "./Pages/ErrorPage";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Statistics from "./Pages/Statistics/Statistics";
import "./index.css";
import LoginForm from "./Pages/LandingPage/LoginForm";
import RegisterFormNew from "./Pages/LandingPage/RegisterFormNew";
import ProductList from "./Pages/Products/ProductList";
import FacilityDetails from "./Pages/FacilityDetails/FacilityDetails";
import ItemList from "./Pages/Products/ProductList";
import { useContext, useEffect, useState } from "react";
import { LoginUser } from "./Pages/LandingPage/LoginForm";
import FacilitiesOfUser from "./Pages/FacilitiesOfUser/FacilitiesOfUser";
import AdminPage from "./Pages/AdminPage/AdminPage";

const App = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<RegisterFormNew />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="facilities/:id" element={<FacilitiesOfUser />} />
          <Route path="orderhistory/:id" element={<OrderHistory />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="itemlist" element={<ItemList />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};
export default App;
