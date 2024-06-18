import React, { useState } from "react";
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand-container">
          <img src={logo} alt="logo" className="navbar-logo" />
          <a href="/" className="navbar-brand">
            Red
            <br />
            Panda
            <br />
            School
          </a>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.name} className="navbar-link">
              <a
                href={item.href}
                className={activeItem === item.name ? "active" : ""}
                onClick={() => handleItemClick(item.name)}
              >
                {item.name}
              </a>
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

        <button className="navbar-toggle">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
