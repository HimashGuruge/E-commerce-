import Homepage from "./components/pages/Homepage.jsx";
import NotFound from "./components/pages/NotFound.jsx"; // import new page
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="865120672100-nhmc7gk52kqk7h1obfhl2cv2v3an6e9d.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Homepage />} />
      
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
