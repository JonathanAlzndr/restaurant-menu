import React from "react";
import { Navigate } from "react-router-dom";

// Komponen AdminRoute untuk proteksi rute admin
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  // Hanya admin yang bisa mengakses, jika bukan admin arahkan ke halaman produk biasa
  return role === "admin" ? children : <Navigate to="/products" />;
};

export default AdminRoute;
