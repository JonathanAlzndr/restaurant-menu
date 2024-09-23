import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.role === "admin");
    }
  };

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.role === "admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ProductList isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/add" element={isAdmin ? <AddProduct /> : <ProductList />} />
        <Route path="/edit/:id" element={isAdmin ? <EditProduct /> : <ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
