import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top لما ترجع من صفحة المنتج
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // تحديث الـ mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allProducts = useMemo(() => [
    { id: 401, name: "Giltsh Flare", price: "999 EGP", originalPrice: "1400 EGP", image: "/image/Giltshflarecard.jpg", category: "knitted-sweaters", description: "Giltsh Flare by KYN – Shine Different" },
    { id: 402, name: "Blaze Gaze", price: "999 EGP", originalPrice: "1400 EGP", image: "/image/BlazeGazecard.jpg", category: "knitted-sweaters", description: "Blaze Gaze by KYN – Ignite Your Look" },
    { id: 101, name: "KYN – Made Different", price: "999 EGP", originalPrice: "1400 EGP", image: "/image/KYNcard.jpg", category: "knitted-sweaters", description: "KYN – Made Different" },
    { id: 201, name: "Rebel Angel", price: "999 EGP", originalPrice: "1400 EGP", image: "/image/RebelAngelcard.jpg", category: "knitted-sweaters", description: "Rebel Angel by KYN – Break the Halo." },
    { id: 301, name: "Antigravity", price: "999 EGP", originalPrice: "1400 EGP", image: "/image/Antigravirycard.jpg", category: "knitted-sweaters", description: "Antigravity by KYN – Defy the Ordinary" }
  ], []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "knitted-sweaters", name: "Knitted Sweaters" },
    { id: "suits", name: "Suits" },
    { id: "sweatpants", name: "Sweatpants" },
    { id: "jackets", name: "Jackets" }
  ];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product =>
      (product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)) &&
      (activeFilter === "all" || product.category === activeFilter)
    );
  }, [searchQuery, activeFilter, allProducts]);

  const goToProductDetails = useCallback((id) => {
    navigate(`/product/${id}`);
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      padding: isMobile ? "90px 0 140px" : "140px 0 180px"
    }}>
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .kyn-search::placeholder { color: #999; font-weight: 300; opacity: 1; }
        .kyn-search:focus { outline: none; border-color: #fff; box-shadow: 0 0 0 4px rgba(255,255,255,0.08); }
      `}</style>

      {/* Header Section */}
      <div style={{ textAlign: "center", maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "0 20px 60px" : "0 40px 80px" }}>
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            fontSize: isMobile ? "3.8rem" : "6.8rem",
            fontWeight: 100,
            letterSpacing: "9px",
            background: "linear-gradient(90deg, #fff, #ccc, #999, #ccc, #fff)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shine 8s linear infinite",
            margin: "0 0 16px"
          }}
        >
          KYN Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: isMobile ? "1.3rem" : "1.9rem",
            color: "#bbbbbb",
            letterSpacing: "4px",
            fontWeight: 300,
            margin: "0 0 60px"
          }}
        >
          Your Step, Your Thread, Your Family
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            maxWidth: isMobile ? "90%" : "660px",
            width: "100%",
            margin: "0 auto 70px",
            position: "relative"
          }}
        >
          <input
            type="text"
            placeholder="Search the family..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="kyn-search"
            style={{
              width: "100%",
              padding: isMobile ? "18px 56px" : "20px 70px",
              fontSize: "1.25rem",
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.22)",
              borderRadius: "60px",
              color: "#fff",
              backdropFilter: "blur(14px)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              fontWeight: "300",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)"
            }}
          />
          <svg
            style={{
              position: "absolute",
              right: isMobile ? "20px" : "28px",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.7,
              pointerEvents: "none"
            }}
            width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? "12px" : "18px",
            padding: isMobile ? "0 10px" : "0 20px",
            marginBottom: "80px"
          }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: isMobile ? "12px 26px" : "14px 42px",
                background: activeFilter === cat.id ? "#fff" : "transparent",
                color: activeFilter === cat.id ? "#000" : "#fff",
                border: activeFilter === cat.id ? "none" : "1.6px solid rgba(255,255,255,0.28)",
                borderRadius: "50px",
                fontWeight: 500,
                fontSize: isMobile ? "0.98rem" : "1.1rem",
                minWidth: "150px",
                letterSpacing: "1.6px",
                transition: "all 0.35s ease"
              }}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 32px" }}>
        {filteredProducts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(380px, 1fr))",
            gap: isMobile ? "64px" : "76px"
          }}>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 90 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ y: -18 }}
                style={{
                  borderRadius: "34px",
                  overflow: "hidden",
                  background: "rgba(22,22,22,0.98)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
                  cursor: "pointer",
                  position: "relative"
                }}
                onClick={() => goToProductDetails(product.id)}
              >
                <div style={{ height: isMobile ? "480px" : "570px", overflow: "hidden", position: "relative" }}>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1.3 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "75%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.96), transparent)"
                  }} />
                </div>

                <div style={{ padding: "42px 38px" }}>
                  <h3 style={{ fontSize: "2.1rem", fontWeight: 400, marginBottom: "12px", letterSpacing: "1.2px" }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: "1.16rem", color: "#cccccc", lineHeight: "1.75", marginBottom: "30px" }}>
                    {product.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "22px", marginBottom: "34px" }}>
                    <span style={{ fontSize: "2.1rem", fontWeight: 300 }}>{product.price}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: "1.35rem", color: "#777", textDecoration: "line-through" }}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ backgroundColor: "#fff", color: "#000" }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: "100%",
                      padding: "19px",
                      background: "transparent",
                      border: "2px solid white",
                      color: "white",
                      borderRadius: "50px",
                      fontSize: "1.22rem",
                      fontWeight: 500,
                      letterSpacing: "3.2px",
                      transition: "all 0.4s ease"
                    }}
                  >
                    VIEW DETAILS
                  </motion.button>
                </div>

                {/* Shine Effect */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-150%",
                    width: "50%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
                    pointerEvents: "none"
                  }}
                  animate={{ left: ["-150%", "150%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "200px 20px", color: "#888" }}>
            <h3 style={{ fontSize: "3rem", fontWeight: 300, marginBottom: "20px" }}>No family pieces found</h3>
            <p style={{ fontSize: "1.5rem" }}>Try another word, brother</p>
          </div>
        )}
      </div>
    </div>
  );
}