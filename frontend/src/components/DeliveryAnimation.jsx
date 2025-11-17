import React, { useEffect, useState } from "react";
import "../styles/animations.css";

export default function DeliveryAnimation({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: preparing, 1: riding, 2: arriving

  useEffect(() => {
    // Sequence: Prepare -> Ride -> Arrive
    const timer1 = setTimeout(() => setStage(1), 1500);
    const timer2 = setTimeout(() => setStage(2), 4000);
    const timer3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const getBikePosition = () => {
    if (stage === 0) return "-100px";
    if (stage === 1) return "30%";
    return "50%";
  };

  return (
    <div style={overlay}>
      <div style={animationContainer}>
        {/* Sky/Background */}
        <div style={skyBackground}></div>
        
        <div style={messageBox}>
          {stage === 0 && (
            <>
              <div style={icon}>📦</div>
              <h2 style={messageTitle}>Preparing Your Order...</h2>
              <p style={messageText}>Our delivery partner is getting ready!</p>
            </>
          )}
          {stage === 1 && (
            <>
              <h2 style={messageTitle}>On the Way! 🚚</h2>
              <p style={messageText}>Your order is being delivered to you!</p>
            </>
          )}
          {stage === 2 && (
            <>
              <h2 style={messageTitle}>Almost There! 🎉</h2>
              <p style={messageText}>Your order will arrive soon!</p>
            </>
          )}
        </div>
        
        {/* Bike Delivery Animation */}
        <div style={{
          ...bikeContainer,
          left: getBikePosition(),
          opacity: stage === 0 ? 0 : 1,
          transition: "left 2.5s ease-in-out, opacity 0.5s",
        }}>
          <div style={packageBox} className={stage === 1 ? "float-animation" : ""}>📦</div>
          <div style={bike} className={stage === 1 ? "bike-moving" : stage === 2 ? "bounce-animation" : ""}>
            <div style={bikeBody}>🚴</div>
            <div style={wheel} className={stage === 1 ? "spin-animation" : ""}>⚪</div>
            <div style={wheel} className={stage === 1 ? "spin-animation" : ""}>⚪</div>
          </div>
        </div>
        
        {/* Road/Path Animation */}
        <div style={road}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                ...roadLine,
                left: `${i * 8.33}%`,
              }}
              className="road-line-moving"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  animation: "fadeIn 0.3s ease-out",
};

const animationContainer = {
  position: "relative",
  width: "100%",
  maxWidth: "700px",
  height: "450px",
  background: "linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  border: "3px solid rgba(255, 255, 255, 0.3)",
};

const messageBox = {
  position: "absolute",
  top: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  zIndex: 10,
  color: "white",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
};

const icon = {
  fontSize: "80px",
  marginBottom: "20px",
  animation: "bounce 1s infinite",
};

const messageTitle = {
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 12px 0",
  color: "#fff",
};

const messageText = {
  fontSize: "18px",
  margin: 0,
  opacity: 0.95,
};

const skyBackground = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: "80px",
  background: "linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)",
  zIndex: 1,
};

const bikeContainer = {
  position: "absolute",
  bottom: "120px",
  transform: "translateX(-50%)",
  transition: "left 2.5s ease-in-out, opacity 0.5s",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const packageBox = {
  fontSize: "36px",
  marginBottom: "8px",
  animation: "float 1s ease-in-out infinite",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
};

const bike = {
  position: "relative",
  fontSize: "70px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))",
};

const bikeBody = {
  fontSize: "70px",
  display: "inline-block",
};

const wheel = {
  fontSize: "32px",
  display: "inline-block",
};

const road = {
  position: "absolute",
  bottom: "20px",
  left: 0,
  right: 0,
  height: "80px",
  background: "#4a5568",
  borderTop: "4px solid #2d3748",
  zIndex: 2,
};

const roadLine = {
  position: "absolute",
  top: "50%",
  width: "50px",
  height: "4px",
  background: "#fff",
  transform: "translateY(-50%)",
};

