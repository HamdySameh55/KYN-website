import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import signature from "../image/sign.png";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // بيانات الجدول الزمني لتطور العلامة التجارية
  const timelineData = [
    {
      step: "01",
      title: "The Spark",
      description: "A young guy walking through the crowd realized - 'I look good... but this isn't me.' That was the beginning of everything.",
    },
    {
      step: "02", 
      title: "The First Thread",
      description: "Started with a single black thread that carried every sleepless night, every risk, every story stitched into fabric.",
    },
    {
      step: "03",
      title: "The Movement",
      description: "KYN evolved from just an idea to a movement - for those who chase dreams and live by their own rhythm.",
    },
    {
      step: "04",
      title: "The Journey Continues",
      description: "The promise that the journey would never end. More stories to write, more steps to take.",
    }
  ];

  // فريق العمل
  const teamMembers = [
    {
      id: 1,
      name: "The Founder",
      role: "Visionary",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      description: "The one who started it all with a single thought and turned it into a movement."
    },
    {
      id: 2,
      name: "The Creators",
      role: "Design Team",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
      description: "The talented minds behind every stitch and design that defines KYN."
    },
    {
      id: 3,
      name: "The Family",
      role: "Community",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
      description: "Friends, supporters, and everyone who believed in the KYN vision from day one."
    }
  ];

  // العناصر التفاعلية الجديدة
  const interactiveElements = [
    {
      title: "The Fabric of Motion",
      description: "Each garment is engineered for movement, designed to move with you through every step of your journey.",
      pattern: "linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%)",
      size: "20px 20px"
    },
    {
      title: "Urban Canvas", 
      description: "Our designs transform the cityscape into your personal runway, where every street tells a story.",
      pattern: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
      size: "30px 30px"
    },
    {
      title: "Night & Day",
      description: "From sunrise runs to midnight inspiration, our collection adapts to your 24/7 lifestyle.",
      pattern: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px)",
      size: "20px 20px"
    },
    {
      title: "The Rhythm",
      description: "Feel the pulse of the city in every stitch, designed for those who move to their own beat.",
      pattern: "linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%)",
      size: "40px 40px"
    }
  ];

  const containerStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Playfair Display', serif",
    overflow: "hidden",
  };

  const heroSection = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "100%",
    padding: "100px 20px 60px",
    margin: "0 auto",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
    textAlign: "center",
  };

  const floatingElements = Array(15).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div style={containerStyle}>
      {/* الخلفية المتحركة */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden" }}>
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            style={{
              position: "absolute",
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: "-50px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "linear",
            }}
          />
        ))}
        
        <motion.img
          src={signature}
          alt="background signature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
          }}
        />
      </div>

      {/* Hero Section */}
      <div style={heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: "800px", marginBottom: "60px" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: isMobile ? "2.5rem" : "4rem",
              background: "linear-gradient(45deg, #fff, #ccc, #999)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              animation: "gradientShift 3s ease infinite",
              marginBottom: "20px",
              fontWeight: "700",
              lineHeight: isMobile ? "1.2" : "1.1",
            }}
          >
            Our Story
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              width: "100px",
              height: "3px",
              background: "linear-gradient(90deg, transparent, #fff, transparent)",
              margin: "0 auto 30px",
            }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              lineHeight: "1.6",
              color: "rgba(255,255,255,0.9)",
              fontStyle: "italic",
              marginBottom: "40px",
              padding: isMobile ? "0 10px" : "0",
            }}
          >
            Every step has a beginning… and this was the first.
          </motion.p>
        </motion.div>

        {/* القصة الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            maxWidth: "900px",
            background: "rgba(20,20,20,0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "25px",
            padding: isMobile ? "25px 15px" : "50px 40px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 15px 50px rgba(0,0,0,0.5)",
            marginBottom: "60px",
            textAlign: "left",
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.8",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            There was a young guy who was always on the move – not just running through streets, but through life itself. Escaping routine, noise, and the idea of everyone looking the same.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.8",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            One day, walking through the crowd, he looked down at his clothes and thought: "I look good... but this isn't me." That was the spark. He didn't want to start a brand – he wanted to start a movement. He called it KYN.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.8",
              marginBottom: "20px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            K stood for that first push – the decision to move. Y was for the people beside him – family, friends, the ones who said, "Keep going." N was a promise – that the journey would never end.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.8",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            He started with a single black thread – a thread that carried every sleepless night, every risk, every story stitched into fabric. KYN was born from motion itself. For those who chase their dreams, for those who start from zero, for those who live by their own rhythm. Not just clothing. KYN is a step. A story. A feeling you wear.
          </motion.p>
        </motion.div>

        {/* الجدول الزمني */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "60px",
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            textAlign: "center",
            marginBottom: "40px",
            background: "linear-gradient(135deg, #fff, #aaa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            lineHeight: "1.2",
          }}>
            Our Journey
          </h2>
          
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? "25px" : "0",
          }}>
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setActiveTimeline(index)}
                onHoverEnd={() => setActiveTimeline(null)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  minHeight: isMobile ? "auto" : "300px",
                }}
              >
                {/* الخط الواصل */}
                {index < timelineData.length - 1 && !isMobile && (
                  <div style={{
                    position: "absolute",
                    top: "40px",
                    left: "50%",
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                    zIndex: 0,
                  }} />
                )}
                
                {/* الرقم */}
                <motion.div
                  animate={{ 
                    scale: activeTimeline === index ? 1.3 : 1,
                    backgroundColor: activeTimeline === index ? "#fff" : "rgba(255,255,255,0.1)",
                    color: activeTimeline === index ? "#000" : "rgba(255,255,255,0.7)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginBottom: "20px",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {item.step}
                </motion.div>
                
                {/* العنوان */}
                <motion.h4
                  animate={{ color: activeTimeline === index ? "#fff" : "rgba(255,255,255,0.9)" }}
                  style={{
                    fontSize: isMobile ? "1.1rem" : "1.2rem",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item.title}
                </motion.h4>
                
                {/* الوصف */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeTimeline === index ? 1 : 0,
                    height: activeTimeline === index ? "auto" : 0,
                  }}
                  style={{
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: "1.5",
                    overflow: "hidden",
                    padding: isMobile ? "0 5px" : "0",
                  }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* فريق العمل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "60px",
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            textAlign: "center",
            marginBottom: "40px",
            background: "linear-gradient(135deg, #fff, #aaa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            lineHeight: "1.2",
          }}>
            Our Family
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "25px",
          }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                }}
                onHoverStart={() => setHoveredCard(member.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  background: "rgba(20,20,20,0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: "100%",
                  height: isMobile ? "200px" : "220px",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  }} />
                </div>
                
                <div style={{
                  padding: "20px",
                  textAlign: "center",
                }}>
                  <h3 style={{
                    fontSize: isMobile ? "1.2rem" : "1.3rem",
                    fontWeight: "700",
                    marginBottom: "6px",
                    color: "#fff",
                  }}>
                    {member.name}
                  </h3>
                  
                  <p style={{
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    fontWeight: "600",
                    marginBottom: "12px",
                    color: "rgba(255,255,255,0.7)",
                  }}>
                    {member.role}
                  </p>
                  
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCard === member.id ? 1 : 0,
                      height: hoveredCard === member.id ? "auto" : 0,
                    }}
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      color: "rgba(255,255,255,0.8)",
                      overflow: "hidden",
                    }}
                  >
                    {member.description}
                  </motion.p>
                </div>
                
                {/* تأثير اللمعان */}
                <motion.div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                    top: 0,
                    left: "-100%",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                  animate={{
                    left: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* دعوة للعمل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "50px",
            padding: isMobile ? "0 15px" : "0",
          }}
        >
          <h2 style={{
            fontSize: isMobile ? "1.8rem" : "2.3rem",
            marginBottom: "15px",
            background: "linear-gradient(135deg, #fff, #aaa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
            lineHeight: "1.2",
          }}>
            Join Our Journey
          </h2>
          
          <p style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            lineHeight: "1.6",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "30px",
          }}>
            Be part of our story. Wear your journey. Make your step count.
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}>
            <motion.button
              onClick={() => navigate("/product")}
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isMobile ? "12px 25px" : "15px 30px",
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: "700",
                background: "transparent",
                border: "2px solid #fff",
                color: "#fff",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                minWidth: isMobile ? "140px" : "160px",
              }}
            >
              Shop Now
            </motion.button>
            
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isMobile ? "12px 25px" : "15px 30px",
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: "700",
                background: "transparent",
                border: "2px solid #fff",
                color: "#fff",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                minWidth: isMobile ? "140px" : "160px",
              }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>

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