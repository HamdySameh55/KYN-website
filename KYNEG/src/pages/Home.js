import React, { useState } from "react";

export default function Home() {
  const isMobile = window.innerWidth < 768;
  const [hovered, setHovered] = useState(null);

  const stackContainer = {
    position: "relative",
    width: isMobile ? "90%" : "400px",
    height: isMobile ? "300px" : "450px",
    margin: "0 auto",
  };

  const baseImg = {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    objectFit: "cover",
    position: "absolute",
    boxShadow: "0 10px 40px rgba(255,255,255,0.2)",
    transition: "0.5s",
    cursor: "pointer",
  };

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a", // لون الصفحة
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentWrapper = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: "60px",
    maxWidth: "1200px",
    width: "100%",
    padding: "40px",
    boxSizing: "border-box",
  };

  const textBox = {
    flex: 1,
    textAlign: "center",
    fontFamily: "'Cursive', sans-serif", // خط سينتتك
    color: "#ffffff", // كلام أبيض
  };

  const cards = [
    { src: "/mnt/data/6a9e5886-5f19-4f9f-b903-2b393c7899fc.png", rotate: -6, y: -15 },
    { src: "/mnt/data/6a9e5886-5f19-4f9f-b903-2b393c7899fc.png", rotate: 3, y: 10 },
    { src: "/mnt/data/6a9e5886-5f19-4f9f-b903-2b393c7899fc.png", rotate: -2, y: 25 },
  ];

  return (
    <div style={containerStyle}>
      <div style={contentWrapper}>
        {/* الكلام كله في كونتينر واحد */}
        <div style={textBox}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>𓂀 KYN 𓂀</h1>
          <h2 style={{ fontSize: "28px", marginBottom: "20px", fontStyle: "italic" }}>
            Clothing (Brand)
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
            KYN: Your Step. Your Thread. Your Family.<br/>
            Dress bold. Live free. Wear KYN.
          </p>
        </div>

        {/* الصور المتكدسة على اليمين */}
        <div style={stackContainer}>
          {cards.map((card, index) => (
            <img
              key={index}
              src={card.src}
              alt={`card${index + 1}`}
              style={{
                ...baseImg,
                transform:
                  hovered === index
                    ? `rotate(${card.rotate}deg) translateY(${card.y - 20}px) scale(1.05)`
                    : `rotate(${card.rotate}deg) translateY(${card.y}px)`,
                zIndex: index + 1,
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
