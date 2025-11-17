import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FarmerLogin from "./components/FarmerLogin";
import CustomerLogin from "./components/CustomerLogin";
import FarmerDashboard from "./components/FarmerDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderTracking from "./components/OrderTracking";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:orderId" element={<OrderTracking />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
