import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import DeliveryAnimation from "./DeliveryAnimation";
import "../styles/animations.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart, calculatePointsEarned, calculateCarbonFootprint, addWalletPoints, walletPoints } = useCart();
  
  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('button-press');
    setTimeout(() => {
      e.currentTarget.classList.remove('button-press');
    }, 200);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = 50;
    const tax = subtotal * 0.05;
    return subtotal + shipping + tax;
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    // Generate order ID
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);

    // Save order to localStorage (in production, send to backend)
    const order = {
      id: newOrderId,
      items: cartItems,
      total: calculateTotal(),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
      },
      paymentMethod: formData.paymentMethod,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      tracking: {
        status: "confirmed",
        location: formData.city,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Add wallet points
    const pointsEarned = calculatePointsEarned();
    addWalletPoints(pointsEarned);

    // Clear cart
    clearCart();

    // Show delivery animation first
    setShowDelivery(true);
  };

  if (showDelivery) {
    return (
      <DeliveryAnimation 
        onComplete={() => {
          setShowDelivery(false);
          setOrderPlaced(true);
        }}
      />
    );
  }

  if (orderPlaced) {
    return (
      <div style={container}>
        <div style={successCard}>
          <div style={successIcon}>✅</div>
          <h1 style={successTitle}>Order Placed Successfully!</h1>
          <p style={successText}>Your order ID is: <strong>{orderId}</strong></p>
          <p style={successSubtext}>
            We've sent a confirmation email to {formData.email}
          </p>
          <div style={successActions}>
            <button style={trackOrderButton} onClick={() => navigate(`/orders/${orderId}`)}>
              Track Order
            </button>
            <button style={continueButton} onClick={() => navigate("/customer-dashboard")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={container} className="animated-gradient">
      <header style={header} className="slide-up">
        <div style={headerContent}>
          <h1 style={headerTitle}>💳 Checkout</h1>
          <button style={backButton} onClick={() => navigate("/cart")}>
            ← Back to Cart
          </button>
        </div>
      </header>

      <div style={content}>
        <div style={checkoutContent}>
          {/* Progress Steps */}
          <div style={stepsContainer}>
            <div style={{ ...step, ...(currentStep >= 1 ? activeStep : {}) }}>
              <div style={stepNumber}>1</div>
              <div style={stepLabel}>Shipping</div>
            </div>
            <div style={stepLine}></div>
            <div style={{ ...step, ...(currentStep >= 2 ? activeStep : {}) }}>
              <div style={stepNumber}>2</div>
              <div style={stepLabel}>Payment</div>
            </div>
            <div style={stepLine}></div>
            <div style={{ ...step, ...(currentStep >= 3 ? activeStep : {}) }}>
              <div style={stepNumber}>3</div>
              <div style={stepLabel}>Review</div>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div style={stepCard}>
              <h2 style={stepTitle}>Shipping Information</h2>
              <div style={formGrid}>
                <div style={inputGroup}>
                  <label style={label}>Full Name *</label>
                  <input
                    style={input}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>Email *</label>
                  <input
                    type="email"
                    style={input}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>Phone *</label>
                  <input
                    type="tel"
                    style={input}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div style={{ ...inputGroup, gridColumn: "1 / -1" }}>
                  <label style={label}>Address *</label>
                  <input
                    style={input}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Street"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>City *</label>
                  <input
                    style={input}
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>State *</label>
                  <input
                    style={input}
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Maharashtra"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>Pincode *</label>
                  <input
                    style={input}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                  />
                </div>
                <div style={inputGroup}>
                  <label style={label}>Get Current Location</label>
                  <button
                    type="button"
                    style={locationButton}
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          alert(`Location: ${position.coords.latitude}, ${position.coords.longitude}\nWe'll use this for delivery tracking.`);
                        });
                      } else {
                        alert("Geolocation is not supported by your browser");
                      }
                    }}
                  >
                    📍 Use Current Location
                  </button>
                </div>
              </div>
              <button 
                style={nextButton} 
                onClick={(e) => {
                  handleButtonClick(e);
                  setTimeout(() => setCurrentStep(2), 200);
                }}
                className="hover-scale"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div style={stepCard}>
              <h2 style={stepTitle}>Payment Method</h2>
              
              {/* Wallet Points & Carbon Footprint Info */}
              <div style={infoBanner}>
                <div style={pointsSection}>
                  <div style={pointsIcon}>🎁</div>
                  <div>
                    <div style={pointsLabel}>Points You'll Earn</div>
                    <div style={pointsValue}>+{calculatePointsEarned()} points</div>
                    <div style={pointsSubtext}>1 point = ₹10 spent</div>
                  </div>
                </div>
                <div style={footprintSection}>
                  <div style={footprintIcon}>🌱</div>
                  <div>
                    <div style={footprintLabel}>Carbon Footprint</div>
                    <div style={footprintValue}>{calculateCarbonFootprint()} kg CO₂</div>
                    <div style={footprintSubtext}>Estimated for this order</div>
                  </div>
                </div>
              </div>

              <div style={paymentMethods}>
                <label 
                  style={{
                    ...paymentOption,
                    ...(formData.paymentMethod === "card" ? paymentOptionActive : {}),
                    ...paymentOptionCard
                  }}
                  onMouseEnter={(e) => {
                    if (formData.paymentMethod !== "card") {
                      e.currentTarget.style.borderColor = "#2563eb";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0.2) 100%)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.paymentMethod !== "card") {
                      e.currentTarget.style.borderColor = "#2563eb";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.15) 100%)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                  />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label 
                  style={{
                    ...paymentOption,
                    ...(formData.paymentMethod === "upi" ? paymentOptionActive : {}),
                    ...paymentOptionUPI
                  }}
                  onMouseEnter={(e) => {
                    if (formData.paymentMethod !== "upi") {
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(124, 58, 237, 0.2) 100%)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.paymentMethod !== "upi") {
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.15) 100%)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === "upi"}
                    onChange={handleInputChange}
                  />
                  <span>📱 UPI</span>
                </label>
                <label 
                  style={{
                    ...paymentOption,
                    ...(formData.paymentMethod === "cod" ? paymentOptionActive : {}),
                    ...paymentOptionCOD
                  }}
                  onMouseEnter={(e) => {
                    if (formData.paymentMethod !== "cod") {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(5, 150, 105, 0.12) 0%, rgba(5, 150, 105, 0.2) 100%)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.paymentMethod !== "cod") {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.15) 100%)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                  />
                  <span>💵 Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === "card" && (
                <div style={cardForm}>
                  <div style={inputGroup}>
                    <label style={label}>Card Number</label>
                    <input
                      style={input}
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div style={inputGroup}>
                    <label style={label}>Cardholder Name</label>
                    <input
                      style={input}
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div style={formRow}>
                    <div style={inputGroup}>
                      <label style={label}>Expiry</label>
                      <input
                        style={input}
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div style={inputGroup}>
                      <label style={label}>CVV</label>
                      <input
                        style={input}
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "upi" && (
                <div style={upiForm}>
                  <input
                    style={input}
                    placeholder="Enter UPI ID (e.g., name@paytm)"
                    value={formData.upiId || ""}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  />
                </div>
              )}

              <div style={buttonRow}>
                <button 
                  style={backStepButton} 
                  onClick={(e) => {
                    handleButtonClick(e);
                    setTimeout(() => setCurrentStep(1), 200);
                  }}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <button 
                  style={nextButton} 
                  onClick={(e) => {
                    handleButtonClick(e);
                    setTimeout(() => setCurrentStep(3), 200);
                  }}
                  className="hover-scale"
                >
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {currentStep === 3 && (
            <div style={stepCard}>
              <h2 style={stepTitle}>Review Your Order</h2>
              
              {/* Rewards Preview */}
              <div style={rewardsPreview}>
                <div style={rewardCard}>
                  <div style={rewardIcon}>🎁</div>
                  <div style={rewardContent}>
                    <div style={rewardTitle}>Points You'll Earn</div>
                    <div style={rewardValue}>+{calculatePointsEarned()} points</div>
                    <div style={rewardDesc}>Your current balance: {walletPoints} points</div>
                  </div>
                </div>
                <div style={rewardCard}>
                  <div style={rewardIcon}>🌱</div>
                  <div style={rewardContent}>
                    <div style={rewardTitle}>Carbon Footprint</div>
                    <div style={rewardValue}>{calculateCarbonFootprint()} kg CO₂</div>
                    <div style={rewardDesc}>Estimated for this order</div>
                  </div>
                </div>
              </div>
              
              <div style={reviewSection}>
                <h3 style={reviewTitle}>Shipping Details</h3>
                <div style={reviewInfo}>
                  <p><strong>{formData.name}</strong></p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.address}, {formData.city}, {formData.state} {formData.pincode}</p>
                </div>
              </div>

              <div style={reviewSection}>
                <h3 style={reviewTitle}>Order Summary</h3>
                {cartItems.map((item) => (
                  <div key={item.id} style={reviewItem}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={reviewSection}>
                <div style={reviewRow}>
                  <span>Subtotal:</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div style={reviewRow}>
                  <span>Shipping:</span>
                  <span>₹50.00</span>
                </div>
                <div style={reviewRow}>
                  <span>Tax:</span>
                  <span>₹{(getCartTotal() * 0.05).toFixed(2)}</span>
                </div>
                <div style={totalReviewRow}>
                  <span>Total:</span>
                  <span style={totalReviewAmount}>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div style={buttonRow}>
                <button 
                  style={backStepButton} 
                  onClick={(e) => {
                    handleButtonClick(e);
                    setTimeout(() => setCurrentStep(2), 200);
                  }}
                  className="hover-scale"
                >
                  ← Back
                </button>
                <button 
                  style={placeOrderButton} 
                  onClick={(e) => {
                    handleButtonClick(e);
                    handlePlaceOrder();
                  }}
                  className="hover-scale glow-animation"
                >
                  Place Order 🎉
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div style={sidebar}>
          <div style={sidebarCard}>
            <h3 style={sidebarTitle}>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} style={sidebarItem}>
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={sidebarDivider}></div>
            <div style={sidebarTotalRow}>
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div style={sidebarTotalRow}>
              <span>Shipping:</span>
              <span>₹50.00</span>
            </div>
            <div style={sidebarTotalRow}>
              <span>Tax:</span>
              <span>₹{(getCartTotal() * 0.05).toFixed(2)}</span>
            </div>
            <div style={sidebarDivider}></div>
            <div style={sidebarTotalRow}>
              <span>Total:</span>
              <span style={sidebarTotalAmount}>₹{calculateTotal().toFixed(2)}</span>
            </div>
            
            {/* Rewards & Carbon Info */}
            <div style={sidebarInfo}>
              <div style={sidebarInfoItem}>
                <span style={sidebarInfoLabel}>🎁 Points Earned:</span>
                <span style={sidebarInfoValue}>+{calculatePointsEarned()}</span>
              </div>
              <div style={sidebarInfoItem}>
                <span style={sidebarInfoLabel}>🌱 Carbon Footprint:</span>
                <span style={sidebarInfoValue}>{calculateCarbonFootprint()} kg CO₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundSize: "200% 200%",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "20px",
};

const header = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  padding: "20px 40px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
  marginBottom: "30px",
};

const headerContent = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headerTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a202c",
  margin: 0,
};

