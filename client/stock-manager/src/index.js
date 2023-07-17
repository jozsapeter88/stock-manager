import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Order from "./Pages/Order";
import ErrorPage from "./Pages/ErrorPage";
import OrderHistory from "./Pages/OrderHistory";
import MyHospitals from "./Pages/MyHospitals";
import NewOrder from "./Pages/NewOrder";
import NewHospital from "./Pages/NewHospital";

import "./index.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import LoginForm from "./Pages/LandingPage/LoginForm";
import ProductList from "./Pages/Products/ProductList";
import FacilityDetails from "./Pages/FacilityDetails/FacilityDetails";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="order" element={<Order />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="facilities/:id" element={<FacilityDetails />} />
        <Route path="orderhistory/:id" element={<OrderHistory />} />
        <Route path="neworder/:id" element={<NewOrder />} />
        <Route path="myhospitals" element={<MyHospitals />} />
        <Route path="newhospital" element={<NewHospital />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
