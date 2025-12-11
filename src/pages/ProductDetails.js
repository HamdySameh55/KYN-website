// src/pages/ProductDetails.jsx - Final Version + Size Chart + Swipe Navigation + Pre-Order Price Fix + Scroll To Top

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

import Giltshflarecard from '/image/Giltshflarecard.jpg';
import Giltshflare1 from '/image/Giltshflare1.jpg';
import Giltshflare2 from '/image/Giltshflare2.jpg';
import Giltshflare3 from '/image/Giltshflare3.jpg';
import Giltshflare4 from '/image/Giltshflare4.jpg';
import Giltshflare5 from '/image/Giltshflare5.jpg';
import BlazeGaze1 from '/image/BlazeGaze1.jpg';
import BlazeGaze2 from '/image/BlazeGaze2.jpg';
import BlazeGaze3 from '/image/BlazeGaze3.jpg';
import BlazeGaze4 from '/image/BlazeGaze4.jpg';
import BlazeGazeecard from '/image/BlazeGazecard.jpg';
import KYNcard from '/image/KYNcard.jpg';
import KYN1 from '/image/KYN1.jpg';
import KYN2 from '/image/KYN2.jpg';
import home2 from '/image/home2.jpg';
import RebelAngelcard from '/image/RebelAngelcard.jpg';
import RebelAngel2 from '/image/RebelAngel2.jpg';
import RebelAngel3 from '/image/RebelAngel3.jpg';
import RebelAngel4 from '/image/RebelAngel4.jpg';
import Antigravirycard from '/image/Antigravirycard.jpg';
import Antigraviry1 from '/image/Antigravity1.jpg';
import Antigraviry2 from '/image/Antigravity2.jpg';
import Antigraviry3 from '/image/Antigravity3.jpg';