const backButton = {
  padding: "10px 20px",
  background: "#e2e8f0",
  color: "#4a5568",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

const content = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 350px",
  gap: "30px",
};

const checkoutContent = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  animation: "slideUp 0.5s ease-out",
};

const stepsContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "40px",
  gap: "12px",
};

const step = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  opacity: 0.5,
};

const activeStep = {
  opacity: 1,
};

const stepNumber = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#e2e8f0",
  color: "#718096",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "700",
};

const stepLine = {
  width: "60px",
  height: "2px",
  background: "#e2e8f0",
};

const stepLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#718096",
};

const stepCard = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const stepTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: 0,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#2d3748",
};

const input = {
  padding: "14px 16px",
  fontSize: "15px",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  background: "#fff",
  color: "#1a202c",
  transition: "all 0.2s",
  outline: "none",
  boxSizing: "border-box",
};

const locationButton = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "15px",
  border: "2px solid #667eea",
  borderRadius: "12px",
  background: "#fff",
  color: "#667eea",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
};

const nextButton = {
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "600",
  color: "white",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  alignSelf: "flex-end",
};

const infoBanner = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "32px",
  padding: "20px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  borderRadius: "16px",
  border: "1px solid rgba(102, 126, 234, 0.2)",
};

const pointsSection = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const pointsIcon = {
  fontSize: "40px",
};

