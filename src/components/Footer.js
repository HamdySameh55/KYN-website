import React from "react";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import Logo from "../image/kyn_logo_transparent.png";
import { motion } from "framer-motion";

export default function Footer() {
  const footerStyle = {
    background: "rgba(20,20,20,0.85)",
    color: "#fff",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', serif",
    gap: "15px",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    overflow: "hidden",
  };

  const socialIcons = {
    display: "flex",
    gap: "20px",
  };

  const logoStyle = {
    height: "60px",
    objectFit: "contain",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.4rem",
  };

  const sloganStyle = {
    fontSize: "1rem",
    opacity: 0.8,
    textAlign: "center",
  };

  // عنصر لمعة متحركة
  const shineStyle = {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "50%",
    height: "100%",
    background: "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)",
    transform: "skewX(-25deg)",
    zIndex: 0,
  };

  return (
    <footer style={footerStyle}>
      {/* لمعة */}
      <motion.div
        style={shineStyle}
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <img src={Logo} alt="KYN Logo" style={logoStyle} />
      <div style={sloganStyle}>Your Step, Your Thread, Your Family</div>
      
      <div style={socialIcons}>
        <motion.a
          href="https://www.instagram.com/kyn_eg"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          whileHover={{ scale: 1.3, color: "#ffdd00" }}
        >
          <FaInstagram size={28} />
        </motion.a>
        
        <motion.a
          href="https://www.tiktok.com/@kyn_eg"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          whileHover={{ scale: 1.3, color: "#00f2ff" }}
        >
          <FaTiktok size={28} />
        </motion.a>
        
        <motion.a
          href="mailto:info@kyn.com"
          style={linkStyle}
          whileHover={{ scale: 1.3, color: "#ff5e5e" }}
        >
          <FaEnvelope size={28} />
        </motion.a>
      </div>

      <div style={{ fontSize: "0.9rem", opacity: 0.7, zIndex: 1 }}>
        © 2025 KYN. All rights reserved.
      </div>
    </footer>
  );
}
