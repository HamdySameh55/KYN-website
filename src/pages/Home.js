import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import signature from "../image/sign.png";
import { useNavigate } from "react-router-dom";
import home1 from '../image/home1.jpg';
import home2 from '../image/home2.jpg';
import home3 from '../image/home3.jpg';
import Giltshflarecard from '../image/Giltshflarecard.jpg';
import BlazeGazeecard from '../image/BlazeGazecard.jpg';
import KYNcard from '../image/KYNcard.jpg';
import RebelAngelcard from '../image/RebelAngelcard.jpg';
export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const brandCards = [
    { id: 1, name: "", image: home1, description: "", rotate: -8, y: 0, scale: 0.92 },
    { id: 2, name: "", image: home2, description: "", rotate: 4, y: 15, scale: 0.95 },
    { id: 3, name: "", image: home3, description: "", rotate: -3, y: 30, scale: 0.98 },
    { id: 4, name: "", image: home1, description: "", rotate: 2, y: 45, scale: 1 },
  ];
  const products = [
     { id: 401, name: "Giltsh Flare", price: "999 EGP", originalPrice: "1400 EGP", image: Giltshflarecard, category: "knitted-sweaters", description: "Giltsh Flare by KYN – Shine Different" },
    { id: 402, name: "Blaze Gaze", price: "999 EGP", originalPrice: "1400 EGP", image: BlazeGazeecard, category: "knitted-sweaters", description: "Blaze Gaze by KYN – Ignite Your Look" },
    { id: 101, name: "KYN – Made Different", price: "999 EGP", originalPrice: "1400 EGP", image: KYNcard, category: "knitted-sweaters", description: "KYN – Made Different" },
    { id: 201, name: "Rebel Angel", price: "999 EGP", originalPrice: "1400 EGP", image: RebelAngelcard, category: "knitted-sweaters", description: "Rebel Angel by KYN – Break the Halo." },
  ];
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const InstagramIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
  const TikTokIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 6.85 0 0 1-1-.1z"/>
    </svg>
  );
  const containerStyle = { width: "100%", minHeight: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "'Playfair Display', serif", overflow: "hidden" };
  const splashStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "#000", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999, opacity: showSplash ? 1 : 0, transition: "opacity 1s ease", pointerEvents: showSplash ? "auto" : "none" };
  const heroSection = { display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: isMobile ? "30px" : "80px", maxWidth: "1300px", width: "100%", padding: "80px 20px", margin: "0 auto", boxSizing: "border-box", position: "relative", zIndex: 2, opacity: showSplash ? 0 : 1, transition: "opacity 1s ease 0.5s" };
  const textBox = { flex: 1, textAlign: isMobile ? "center" : "left" };
  const stackCardsContainer = { position: "relative", width: "100%", height: isMobile ? "400px" : "500px", margin: "30px 0" };
  const brandCardStyle = { backdropFilter: "blur(10px)", borderRadius: "25px", padding: "0", border: "2.5px solid rgba(255,255,255,0.25)", transition: "all 0.4s ease", minHeight: isMobile ? "320px" : "420px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", width: "100%", position: "absolute", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.6)", cursor: "pointer", backgroundColor: "rgba(0,0,0,0.35)" };
  const stackImgContainer = { position: "relative", width: isMobile ? "90%" : "420px", height: isMobile ? "320px" : "480px", margin: "0 auto" };
  const baseImg = { width: "100%", height: "100%", borderRadius: "25px", objectFit: "contain", position: "absolute", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "#000", transition: "all 0.5s ease" };
  const iconStyle = { cursor: "pointer", transition: "transform 0.3s, color 0.3s", color: "#fff" };
  const signaturePlaceholder = (
    <svg width="200" height="100" viewBox="0 0 200 100" style={{ opacity: 0.3 }}>
      <text x="50%" y="50%" textAnchor="middle" fill="#fff" fontSize="40" fontFamily="'Playfair Display', serif" fontStyle="italic">KYN</text>
    </svg>
  );
  const imgCards = [ { rotate: -8, y: -20, scale: 0.95 }, { rotate: 4, y: 12, scale: 0.98 }, { rotate: -3, y: 30, scale: 1 } ];
  return (
    <div style={containerStyle}>
      {/* تحميل الفونت السحري (اللي هيخلي الـ KYN زي الصورة بالظبط) */}
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
      {/* Splash Screen */}
      {showSplash && (
        <div style={splashStyle}>
          <motion.img src={signature} alt="KYN" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ width: "320px" }} loading="lazy" />
        </div>
      )}
      {/* خلفية السيجنيتشر بعد السبلاتش */}
      {!showSplash && (
        <motion.img
          src={signature}
          alt="background signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1.5 }}
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70%", zIndex: 0 }}
          loading="lazy"
        />
      )}
      {/* Hero Section */}
      <div style={heroSection}>
        <div style={textBox}>
          {/* الـ KYN الأسطوري (بالفونت الصح + الـ Y نازلة تحت زي السيف) */}
         <motion.h1
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  style={{
    fontSize: isMobile ? "4rem" : "5.5rem",
    fontFamily: "'UnifrakturMaguntia', cursive",
    fontWeight: "normal",
    background: "linear-gradient(45deg, #ffffff, #cccccc, #999999)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% 200%",
    animation: "gradientShift 4s ease infinite",
    // 👇 أهم تعديلين يمنعوا القص
    lineHeight: "1.05",
    paddingTop: "10px",
    marginBottom: "10px",
    letterSpacing: isMobile ? "0.02em" : "0.07em",
    textTransform: "uppercase",
    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.8))",
  }}