const pointsLabel = {
  fontSize: "14px",
  color: "#718096",
  fontWeight: "500",
  marginBottom: "4px",
};

const pointsValue = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#667eea",
  marginBottom: "4px",
};

const pointsSubtext = {
  fontSize: "12px",
  color: "#a0aec0",
};

const footprintSection = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const footprintIcon = {
  fontSize: "40px",
};

const footprintLabel = {
  fontSize: "14px",
  color: "#718096",
  fontWeight: "500",
  marginBottom: "4px",
};

const footprintValue = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#28a745",
  marginBottom: "4px",
};

const footprintSubtext = {
  fontSize: "12px",
  color: "#a0aec0",
};

const paymentMethods = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "24px",
};

const paymentOption = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "20px 24px",
  border: "3px solid #e2e8f0",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontSize: "18px",
  fontWeight: "700",
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  color: "#1a202c",
};

const paymentOptionActive = {
  borderColor: "#667eea",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
  transform: "scale(1.02)",
  color: "#1a202c",
};

const paymentOptionCard = {
  borderColor: "#2563eb",
  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.15) 100%)",
  color: "#1a202c",
};

const paymentOptionUPI = {
  borderColor: "#7c3aed",
  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.15) 100%)",
  color: "#1a202c",
};

const paymentOptionCOD = {
  borderColor: "#059669",
  background: "linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.15) 100%)",
  color: "#1a202c",
};

