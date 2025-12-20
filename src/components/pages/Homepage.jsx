import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/Dashboard/dashboard";
import NotFound from "@/components/pages/NotFound";
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import { jwtDecode } from "jwt-decode"; // FIXED IMPORT
import AiChatBot from "@/components/aiChatBot";
import PaymentPage from "@/components/pages/admin/payment";
import OrderPage from "@/components/pages/orderpage.jsx";
import ProfilePage from "@/components/pages/ProfilePage.jsx";

export default function Homepage() {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState("customer");

  useEffect(() => {
    const authcheck = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser("customer")
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUser(decoded.role === "admin" ? "admin" : "customer");
      } catch {
        setUser("customer");
      }
    };

    authcheck(); // first check
    window.addEventListener("authChange", authcheck);

    return () => window.removeEventListener("authChange", authcheck);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* Main content area */}
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/viewcart" element={<ViewCartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping/" element={<ShipingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/admin/dashboard/*" element={<Dashboard />} />

          <Route path="*" element={<NotFound />} />


          
          <Route
            path="/productoverview/:productId"
            element={<Productoverview />}
          />


        </Routes>
      </div>

      {/* Show chatbot only for customer */}
      {user === "customer" && <AiChatBot />}
    </div>
  );
}
