import React from "react";
import "./NavBar.css";
import logo from "../assets/logo.svg";
import { NavItem } from "./types";

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const NavBar: React.FC = () => {
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
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
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
