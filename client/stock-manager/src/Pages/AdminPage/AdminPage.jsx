import React from "react";
import TopNavbar from "../Navbar";
import { useAuth } from "../../Contexts/AuthContext";

export default function AdminPage() {

  const { user } = useAuth();

  return (
    <>
      <TopNavbar />
    </>
  );
}
