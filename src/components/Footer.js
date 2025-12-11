import React from "react";
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "/image/kyn_logo_transparent.png";

export default function Footer() {
  const footerStyle = {
    background: "rgba(20, 20, 20, 0.95)",
    color: "#fff",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', serif",
    gap: "20px",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    overflow: "hidden",
  };

  const socialIcons = {
    display: "flex",
    gap: "28px",
    marginTop: "10px",
  };

  const logoStyle = {
    height: "70px",
    objectFit: "contain",
    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.3s ease",
  };

  const sloganStyle = {
    fontSize: "1.1rem",
    opacity: 0.9,
    textAlign: "center",
    fontStyle: "italic",
    letterSpacing: "0.5px",
  };

  // لمعة متحركة فخمة
  const shineStyle = {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "60%",
    height: "100%",
    background: "linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)",
    transform: "skewX(-25deg)",
    pointerEvents: "none",
  };

  return (
    <footer style={footerStyle}>
      {/* اللمعة المتحركة */}
      <motion.div
        style={shineStyle}
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* اللوجو */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={Logo} alt="KYN Logo" style={logoStyle} />
      </motion.div>

      <div style={sloganStyle}>
        Your Step, Your Thread, Your Family
      </div>

      {/* السوشيال ميديا */}
      <div style={socialIcons}>
        <motion.a
          href="https://www.instagram.com/kyn_eg"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          whileHover={{ scale: 1.4, color: "#E4405F" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaInstagram size={30} />
        </motion.a>

        <motion.a
          href="https://www.tiktok.com/@kyn_eg"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          whileHover={{ scale: 1.4, color: "#FF0050" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTiktok size={30} />
        </motion.a>

        <motion.a
          href="https://wa.me/201096605584"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          whileHover={{ scale: 1.4, color: "#25D366" }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp size={32} />
        </motion.a>

        <motion.a
          href="mailto:kynegptian@gmail.com"
          style={linkStyle}
          whileHover={{ scale: { scale: 1.4, color: "#FF4646" } }}
          whileTap={{ scale: 0.9 }}
        >
          <FaEnvelope size={30} />
        </motion.a>
      </div>

      <div style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "10px" }}>
        © 2025 KYN. All rights reserved.
      </div>
    </footer>
  );
}