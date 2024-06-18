import React, { useState } from "react";
import "./Footer.css";
import logo from "../assets/logo.svg";
import youtube from "../assets/socials-youtube.png";
import instagram from "../assets/socials-instagram.png";
import facebook from "../assets/socials-facebook.png";

const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario (por ejemplo, una llamada a una API o enviar por correo electrónico)
    console.log("Formulario enviado:", { name, email, message });
    // Aquí puedes añadir más lógica según tus necesidades (por ejemplo, limpiar el formulario, mostrar un mensaje de éxito, etc.)
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section footer-socials-container">
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
        <div className="footer-section">
          <h3>Need support?</h3>
          <p>
            Contact us at{" "}
            <a href="mailto:support@redpandaschool.com">
              support@redpandaschool.com
            </a>
          </p>
        </div>
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
      <div className="legal">
        <p>&copy; 2024 RedPandaSchool. Inesdi</p>
      </div>
    </footer>
  );
};

export default Footer;
