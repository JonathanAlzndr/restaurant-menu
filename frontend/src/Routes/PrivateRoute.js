import React from "react";
import { Navigate } from "react-router-dom";

// Komponen PrivateRoute untuk proteksi rute
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Jika token tidak ada, arahkan ke halaman login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
