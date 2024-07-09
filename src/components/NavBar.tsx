import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user-icon.png";
import { NavItem } from "./types";

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Contact", href: "/contact" },
];

const NavBar: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string>(navItems[0].name);
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [navbarTransparent, setNavbarTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarFixed(true);
        setNavbarTransparent(true); // add transparency on scroll
      } else {
        setNavbarFixed(false);
        setNavbarTransparent(false); // remove transparency at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    setDropdownVisible(false); // Close dropdown on item click (if open)
  };

  return (
    <nav className={`navbar ${navbarFixed ? "navbar-fixed" : ""} ${navbarTransparent ? "navbar-transparent" : ""}`}>
      <div className="navbar-container">
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

        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.name} className="navbar-link">
              <Link
                to={item.href}
                className={activeItem === item.name ? "active" : ""}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-login-container">
          <button className="navbar-login-icon" onClick={toggleDropdown}>
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </button>
          {dropdownVisible && (
            <div className="navbar-login-dropdown">
              <a href="/login">Log In</a>
              <a href="/signup">Sign Up</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
