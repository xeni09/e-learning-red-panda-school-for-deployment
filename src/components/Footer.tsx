import React, { useState } from "react";
import "./Footer.css";
import logo from "../assets/logo.svg";
import youtube from "../assets/socials-youtube.png";
import instagram from "../assets/socials-instagram.png";
import facebook from "../assets/socials-facebook.png";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", { email });
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand and socials section */}
        <div className="footer-section">
          <div className="brand-container">
            <img src={logo} alt="logo" className="footer-logo" />
            <a href="/" className="footer-brand">
              Red
              <br />
              Panda
              <br />
              School
            </a>
          </div>
          <p className="footer-text">We are your new high-quality school.</p>
          <div className="footer-socials">
            <a href="">
              <img className="footer-socials-img" src={youtube} alt="" />
            </a>
            <a href="">
              <img className="footer-socials-img" src={instagram} alt="" />
            </a>
            <a href="">
              <img className="footer-socials-img" src={facebook} alt="" />
            </a>
          </div>
        </div>

        {/* Popular courses section */}
        <div className="footer-section">
          <h3>Popular courses</h3>
          <ul>
            <li>
              <a href="#">Advanced design</a>
            </li>
            <li>
              <a href="#">Web development</a>
            </li>
            <li>
              <a href="#">Data visualization</a>
            </li>
          </ul>
        </div>

        {/* Support section */}
        <div className="footer-section">
          <h3>Need support?</h3>
          <p>
            Contact us at{" "}
            <a href="mailto:support@redpandaschool.com">
              support@redpandaschool.com
            </a>
          </p>
        </div>

        {/* Newsletter subscription section */}
        <div className="footer-section">
          <h3>Subscribe our newsletter</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Legal section */}
      <div className="legal">
        <ul>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
        <p>&copy; 2024 RedPandaSchool. Inesdi</p>
      </div>
    </footer>
  );
};

export default Footer;
