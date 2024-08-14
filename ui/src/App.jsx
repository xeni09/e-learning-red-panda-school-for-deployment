import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from './pages/Register';
import RegistrationSuccessful from './pages/RegistrationSuccessful';
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotCreated from "./pages/NotCreated";
import CoursePage from "./pages/CoursePage";
import ScrollToTop from './components/ScrollToTop';
import Checkout from './pages/Checkout';
import ConfirmationCourseBought from './pages/ConfirmationCourseBought';
import Admin from './pages/Admin';

//authenticated
import DashboardHome from './pages/authenticated/DashboardHome';
import Profile from './pages/authenticated/Profile';
import Settings from './pages/authenticated/Settings';

import { AuthProvider } from './context/AuthContext';


const App = () => {



  return (
    <AuthProvider>
    <Router>
      <ScrollToTop>
        <div className="app-container">
          <NavBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registrationsuccessful" element={<RegistrationSuccessful />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/not-created" element={<NotCreated />} />
              <Route path="/course/:courseId" element={<CoursePage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmationcoursebought" element={<ConfirmationCourseBought />} />
              <Route path="/admin" element={<Admin />} />

              {/* //authenticated */}
                
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />



            </Routes>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
    </AuthProvider>
  );
};

export default App;