const allProducts = [
  {
    id: 401,
    name: "Giltsh Flare",
    price: "999 EGP",
    originalPrice: "1400 EGP",
    description: "Stay warm, stay stylish, and stay glowing. The Giltsh Flare sweater by KYN brings a smooth feel, unique shine, and a modern cut that makes every outfit pop.",
    tag: "Best Seller",
    colors: ["#000"],
    sizes: ["M", "L", "XL", "XXL"],
    images: [Giltshflarecard, Giltshflare1, Giltshflare2, Giltshflare3, Giltshflare4, Giltshflare5],
    soldOut: true
  },
  {
    id: 402,
    name: "Blaze Gaze",
    price: "999 EGP",
    originalPrice: "1400 EGP",
    description: "Blaze Gaze is the sweater you throw on when you want to look good without even trying...",
    colors: ["#ffffffff"],
    sizes: ["M", "L"],
    images: [BlazeGazeecard, BlazeGaze1, BlazeGaze2 ,BlazeGaze3 ,BlazeGaze4],
    soldOut: false
  },
  {
    id: 101,
    name: "KYN – Made Different",
    price: "999 EGP",
    originalPrice: "1400 EGP",
    description: "KYN is the go-to sweater for your everyday vibe...",
    colors: ["#0c9adbff"],
    sizes: ["M", "L"],
    images: [KYNcard, KYN1, home2 ,KYN2],
    soldOut: true
  },
  {
    id: 201,
    name: "Rebel Angel",
    price: "999 EGP",
    originalPrice: "1400 EGP",
    description: "Everyone thinks angels are gentle… until they meet the one holding the gun. Rebel Angel – the sweater for those who pray in silence and shoot in noise",
    colors: ["#000000ff"],
    sizes: ["M", "L" ,"XL"],
    images: [RebelAngelcard, RebelAngel2, RebelAngel3, RebelAngel4],
    soldOut: false
  },
  {
    id: 301,
    name: "Anti Gravity",
    price: "999 EGP",
    originalPrice: "1400 EGP",
    description: "Rebel Angel by KYN brings a bold mix of innocence and chaos...",
    colors: ["#6f6f6f"],
    sizes: ["S","M", "L" ,"XL"],
    images: [Antigravirycard, Antigraviry1, Antigraviry2, Antigraviry3],
    soldOut: false
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const product = allProducts.find(p => p.id === parseInt(id));
  const productImages = product?.images || [];

  // Scroll to top when component mounts (لما تدخل الصفحة)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // كل ما الـ id يتغير = منتج جديد = ارجع فوق

  useEffect(() => {
    if (product && productImages.length > 0) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setMainImageIndex(0);
    }
  }, [product, productImages]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToNextImage = () => {
    setMainImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const goToPrevImage = () => {
    setMainImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }

    const basePrice = parseFloat(product.price.replace(" EGP", ""));
    const finalPrice = product.soldOut ? Math.round(basePrice * 0.5) : basePrice;

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
      mainImage: productImages[mainImageIndex],
      isPreOrder: product.soldOut,
      price: `${finalPrice} EGP`,
      displayPrice: product.soldOut ? `${finalPrice} EGP (50% Pre-Order)` : `${finalPrice} EGP`
    };

    addToCart(productToAdd);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ fontSize: "4rem", fontWeight: "bold" }}>Product Not Found</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/product")}
          style={{ marginTop: "40px", padding: "18px 60px", background: "#fff", color: "#000", border: "none", borderRadius: "50px", fontWeight: "bold", fontSize: "1.3rem" }}
        >
          Back to Shop
        </motion.button>
      </div>
    );
  }

  const basePrice = parseFloat(product.price.replace(" EGP", ""));
  const displayedPrice = product.soldOut ? basePrice : basePrice;

  const mainImage = productImages[mainImageIndex];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", padding: "90px 20px 60px" }}>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            style={{
              position: "fixed",
              top: "110px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #00ff88, #00ccff)",
              color: "#000",
              padding: "20px 60px",
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1.4rem",
              zIndex: 1000,
              boxShadow: "0 15px 40px rgba(0,255,136,0.5)",
              border: "3px solid #000"
            }}
          >
            {product.soldOut ? "Pre-Order  Added Successfully!" : "Added to cart successfully!"}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "80px",
            alignItems: "start"
          }}
        >
          {/* Images Section */}
          <div>
            <motion.div
              drag={productImages.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 100) goToPrevImage();
                else if (offset.x < -100) goToNextImage();
              }}
              style={{ cursor: productImages.length > 1 ? "grab" : "default" }}
              whileDrag={{ cursor: "grabbing" }}
            >
              <motion.div
                key={mainImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ borderRadius: "28px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.9)", marginBottom: "30px" }}
              >
                <img src={mainImage} alt={product.name} style={{ width: "100%", height: "auto", display: "block" }} />
              </motion.div>
            </motion.div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              {productImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMainImageIndex(i)}
                  style={{
                    width: isMobile ? "90px" : "120px",
                    height: isMobile ? "90px" : "120px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: mainImageIndex === i ? "5px solid #fff" : "3px solid #333",
                    boxShadow: mainImageIndex === i ? "0 0 35px rgba(255,255,255,0.7)" : "0 8px 25px rgba(0,0,0,0.6)"
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <motion.div initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>

              {product.soldOut && (
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #ff0055, #ff3366)",
                  color: "#fff",
                  padding: "14px 40px",
                  borderRadius: "50px",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginBottom: "25px",
                  boxShadow: "0 8px 30px rgba(255,0,0,0.6)",
                  border: "3px solid #000"
                }}>
                  SOLD OUT - PRE-ORDER AVAILABLE
                </div>
              )}

              {product.tag && (
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #fff, #ddd)",
                  color: "#000",
                  padding: "12px 32px",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "25px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)"
                }}>
                  {product.tag}
                </div>
              )}

              <h1 style={{
                fontSize: isMobile ? "3.2rem" : "5rem",
                margin: "0 0 30px",
                background: "linear-gradient(45deg, #fff, #ccc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                lineHeight: "1.1"
              }}>
                {product.name}
              </h1>

              <p style={{ fontSize: "1.35rem", lineHeight: "2", color: "rgba(255,255,255,0.9)", marginBottom: "45px" }}>
                {product.description}
              </p>

              <div style={{ marginBottom: "50px" }}>
                <span style={{ fontSize: "4rem", fontWeight: "bold" }}>
                  {displayedPrice} EGP
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: "2.6rem", color: "#666", textDecoration: "line-through", marginLeft: "35px" }}>
                    {product.originalPrice}
                  </span>
                )}
                {product.soldOut && (
                  <div style={{ fontSize: "1.5rem", color: "#ff3366", marginTop: "15px", fontWeight: "bold" }}>
                   We'll notify you as soon as it's back in stock
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div style={{ marginBottom: "45px" }}>
                <h3 style={{ marginBottom: "20px", fontSize: "1.8rem", fontWeight: "600" }}>Select Color</h3>
                <div style={{ display: "flex", gap: "20px" }}>
                  {product.colors.map((color, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: "72px",
                        height: "72px",
                        backgroundColor: color,
                        borderRadius: "50%",
                        border: selectedColor === color ? "6px solid #fff" : "4px solid #444",
                        cursor: "pointer",
                        boxShadow: selectedColor === color ? "0 0 40px rgba(255,255,255,0.8)" : "0 8px 25px rgba(0,0,0,0.5)"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div style={{ marginBottom: "70px" }}>
                <h3 style={{ marginBottom: "20px", fontSize: "1.8rem", fontWeight: "600" }}>Select Size (EU)</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  {product.sizes.map(size => (
                    <motion.div
                      key={size}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "18px 32px",
                        border: "2px solid #fff",
                        borderRadius: "18px",
                        cursor: "pointer",
                        backgroundColor: selectedSize === size ? "#fff" : "transparent",
                        color: selectedSize === size ? "#000" : "#fff",
                        fontWeight: "bold",
                        minWidth: "90px",
                        textAlign: "center",
                        fontSize: "1.2rem"
                      }}
                    >
                      {size}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", marginBottom: "80px" }}>
                <motion.button
                  whileHover={{ scale: 1.04, backgroundColor: "#ff3366" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    padding: "26px",
                    background: product.soldOut ? "#ff0055" : "#f9f9f9ff",
                    color: "#000000ff",
                    border: "none",
                    borderRadius: "20px",
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    boxShadow: product.soldOut ? "0 12px 35px rgba(255,0,85,0.4)" : "none",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                >
                  {product.soldOut ? "Pre-Order " : "Add to Cart"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => navigate("/product")}
                  style={{
                    padding: "26px 60px",
                    background: "transparent",
                    border: "2px solid #fff",
                    color: "#fff",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "1.4rem"
                  }}
                >
                  Continue Shopping
                </motion.button>
              </div>

              {/* Size Guide + Washing Instructions */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "30px",
                marginTop: "40px",
                flexWrap: "wrap"
              }}>
                {/* Size Guide */}
                <div style={{
                  flex: "1",
                  minWidth: "330px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1.5px solid rgba(0,255,200,0.25)",
                  borderRadius: "20px",
                  padding: "25px",
                  boxShadow: "0 0 20px rgba(0, 255, 200, 0.2)",
                  backdropFilter: "blur(10px)"
                }}>
                  <h3 style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "15px",
                    color: "#00ffe1",
                    letterSpacing: "2px",
                    textShadow: "0 0 10px #00ffe1"
                  }}>
                    Size Guide (cm)
                  </h3>

                  <div style={{
                    width: "100%",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.2)"
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      background: "rgba(0,255,200,0.15)",
                      padding: "15px 0",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textAlign: "center"
                    }}>
                      <div>Size</div>
                      <div>Length</div>
                      <div>Width</div>
                    </div>

                    {[
                      ["S", 61, 58],
                      ["M", 64, 61],
                      ["L", 66, 64],
                      ["XL", 70, 68],
                      ["XXL", 73, 71]
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          padding: "14px 0",
                          background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                          color: "#eee",
                          fontSize: "1.1rem",
                          textAlign: "center",
                          borderBottom: "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        <div>{row[0]}</div>
                        <div>{row[1]}</div>
                        <div>{row[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Washing Instructions */}
                <div style={{
                  flex: "1",
                  minWidth: "330px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  borderRadius: "20px",
                  padding: "25px",
                  boxShadow: "0 0 25px rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)"
                }}>
                  <h3 style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "#fff",
                    letterSpacing: "2px",
                    textShadow: "0 0 8px #fff"
                  }}>
                    Washing<br />Instructions
                  </h3>

                  <ul style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    fontSize: "1.2rem",
                    color: "rgba(255,255,255,0.85)"
                  }}>
                    <li style={{ borderLeft: "3px solid #00ffe1", paddingLeft: "12px" }}>
                      Turn t-shirt inside-out before washing it
                    </li>
                    <li style={{ borderLeft: "3px solid #00ffe1", paddingLeft: "12px" }}>
                      Wash it on a gentle cycle
                    </li>
                    <li style={{ borderLeft: "3px solid #00ffe1", paddingLeft: "12px" }}>
                      Wash at low temperature, preferably cold water
                    </li>
                    <li style={{ borderLeft: "3px solid #00ffe1", paddingLeft: "12px" }}>
                      Iron the t-shirt inside-out — never iron directly on the print
                    </li>
                  </ul>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}