const rewardsPreview = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "32px",
};

const rewardCard = {
  display: "flex",
  gap: "16px",
  padding: "24px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  borderRadius: "16px",
  border: "1px solid rgba(102, 126, 234, 0.2)",
  alignItems: "center",
};

const rewardIcon = {
  fontSize: "48px",
};

const rewardContent = {
  flex: 1,
};

const rewardTitle = {
  fontSize: "14px",
  color: "#718096",
  fontWeight: "500",
  marginBottom: "8px",
};

const rewardValue = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#667eea",
  marginBottom: "4px",
};

const rewardDesc = {
  fontSize: "12px",
  color: "#a0aec0",
};

const cardForm = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "20px",
};

const formRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const upiForm = {
  marginTop: "20px",
};

const buttonRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  marginTop: "24px",
};

const backStepButton = {
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#4a5568",
  background: "#e2e8f0",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
};

const placeOrderButton = {
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "600",
  color: "white",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
};

const reviewSection = {
  marginBottom: "24px",
};

const reviewTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 12px 0",
};

const reviewInfo = {
  fontSize: "14px",
  color: "#4a5568",
  lineHeight: "1.6",
};

const reviewItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  borderBottom: "2px solid #e2e8f0",
  background: "rgba(102, 126, 234, 0.05)",
  marginBottom: "8px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  color: "#1a202c",
};

const reviewRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  fontSize: "14px",
  color: "#4a5568",
};

const totalReviewRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0",
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
  borderTop: "2px solid #e2e8f0",
  marginTop: "8px",
};

const totalReviewAmount = {
  color: "#667eea",
};

const sidebar = {
  position: "sticky",
  top: "20px",
  height: "fit-content",
};

const sidebarCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const sidebarTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 20px 0",
};

const sidebarItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 12px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a202c",
  background: "rgba(102, 126, 234, 0.08)",
  marginBottom: "8px",
  borderRadius: "8px",
  border: "1px solid rgba(102, 126, 234, 0.2)",
};

const sidebarDivider = {
  height: "2px",
  background: "#e2e8f0",
  margin: "16px 0",
};

const sidebarTotalRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
};

const sidebarTotalAmount = {
  color: "#667eea",
};

const sidebarInfo = {
  marginTop: "20px",
  padding: "16px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
  borderRadius: "12px",
  border: "1px solid rgba(102, 126, 234, 0.1)",
};

const sidebarInfoItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  fontSize: "13px",
};

const sidebarInfoLabel = {
  color: "#4a5568",
  fontWeight: "500",
};

const sidebarInfoValue = {
  color: "#667eea",
  fontWeight: "700",
};

const successCard = {
  maxWidth: "600px",
  margin: "100px auto",
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "60px 40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const successIcon = {
  fontSize: "80px",
  marginBottom: "20px",
};

const successTitle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 16px 0",
};

const successText = {
  fontSize: "18px",
  color: "#4a5568",
  margin: "0 0 8px 0",
};

const successSubtext = {
  fontSize: "14px",
  color: "#718096",
  margin: "0 0 30px 0",
};

const successActions = {
  display: "flex",
  gap: "16px",
  justifyContent: "center",
};

const trackOrderButton = {
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "600",
  color: "white",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
};

const continueButton = {
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#4a5568",
  background: "#e2e8f0",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
};

