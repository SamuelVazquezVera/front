import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const Residente = () => {
  const { user } = useAuth();
  if (user.role === "residente") {
    return <div>Residente</div>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Residente;
