import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user-icon.png";
import { FaShoppingCart } from "react-icons/fa"; 
import { useAuth } from "../../context/AuthProvider"; 
import LogoutButton from "../authComponents/LogoutButton";
import "./NavBar.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Contact", href: "/contact" },
];

const NavBar = ({ cartItemCount }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [navbarTransparent, setNavbarTransparent] = useState(false);
  const { isAuthenticated, user } = useAuth(); 
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarFixed(true);
        setNavbarTransparent(true); 
      } else {
        setNavbarFixed(false);
        setNavbarTransparent(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className={`navbar ${navbarFixed ? "navbar-fixed" : ""} ${navbarTransparent ? "navbar-transparent" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand-link">
          <div className="navbar-brand-container">
            <img src={logo} alt="logo" className="navbar-logo" />
            <div className="navbar-brand">
              Red
              <br />
              Panda
              <br />
              School
            </div>
          </div>
        </Link>
        
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.name} className="navbar-link">
              <Link
                to={item.href}
                className={location.pathname === item.href ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-login-container" ref={dropdownRef}>
          <Link to="/checkout" className="relative text-white pr-4" aria-label="Shopping Cart">
            <FaShoppingCart className="cart-icon text-white text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button className="navbar-login-icon" onClick={toggleDropdown} aria-label="User menu">
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </button>
          {dropdownVisible && (
            <div className="navbar-login-dropdown">
              {isAuthenticated && user ? (
                <>
                  <span>Welcome, {user.name}!</span>
                  <Link to="/my-account" onClick={handleLinkClick}>My Account</Link>
                  <Link to="/my-courses" onClick={handleLinkClick}>My Courses</Link>
                  <Link to="/settings" onClick={handleLinkClick}>Settings</Link>

                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" onClick={handleLinkClick}>Admin Dashboard</Link>
                  )}

                  <LogoutButton onClick={handleLinkClick} />
                </>
              ) : (
                <>
                  <Link to="/login" onClick={handleLinkClick}>Log In</Link>
                  <Link to="/register" onClick={handleLinkClick}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
