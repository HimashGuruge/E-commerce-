import React from "react";
import Navbar from "../Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "@/components/pages/HomeContainer";
import Login from "./Login";
import Dashboard from "@/components/pages/admin/dashboard";
import NotFound from "@/components/pages/NotFound"; // create this component
import Signup from "@/components/pages/singUp";
import Productoverview from "./productoverview";
import ViewCartPage from "./viewCart";
import ShipingPage from "@/components/pages/shipping";
import AboutPage from "@/components/pages/about.jsx";
import ServicePage from "@/components/pages/service.jsx";
import ChatBot from "@/components/aiChatBot.jsx";
export default function Homepage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      {/* Main content area */}
      <div className="w-full h-[calc(100vh-100px)]">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/viewcart" element={<ViewCartPage />} />
          <Route path="/about" element={<AboutPage/>} />
           <Route path="/shipping/" element={<ShipingPage/>} />

            <Route path="/service" element={<ServicePage/>} />

          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/admin/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} /> {/* catch-all route */}
          <Route
            path="/productoverview/:productId"
            element={<Productoverview />}
          />
        </Routes>
      </div>

      <ChatBot/>
    </div>
  );
}
