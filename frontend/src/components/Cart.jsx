import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/animations.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('button-press');
    setTimeout(() => {
      e.currentTarget.classList.remove('button-press');
    }, 200);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div style={container}>
        <div style={emptyState}>
          <div style={emptyIcon}>🛒</div>
          <h2 style={emptyTitle}>Your cart is empty</h2>
          <p style={emptyText}>Add some products to get started!</p>
          <button style={continueShoppingButton} onClick={() => navigate("/customer-dashboard")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={container} className="animated-gradient">
      <header style={header} className="slide-up">
        <div style={headerContent}>
          <h1 style={headerTitle}>🛒 Shopping Cart</h1>
          <button style={backButton} onClick={() => navigate("/customer-dashboard")}>
            ← Back to Shop
          </button>
        </div>
      </header>

      <div style={content}>
        <div style={cartSection}>
          <div style={cartHeader}>
            <h2 style={sectionTitle}>Cart Items ({cartItems.length})</h2>
            <button 
              style={clearButton} 
              onClick={(e) => {
                handleButtonClick(e);
                if (window.confirm("Are you sure you want to clear your cart?")) {
                  clearCart();
                }
              }}
              className="hover-scale"
            >
              Clear Cart
            </button>
          </div>

          <div style={itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} style={cartItem}>
                <div style={itemImage}>
                  <img
                    src={item.image_url || "https://via.placeholder.com/150?text=No+Image"}
                    alt={item.name}
                    style={image}
                  />
                </div>

                <div style={itemInfo}>
                  <h3 style={itemName}>{item.name}</h3>
                  <p style={itemCategory}>{item.category}</p>
                  <div style={itemPrice}>₹{item.price}</div>
                </div>

                <div style={quantitySection}>
                  <button
                    style={quantityButton}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span style={quantityValue}>{item.quantity}</span>
                  <button
                    style={quantityButton}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div style={itemTotal}>
                  <div style={totalPrice}>₹{(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    style={removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={summarySection}>
          <div style={summaryCard}>
            <h2 style={summaryTitle}>Order Summary</h2>
            
            <div style={summaryRow}>
              <span>Subtotal:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div style={summaryRow}>
              <span>Shipping:</span>
              <span>₹50.00</span>
            </div>
            
            <div style={summaryRow}>
              <span>Tax (5%):</span>
              <span>₹{(getCartTotal() * 0.05).toFixed(2)}</span>
            </div>
            
            <div style={divider}></div>
            
            <div style={totalRow}>
              <span style={totalLabel}>Total:</span>
              <span style={totalAmount}>
                ₹{(getCartTotal() + 50 + getCartTotal() * 0.05).toFixed(2)}
              </span>
            </div>

            <button 
              style={checkoutButton} 
              onClick={(e) => {
                handleButtonClick(e);
                handleCheckout();
              }}
              className="hover-scale glow-animation"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
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
  gridTemplateColumns: "1fr 400px",
  gap: "30px",
};

const cartSection = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const cartHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const sectionTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: 0,
};

const clearButton = {
  padding: "8px 16px",
  background: "#fed7d7",
  color: "#c53030",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

const itemsList = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const cartItem = {
  display: "grid",
  gridTemplateColumns: "120px 1fr 150px 150px",
  gap: "20px",
  padding: "20px",
  background: "#f7fafc",
  borderRadius: "12px",
  alignItems: "center",
  animation: "slideUp 0.5s ease-out",
  transition: "transform 0.2s",
};

const itemImage = {
  width: "120px",
  height: "120px",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#e2e8f0",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const itemInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const itemName = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 8px 0",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
};

const itemCategory = {
  fontSize: "13px",
  color: "#667eea",
  margin: "0 0 6px 0",
  textTransform: "capitalize",
  fontWeight: "600",
  background: "rgba(102, 126, 234, 0.1)",
  padding: "4px 8px",
  borderRadius: "6px",
  display: "inline-block",
};

const itemPrice = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#28a745",
  background: "rgba(40, 167, 69, 0.1)",
  padding: "6px 12px",
  borderRadius: "8px",
};

const quantitySection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  justifyContent: "center",
};

const quantityButton = {
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: "2px solid #e2e8f0",
  background: "#fff",
  fontSize: "20px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const quantityValue = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1a202c",
  minWidth: "30px",
  textAlign: "center",
};

const itemTotal = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "8px",
};

const totalPrice = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a202c",
};

const removeButton = {
  padding: "6px 12px",
  background: "#fed7d7",
  color: "#c53030",
  border: "none",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const summarySection = {
  position: "sticky",
  top: "20px",
  height: "fit-content",
};

const summaryCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const summaryTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 24px 0",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  fontSize: "16px",
  color: "#4a5568",
};

const divider = {
  height: "1px",
  background: "#e2e8f0",
  margin: "20px 0",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px",
};

const totalLabel = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a202c",
};

const totalAmount = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#667eea",
};

const checkoutButton = {
  width: "100%",
  padding: "16px",
  fontSize: "16px",
  fontWeight: "600",
  color: "white",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
};

const emptyState = {
  maxWidth: "600px",
  margin: "100px auto",
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "60px 40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const emptyIcon = {
  fontSize: "80px",
  marginBottom: "20px",
};

const emptyTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 12px 0",
};

const emptyText = {
  fontSize: "16px",
  color: "#718096",
  margin: "0 0 30px 0",
};

const continueShoppingButton = {
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

