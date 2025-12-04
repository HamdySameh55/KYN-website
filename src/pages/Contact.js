import React, { useState } from "react";
import { FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import signature from "../image/sign.png";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    topic: "",
    name: "",
    whatsapp: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/xzzlelbo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ topic: "", name: "", whatsapp: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#000" }}>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: "60vh",
          backgroundImage: `url(${signature})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            letterSpacing: "2px",
            maxWidth: "800px",
            textTransform: "uppercase",
          }}
        >
          Your Step, Your Thread, Your Family
        </motion.h1>
      </div>

      {/* Contact Section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "4rem 1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "rgba(0,0,0,0.85)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        >
          {/* Contact Info */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              <FaPhoneAlt /> 01027148646
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <FaEnvelope /> kynegptian@gmail.com
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
              <motion.a
                href="https://www.tiktok.com/@kyn_eg?_r=1&_t=ZS-91fmvVUHRrE"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#fff" }}
              >
                <FaTiktok size={30} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/kyn_eg?igsh=dWdhdTRsYzU1MGN6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#fff" }}
              >
                <FaInstagram size={30} />
              </motion.a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              style={{
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #fff",
                fontSize: "1rem",
                backgroundColor: "#111",
                color: "#fff",
                appearance: "none",
              }}
            >
              <option value="" disabled>
                Select Message Type
              </option>
              <option value="Problem">Problem</option>
              <option value="Question">Question</option>
              <option value="Message">Message</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #fff",
                fontSize: "1rem",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />

            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              style={{
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #fff",
                fontSize: "1rem",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              style={{
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #fff",
                fontSize: "1rem",
                backgroundColor: "#111",
                color: "#fff",
              }}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff", border: "1px solid #fff" }}
              style={{
                padding: "1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "1.1rem",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              Send
            </motion.button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "1rem" }}>
            {status}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
