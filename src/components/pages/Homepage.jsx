import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/dashboard";
import NotFound from "@/components/pages/NotFound";
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import AiChatBot from "../aiChatBot";

export default function Homepage() {
  const [user, setUser] = useState(null);

  const authcheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded); // keep decoded object
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    authcheck();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

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
          <Route path="/admin/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/productoverview/:productId" element={<Productoverview />} />
        </Routes>
      </div>

      {/* Render chatbot only for customer */}
      {user && user.role === "customer" && <AiChatBot />}
    </div>
  );
}
