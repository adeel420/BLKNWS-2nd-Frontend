import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Footer from "./components/Footer";
import Credits from "./page/Credits";
import Watch from "./page/Watch";
import Privacy_Policy from "./page/Privacy_Policy";
import RSVP from "./page/RSVP";
import Community from "./page/Community";
import FooterWrapper from "./components/Footer";
import { Toaster } from "react-hot-toast";
import SignupPopup from "./components/SignupPopup";
import LoginPopup from "./components/LoginPopup";
// import VerifyEmail from "./components/VerifyEmail";
// import ForgetPassword from "./components/ForgetPassword";
// import ResetPassword from "./components/ResetPassword";

function App() {
  const location = useLocation();
  const hideFooter = ["/login", "/signup", "/verify-email", "/forget-password"];
  const hideFooterPath = hideFooter.includes(location.pathname);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/privacy-policy" element={<Privacy_Policy />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signup" element={<SignupPopup />} />
        <Route path="/login" element={<LoginPopup />} />

        {/* <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
      {!hideFooterPath && <FooterWrapper />}
      <Toaster />
      {/* <Footer /> */}
    </>
  );
}

export default App;