>
  KYN
</motion.h1>
<motion.h2
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  style={{
    fontSize: isMobile ? "1rem" : "1.5rem",
    fontStyle: "bold",
    marginBottom: "20px",
    background: "linear-gradient(45deg, #ffffff, #cccccc, #999999)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% 200%",
    animation: "gradientShift 4s ease infinite",
    // 👇 بولد بشكل واضح جدًا
    fontWeight: 900,
    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
  }}
>
  Your Step, Your Thread, Your Family
</motion.h2>
          {/* Brand Cards Stack */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} style={stackCardsContainer}>
            {brandCards.map((brand, index) => (
              <motion.div
                key={brand.id}
                style={{ ...brandCardStyle, transform: `rotate(${brand.rotate}deg) translateY(${brand.y}px) scale(${brand.scale})`, zIndex: hovered === index ? 10 : brandCards.length - index }}
                initial={{ opacity: 0, y: -50, rotate: brand.rotate - 20 }}
                animate={{ opacity: 1, y: 0, rotate: brand.rotate }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ scale: brand.scale + 0.08, rotate: brand.rotate + 3, y: brand.y - 10, boxShadow: "0 20px 50px rgba(255,255,255,0.25)" }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <img src={brand.image} alt={brand.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "23px", position: "absolute", top: 0, left: 0 }} loading="lazy" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)", padding: isMobile ? "25px 20px" : "35px 30px", borderRadius: "0 0 23px 23px", zIndex: 1 }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: isMobile ? "1.1rem" : "1.4rem", fontWeight: "700", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{brand.name}</h3>
                  <p style={{ margin: 0, fontSize: isMobile ? "0.85rem" : "1rem", color: "#fff", fontWeight: "400", opacity: 0.95 }}>{brand.description}</p>
                </div>
                <motion.div style={{ position: "absolute", width: "150%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", top: 0, left: "-150%", zIndex: 2 }}
                  animate={{ left: ["-150%", "150%"] }} transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.6, ease: "linear" }} />
              </motion.div>
            ))}
          </motion.div>
          {/* Social Icons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", gap: "25px", marginTop: "25px" }}>
            <motion.a href="https://www.instagram.com/kyn_eg" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.4, rotate: 8 }} whileTap={{ scale: 0.9 }} style={iconStyle}><InstagramIcon /></motion.a>
            <motion.a href="https://www.tiktok.com/@kyn_eg" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.4, rotate: -8 }} whileTap={{ scale: 0.9 }} style={iconStyle}><TikTokIcon /></motion.a>
          </motion.div>
        </div>
        {/* Stack Images */}
        <motion.div style={stackImgContainer} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          {imgCards.map((card, index) => (
            <motion.div key={index} style={{ position: "absolute", top: 0, left: 0 }} animate={{ y: [0, -15, 0] }} transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}>
              <motion.div style={{ ...baseImg, transform: `rotate(${card.rotate}deg) translateY(${card.y}px) scale(${card.scale})`, zIndex: hovered === `img-${index}` ? 5 : 1, display: "flex", justifyContent: "center", alignItems: "center" }}
                onMouseEnter={() => setHovered(`img-${index}`)} onMouseLeave={() => setHovered(null)} whileHover={{ scale: 1.07, rotate: card.rotate + 6 }}>
                {signaturePlaceholder}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* 🔥🔥🔥 Featured Products Section 🔥🔥🔥 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Section Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "60px",
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? "2.5rem" : "3.5rem",
              fontWeight: "700",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #fff, #888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Best Sellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              color: "rgba(255,255,255,0.7)",
              fontStyle: "italic",
            }}
          >
            Discover our most popular collections
          </motion.p>
        </div>
        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          marginBottom: "50px",
        }}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
              }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(20,20,20,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                transition: "all 0.4s ease",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Product Tag */}
              <div style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                background: "linear-gradient(135deg, #fff, #ccc)",
                color: "#000",
                padding: "6px 15px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "700",
                zIndex: 2,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                {product.tag}
              </div>
              {/* Product Image */}
              <div style={{
                width: "100%",
                height: isMobile ? "350px" : "420px",
                overflow: "hidden",
                position: "relative",
              }}>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              
                {/* Gradient Overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
                }} />
              </div>
              {/* Product Info */}
              <div style={{
                padding: "25px",
                position: "relative",
                zIndex: 1,
              }}>
                <h3 style={{
                  fontSize: isMobile ? "1.3rem" : "1.5rem",
                  fontWeight: "700",
                  marginBottom: "10px",
                  color: "#fff",
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: isMobile ? "1.1rem" : "1.3rem",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "15px",
                }}>
                  {product.price}
                </p>
              
                {/* Shop Now Button */}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "transparent",
                    border: "2px solid #fff",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#fff";
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Shop Now
                </motion.button>
              </div>
              {/* 3D Shine Effect */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                  top: 0,
                  left: "-100%",
                  zIndex: 3,
                  pointerEvents: "none",
                }}
                animate={{
                  left: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}
        </div>
{/* View All Button */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  style={{
    textAlign: "center",
    position: "relative", // عشان zIndex يشتغل
    zIndex: 10,
  }}
>
  <motion.button
    onClick={() => navigate("/product")}
    whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
    whileTap={{ scale: 0.95 }}
    style={{
      padding: "18px 50px",
      fontSize: "1.1rem",
      fontWeight: "700",
      background: "transparent",
      border: "3px solid #fff",
      color: "#fff",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "2px",
      zIndex: 10, // تأكد من إنه فوق كل العناصر
      pointerEvents: "auto", // للتأكد من التعامل مع الماوس
    }}
  >
    View All Products
  </motion.button>
</motion.div>
      </motion.div>
{/* 4. About the Brand Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <h2 style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        marginBottom: "30px",
        letterSpacing: "1px",
        color: "#fff",
      }}>
        About KYN
      </h2>
      <p style={{
        fontSize: "1.15rem",
        color: "rgba(255,255,255,0.85)",
        marginBottom: "25px",
        textAlign: "justify",
      }}>
        At KYN, we craft premium, stylish footwear designed to fit your lifestyle.
        Every pair combines quality, comfort, and a unique touch that sets you apart.
      </p>
      <p style={{
        fontSize: "1.15rem",
        color: "rgba(255,255,255,0.85)",
        marginBottom: "35px",
        textAlign: "justify",
      }}>
        Inspired by movement, dreams, and individuality, KYN is more than just footwear — it's a statement.
        Each design carries a story, a step forward, and a feeling you can wear.
      </p>
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={{
    display: "inline-block",
    position: "relative",
    zIndex: 9999,
    pointerEvents: "auto",
  }}
>
  <button
    onClick={() => navigate("/About")}
    style={{
      padding: "15px 50px",
      fontSize: "1rem",
      fontWeight: "700",
      background: "transparent",
      border: "3px solid #fff",
      color: "#fff",
      borderRadius: "50px",
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      transition: "all 0.3s ease",
      pointerEvents: "auto",
    }}
  >
    Learn More
  </button>
</motion.div>
    </motion.div>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    
    </div>
  );
}