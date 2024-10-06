import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Components
import NavBar from "./components/layoutComponents/NavBar";
import Footer from "./components/layoutComponents/Footer";
import ScrollToTop from './components/layoutComponents/ScrollToTop';
import AuthProvider from './context/AuthProvider';

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/AllCourses";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from './pages/Register';
import RegistrationSuccessful from './pages/RegistrationSuccessful';
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotCreated from "./pages/NotCreated";
import CoursePageToBuy from "./pages/CoursePageToBuy";
import Checkout from './pages/Checkout';
import ConfirmationCourseBought from './pages/ConfirmationCourseBought';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCourses from './pages/admin/ManageCourses';
import AdminRoute from './components/adminComponents/AdminRoute';
import Admin from './pages/Admin';
import CourseDetails from './pages/admin/CourseDetails';
import CourseSectionDetails from './pages/admin/CourseSectionDetails'; 
import CourseStudentsList from './pages/admin/CourseStudentsList'; 


// Authenticated Pages
import ProtectedRoute from './components/authComponents/ProtectedRoute';
import MyAccount from './pages/authenticated/MyAccount';
import MyCourses from './pages/authenticated/MyCourses';
import Settings from './pages/authenticated/Settings';
import EnrolledCoursePage from './pages/authenticated/EnrolledCoursePage';


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
                <Route path="/course/:courseId" element={<CoursePageToBuy />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmationcoursebought" element={<ConfirmationCourseBought />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
                <Route path="/admin/manage-courses" element={<AdminRoute><ManageCourses /></AdminRoute>} />
                <Route path="/admin/manage-courses/:courseId" element={<AdminRoute><CourseDetails /></AdminRoute>} />
                <Route path="/admin/manage-courses/:courseId/section/:sectionId" element={<AdminRoute><CourseSectionDetails /></AdminRoute>} />
                <Route path="/admin/manage-courses/:courseId/students" element={<AdminRoute><CourseStudentsList /></AdminRoute>} />


                {/* Authenticated Routes */}
                <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/enrolled-course/:courseId" element={<ProtectedRoute><EnrolledCoursePage /></ProtectedRoute>} />

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
