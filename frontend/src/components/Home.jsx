import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/animations.css";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    button.classList.add('ripple-effect', 'button-press');
    setTimeout(() => {
      button.classList.remove('ripple-effect', 'button-press');
    }, 600);
  };

  return (
    <div style={container} className="animated-gradient">
      <div style={backgroundPattern}>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              ...particleStyle,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div style={content} className="fade-in">
        <div style={heroSection}>
          <div style={logoContainer}>
            <div style={logo} className="crop-animation">🌾</div>
            <div style={tractorIcon} className="tractor-animation">🚜</div>
          </div>
          <h1 style={title}>Farm2Home</h1>
          <p style={subtitle}>Your Premium Marketplace for Fresh Farm Products</p>
          <p style={description}>
            Connect directly with farmers and get the freshest produce delivered to your door.
            Join thousands of happy customers and farmers!
          </p>
        </div>

        <div style={cardsContainer}>
          
          {/* Farmer Card */}
          <div style={card}>
            <div style={cardIcon}>👨‍🌾</div>
            <h2 style={cardTitle}>For Farmers</h2>
            <p style={cardDescription}>
              Manage your products, track orders, and grow your farm business with our premium tools.
            </p>
            <button 
              style={cardButton}
              onClick={(e) => {
                handleButtonClick(e);
                setTimeout(() => navigate("/farmer-login"), 200);
              }}
              className="hover-scale"
            >
              Farmer Login
            </button>
            <p style={cardFooter}>
              New farmer? <span style={linkStyle} onClick={() => navigate("/farmer-login")}>Sign up here</span>
            </p>
          </div>

          {/* Customer Card */}
          <div style={card}>
            <div style={cardIcon}>🛒</div>
            <h2 style={cardTitle}>For Customers</h2>
            <p style={cardDescription}>
              Browse fresh produce, order directly from farmers, and enjoy premium quality products.
            </p>
            <button 
              style={{...cardButton, ...customerButton}}
              onClick={(e) => {
                handleButtonClick(e);
                setTimeout(() => navigate("/customer-login"), 200);
              }}
              className="hover-scale"
            >
              Customer Login
            </button>
            <p style={cardFooter}>
              New customer? <span style={linkStyle} onClick={() => navigate("/customer-login")}>Sign up here</span>
            </p>
          </div>
        </div>

        <div style={featuresSection}>
          <div style={feature}>
            <div style={featureIcon}>🚚</div>
            <h3 style={featureTitle}>Fast Delivery</h3>
            <p style={featureText}>Fresh products delivered to your door</p>
          </div>
          <div style={feature}>
            <div style={featureIcon}>🌱</div>
            <h3 style={featureTitle}>Farm Fresh</h3>
            <p style={featureText}>Direct from farm to your table</p>
          </div>
          <div style={feature}>
            <div style={featureIcon}>💳</div>
            <h3 style={featureTitle}>Secure Payment</h3>
            <p style={featureText}>Safe and encrypted transactions</p>
          </div>
          <div style={feature}>
            <div style={featureIcon}>⭐</div>
            <h3 style={featureTitle}>Premium Quality</h3>
            <p style={featureText}>Only the best products for you</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  backgroundSize: "200% 200%",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "20px",
};

const backgroundPattern = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
  `,
  zIndex: 0,
  overflow: "hidden",
};

const particleStyle = {
  position: "absolute",
  width: "4px",
  height: "4px",
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: "50%",
  animation: "floatParticle 20s linear infinite",
  pointerEvents: "none",
};

const content = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "60px 20px",
};

const heroSection = {
  textAlign: "center",
  marginBottom: "60px",
  color: "white",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
  position: "relative",
};

const logo = {
  fontSize: "80px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
};

const tractorIcon = {
  fontSize: "64px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
};

const title = {
  fontSize: "56px",
  fontWeight: "800",
  margin: "0 0 16px 0",
  letterSpacing: "-1px",
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
};

const subtitle = {
  fontSize: "24px",
  fontWeight: "500",
  margin: "0 0 16px 0",
  opacity: 0.95,
};

const description = {
  fontSize: "18px",
  maxWidth: "600px",
  margin: "0 auto",
  opacity: 0.9,
  lineHeight: "1.6",
};

const cardsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px",
  marginBottom: "80px",
};

const card = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "40px",
  textAlign: "center",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s, box-shadow 0.3s",
  animation: "scaleIn 0.5s ease-out",
};

const cardIcon = {
  fontSize: "64px",
  marginBottom: "20px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
  animation: "float 3s ease-in-out infinite",
};

const cardTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 16px 0",
};

const cardDescription = {
  fontSize: "16px",
  color: "#718096",
  lineHeight: "1.6",
  margin: "0 0 30px 0",
};

const cardButton = {
  width: "100%",
  padding: "16px",
  fontSize: "16px",
  fontWeight: "600",
  color: "white",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  marginBottom: "16px",
};

const customerButton = {
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
};

const cardFooter = {
  fontSize: "14px",
  color: "#718096",
  margin: 0,
};

const linkStyle = {
  color: "#667eea",
  cursor: "pointer",
  fontWeight: "600",
  textDecoration: "underline",
};

const featuresSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "30px",
  marginTop: "60px",
};

const feature = {
  textAlign: "center",
  color: "white",
};

const featureIcon = {
  fontSize: "48px",
  marginBottom: "16px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
};

const featureTitle = {
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 8px 0",
};

const featureText = {
  fontSize: "14px",
  opacity: 0.9,
  margin: 0,
};
