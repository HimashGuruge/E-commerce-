import Homepage from "./components/pages/Homepage.jsx";
import NotFound from "./components/pages/NotFound.jsx"; // import new page
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="865120672100-m8tpjb5nbhi0djdjuvvr4hnb42gandk7.apps.googleusercontent.com">
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
