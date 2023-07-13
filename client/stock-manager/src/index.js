import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Order from "./Pages/Order";
import ErrorPage from "./Pages/ErrorPage";
import TopNavbar from "./Pages/TopNavbar";
import AllHospitals from "./Pages/AllHospitals/AllHospitals";
import OrderHistory from "./Pages/OrderHistory";
import MyHospitals from "./Pages/MyHospitals";
import NewOrder from "./Pages/NewOrder";
import NewHospital from "./Pages/NewHospital";

import "./index.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import LoginForm from "./Pages/LandingPage/LoginForm";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="order" element={<Order />} />
        <Route path="allhospitals" element={<AllHospitals />} />
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
