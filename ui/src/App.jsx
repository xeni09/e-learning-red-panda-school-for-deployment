import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from './components/ScrollToTop';
import AuthProvider from './context/AuthProvider';

// Pages
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
import Checkout from './pages/Checkout';
import ConfirmationCourseBought from './pages/ConfirmationCourseBought';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCourses from './pages/admin/ManageCourses';
import AdminRoute from './components/AdminRoute';
import Admin from './pages/Admin';

// Authenticated Pages
import ProtectedRoute from './components/ProtectedRoute';
import MyAccount from './pages/authenticated/MyAccount';
import MyCourses from './pages/authenticated/MyCourses';
import Settings from './pages/authenticated/Settings';

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                <Route path="/admin/manage-courses" element={<AdminRoute><ManageCourses /></AdminRoute>} />

                {/* Authenticated Routes */}
                <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ScrollToTop>
      </AuthProvider>
    </Router>
  );
};

export default App;
