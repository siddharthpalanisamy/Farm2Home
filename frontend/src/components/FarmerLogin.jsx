import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/animations.css";

export default function FarmerLogin() {
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('button-press');
    setTimeout(() => {
      e.currentTarget.classList.remove('button-press');
    }, 200);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - you can add actual authentication later
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // For now, just navigate to dashboard
    // In production, you'd authenticate first
    navigate("/farmer-dashboard");
  };

  return (
    <div style={container} className="animated-gradient">
      <div style={backgroundPattern}></div>
      <div style={contentWrapper} className="fade-in">
        <div style={card} className="scale-in">
          <div style={logoContainer}>
            <div style={logo}>🌾</div>
            <h1 style={heading}>Farmer Login</h1>
            <p style={subheading}>Welcome back! Sign in to manage your farm products</p>
          </div>

          {error && <div style={errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={form}>
            <div style={inputGroup}>
              <label style={label}>Email Address</label>
              <input
                type="email"
                style={input}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setError("")}
              />
            </div>

            <div style={inputGroup}>
              <label style={label}>Password</label>
              <input
                type="password"
                style={input}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setError("")}
              />
            </div>

            <div style={optionsRow}>
              <label style={checkboxLabel}>
                <input type="checkbox" style={checkbox} />
                Remember me
              </label>
              <Link to="#" style={forgotLink}>Forgot password?</Link>
            </div>

            <button 
              type="submit" 
              style={submitButton}
              className="hover-scale"
              onClick={handleButtonClick}
            >
              Sign In
            </button>
          </form>

          <div style={divider}>
            <span style={dividerText}>New to Farm2Home?</span>
          </div>

          <Link to="/farmer-register" style={registerLink}>
            Create Farmer Account
          </Link>

          <Link to="/" style={backLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
};

const contentWrapper = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: "450px",
};

const card = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "48px 40px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
  animation: "slideUp 0.5s ease-out",
};

const logoContainer = {
  textAlign: "center",
  marginBottom: "32px",
};

const logo = {
  fontSize: "64px",
  marginBottom: "16px",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
};

const heading = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 8px 0",
  letterSpacing: "-0.5px",
};

const subheading = {
  fontSize: "15px",
  color: "#718096",
  margin: 0,
  fontWeight: "400",
};

const form = {
  marginTop: "32px",
};

const inputGroup = {
  marginBottom: "24px",
};

const label = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#2d3748",
  marginBottom: "8px",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "15px",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  background: "#fff",
  color: "#1a202c",
  transition: "all 0.2s",
  boxSizing: "border-box",
  outline: "none",
};

const inputFocus = {
  border: "2px solid #667eea",
  boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
};

const errorBox = {
  background: "#fed7d7",
  color: "#c53030",
  padding: "12px 16px",
  borderRadius: "10px",
  fontSize: "14px",
  marginBottom: "20px",
  border: "1px solid #fc8181",
};

const optionsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const checkboxLabel = {
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  color: "#4a5568",
  cursor: "pointer",
};

const checkbox = {
  marginRight: "8px",
  width: "16px",
  height: "16px",
  cursor: "pointer",
};

const forgotLink = {
  fontSize: "14px",
  color: "#667eea",
  textDecoration: "none",
  fontWeight: "500",
  transition: "color 0.2s",
};

const submitButton = {
  width: "100%",
  padding: "16px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  marginBottom: "24px",
};

const divider = {
  textAlign: "center",
  margin: "24px 0",
  position: "relative",
};

const dividerText = {
  fontSize: "14px",
  color: "#a0aec0",
  background: "rgba(255, 255, 255, 0.95)",
  padding: "0 16px",
  position: "relative",
  zIndex: 1,
};

const registerLink = {
  display: "block",
  textAlign: "center",
  padding: "14px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#667eea",
  textDecoration: "none",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  transition: "all 0.2s",
  marginBottom: "16px",
};

const backLink = {
  display: "block",
  textAlign: "center",
  fontSize: "14px",
  color: "#718096",
  textDecoration: "none",
  marginTop: "20px",
  transition: "color 0.2s",
};

