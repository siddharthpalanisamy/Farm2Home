import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setNotFound(true);
    }
  }, [orderId]);

  const getStatusInfo = (status) => {
    const statuses = {
      confirmed: { text: "Order Confirmed", icon: "✅", color: "#667eea", progress: 25 },
      processing: { text: "Processing", icon: "🔄", color: "#f093fb", progress: 50 },
      shipped: { text: "Shipped", icon: "🚚", color: "#4facfe", progress: 75 },
      outForDelivery: { text: "Out for Delivery", icon: "📦", color: "#43e97b", progress: 90 },
      delivered: { text: "Delivered", icon: "🎉", color: "#28a745", progress: 100 },
      cancelled: { text: "Cancelled", icon: "❌", color: "#dc3545", progress: 0 },
    };
    return statuses[status] || statuses.confirmed;
  };

  if (notFound) {
    return (
      <div style={container}>
        <div style={errorCard}>
          <div style={errorIcon}>❌</div>
          <h2 style={errorTitle}>Order Not Found</h2>
          <p style={errorText}>The order ID you're looking for doesn't exist.</p>
          <button style={backHomeButton} onClick={() => navigate("/customer-dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={container}>
        <div style={loadingCard}>Loading order details...</div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.tracking?.status || order.status);

  return (
    <div style={container}>
      <header style={header}>
        <div style={headerContent}>
          <h1 style={headerTitle}>📦 Order Tracking</h1>
          <div style={headerActions}>
            <Link to="/orders" style={ordersLink}>My Orders</Link>
            <button style={backButton} onClick={() => navigate("/customer-dashboard")}>
              Back to Shop
            </button>
          </div>
        </div>
      </header>

      <div style={content}>
        {/* Order Info Card */}
        <div style={infoCard}>
          <div style={orderHeader}>
            <div>
              <h2 style={orderIdText}>Order ID: {order.id}</h2>
              <p style={orderDate}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div style={{ ...statusBadge, background: statusInfo.color }}>
              <span style={statusIcon}>{statusInfo.icon}</span>
              <span style={statusText}>{statusInfo.text}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={progressContainer}>
            <div style={progressBar}>
              <div 
                style={{
                  ...progressFill,
                  width: `${statusInfo.progress}%`,
                  background: statusInfo.color,
                }}
              ></div>
            </div>
            <div style={progressLabels}>
              <span style={progressLabel}>Confirmed</span>
              <span style={progressLabel}>Processing</span>
              <span style={progressLabel}>Shipped</span>
              <span style={progressLabel}>Delivered</span>
            </div>
          </div>
        </div>

        <div style={grid}>
          {/* Order Details */}
          <div style={sectionCard}>
            <h3 style={sectionTitle}>Order Details</h3>
            <div style={itemsList}>
              {order.items.map((item) => (
                <div key={item.id} style={orderItem}>
                  <img
                    src={item.image_url || "https://via.placeholder.com/80?text=No+Image"}
                    alt={item.name}
                    style={itemImage}
                  />
                  <div style={itemDetails}>
                    <h4 style={itemName}>{item.name}</h4>
                    <p style={itemCategory}>{item.category}</p>
                    <p style={itemQuantity}>Quantity: {item.quantity}</p>
                  </div>
                  <div style={itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div style={orderTotal}>
              <div style={totalRow}>
                <span>Subtotal:</span>
                <span>₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div style={totalRow}>
                <span>Shipping:</span>
                <span>₹50.00</span>
              </div>
              <div style={totalRow}>
                <span>Tax:</span>
                <span>₹{(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05).toFixed(2)}</span>
              </div>
              <div style={finalTotalRow}>
                <span>Total:</span>
                <span style={finalTotalAmount}>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div style={sectionCard}>
            <h3 style={sectionTitle}>Shipping Information</h3>
            <div style={infoSection}>
              <p style={infoLabel}>Name:</p>
              <p style={infoValue}>{order.customer.name}</p>
              
              <p style={infoLabel}>Email:</p>
              <p style={infoValue}>{order.customer.email}</p>
              
              <p style={infoLabel}>Phone:</p>
              <p style={infoValue}>{order.customer.phone}</p>
              
              <p style={infoLabel}>Address:</p>
              <p style={infoValue}>{order.customer.address}</p>
              
              {order.tracking?.location && (
                <>
                  <p style={infoLabel}>Current Location:</p>
                  <p style={infoValue}>📍 {order.tracking.location}</p>
                </>
              )}
              
              {order.tracking?.estimatedDelivery && (
                <>
                  <p style={infoLabel}>Estimated Delivery:</p>
                  <p style={infoValue}>
                    📅 {new Date(order.tracking.estimatedDelivery).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>

            <h3 style={{ ...sectionTitle, marginTop: "32px" }}>Payment Information</h3>
            <div style={infoSection}>
              <p style={infoLabel}>Payment Method:</p>
              <p style={infoValue}>
                {order.paymentMethod === "card" ? "💳 Credit/Debit Card" :
                 order.paymentMethod === "upi" ? "📱 UPI" :
                 "💵 Cash on Delivery"}
              </p>
              <p style={infoLabel}>Payment Status:</p>
              <p style={infoValue}>✅ Paid</p>
            </div>

            {/* Map View (Placeholder) */}
            <div style={mapContainer}>
              <div style={mapPlaceholder}>
                <div style={mapIcon}>🗺️</div>
                <p style={mapText}>Delivery Tracking Map</p>
                <p style={mapSubtext}>Real-time location tracking coming soon!</p>
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

const headerActions = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const ordersLink = {
  padding: "10px 20px",
  background: "#e2e8f0",
  color: "#4a5568",
  textDecoration: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
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
};

const infoCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  marginBottom: "30px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "32px",
};

const orderIdText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 8px 0",
};

const orderDate = {
  fontSize: "14px",
  color: "#718096",
  margin: 0,
};

const statusBadge = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 20px",
  borderRadius: "12px",
  color: "white",
  fontWeight: "600",
};

const statusIcon = {
  fontSize: "20px",
};

const statusText = {
  fontSize: "16px",
};

const progressContainer = {
  marginTop: "24px",
};

const progressBar = {
  width: "100%",
  height: "8px",
  background: "#e2e8f0",
  borderRadius: "4px",
  overflow: "hidden",
  marginBottom: "16px",
};

const progressFill = {
  height: "100%",
  borderRadius: "4px",
  transition: "width 0.3s",
};

const progressLabels = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  color: "#718096",
};

const progressLabel = {
  fontSize: "12px",
  color: "#718096",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
};

const sectionCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 24px 0",
};

const itemsList = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "24px",
};

const orderItem = {
  display: "flex",
  gap: "16px",
  padding: "20px",
  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
  borderRadius: "12px",
  alignItems: "center",
  border: "2px solid rgba(102, 126, 234, 0.2)",
  marginBottom: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
};

const itemImage = {
  width: "80px",
  height: "80px",
  borderRadius: "8px",
  objectFit: "cover",
  background: "#e2e8f0",
};

const itemDetails = {
  flex: 1,
};

const itemName = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 6px 0",
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

const itemQuantity = {
  fontSize: "14px",
  color: "#2d3748",
  margin: 0,
  fontWeight: "600",
};

const itemPrice = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#28a745",
  background: "rgba(40, 167, 69, 0.1)",
  padding: "8px 16px",
  borderRadius: "8px",
};

const orderTotal = {
  paddingTop: "24px",
  borderTop: "2px solid #e2e8f0",
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  fontSize: "14px",
  color: "#4a5568",
};

const finalTotalRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 0 0 0",
  fontSize: "18px",
  fontWeight: "700",
  color: "#1a202c",
  borderTop: "2px solid #e2e8f0",
  marginTop: "8px",
};

const finalTotalAmount = {
  color: "#667eea",
  fontSize: "20px",
};

const infoSection = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const infoLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#4a5568",
  margin: 0,
};

const infoValue = {
  fontSize: "16px",
  color: "#1a202c",
  margin: "0 0 8px 0",
};

const mapContainer = {
  marginTop: "24px",
  height: "250px",
  borderRadius: "12px",
  overflow: "hidden",
  background: "#f7fafc",
  border: "2px dashed #e2e8f0",
};

const mapPlaceholder = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#718096",
};

const mapIcon = {
  fontSize: "48px",
  marginBottom: "12px",
};

const mapText = {
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 4px 0",
};

const mapSubtext = {
  fontSize: "12px",
  margin: 0,
};

const errorCard = {
  maxWidth: "600px",
  margin: "100px auto",
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "60px 40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const errorIcon = {
  fontSize: "80px",
  marginBottom: "20px",
};

const errorTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 12px 0",
};

const errorText = {
  fontSize: "16px",
  color: "#718096",
  margin: "0 0 30px 0",
};

const backHomeButton = {
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

const loadingCard = {
  maxWidth: "600px",
  margin: "100px auto",
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "60px 40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  fontSize: "18px",
  color: "#4a5568",
};

