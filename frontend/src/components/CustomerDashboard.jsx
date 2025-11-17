import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import { useCart } from "../context/CartContext";
import ChatBot from "./ChatBot";
import "../styles/animations.css";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { addToCart, getCartItemCount, walletPoints } = useCart();

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('button-press');
    setTimeout(() => {
      e.currentTarget.classList.remove('button-press');
    }, 200);
  };
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div style={container} className="animated-gradient">
      {/* Header */}
      <header style={header} className="slide-up">
        <div style={headerContent}>
          <div style={titleContainer}>
            <div style={titleIcon} className="crop-animation">🌾</div>
            <h1 style={headerTitle}>Farm2Home Marketplace</h1>
            <div style={titleIcon} className="tractor-animation">🚜</div>
          </div>
          <div style={headerActions}>
            <div style={walletBadge}>
              🎁 {walletPoints} Points
            </div>
            <button 
              style={cartButton} 
              onClick={(e) => {
                handleButtonClick(e);
                setTimeout(() => navigate("/cart"), 200);
              }}
              className="hover-scale"
            >
              🛒 Cart ({getCartItemCount()})
            </button>
            <button 
              style={logoutButton} 
              onClick={(e) => {
                handleButtonClick(e);
                setTimeout(() => navigate("/"), 200);
              }}
              className="hover-scale"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={content}>
        {/* Search and Filter Section */}
        <div style={filterCard}>
          <div style={searchContainer}>
            <input
              type="text"
              placeholder="🔍 Search products..."
              style={searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={categoryContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  ...categoryButton,
                  ...(selectedCategory === cat ? activeCategoryButton : {}),
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={productsGrid}>
          {filteredProducts.length === 0 ? (
            <div style={emptyState}>
              <div style={emptyIcon}>🌾</div>
              <h2 style={emptyTitle}>No products found</h2>
              <p style={emptyText}>Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                style={{...productCard, animationDelay: `${index * 0.1}s`}} 
                className="scale-in"
              >
                <div style={imageContainer}>
                  <img
                    src={product.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={product.name}
                    style={productImage}
                  />
                  <div style={categoryBadge}>{product.category}</div>
                </div>
                <div style={productContent}>
                  <h3 style={productName}>{product.name}</h3>
                  <div style={productDetails}>
                    <div style={priceTag}>₹{product.price}</div>
                    <div style={quantityTag}>Qty: {product.quantity}</div>
                  </div>
                    <button 
                      style={addToCartButton}
                      className="hover-scale"
                      onClick={(e) => {
                        handleButtonClick(e);
                        if (product.quantity > 0) {
                          addToCart(product, 1);
                          // Add success animation
                          e.currentTarget.classList.add('bounce-animation');
                          setTimeout(() => {
                            e.currentTarget.classList.remove('bounce-animation');
                          }, 1000);
                          alert(`${product.name} added to cart!`);
                        } else {
                          e.currentTarget.classList.add('shake-animation');
                          setTimeout(() => {
                            e.currentTarget.classList.remove('shake-animation');
                          }, 500);
                          alert("Product out of stock!");
                        }
                      }}
                    >
                      Add to Cart 🛒
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backgroundSize: "200% 200%",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const header = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  padding: "20px 40px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const headerContent = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const titleIcon = {
  fontSize: "32px",
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
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

const walletBadge = {
  padding: "8px 16px",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  color: "white",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "0 4px 12px rgba(245, 87, 108, 0.3)",
};

const cartButton = {
  padding: "10px 20px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const logoutButton = {
  padding: "10px 20px",
  background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s",
};

const content = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "40px 20px",
};

const filterCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const searchContainer = {
  marginBottom: "20px",
};

const searchInput = {
  width: "100%",
  padding: "16px 20px",
  fontSize: "16px",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  outline: "none",
  transition: "all 0.2s",
  boxSizing: "border-box",
};

const categoryContainer = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const categoryButton = {
  padding: "10px 20px",
  background: "#f7fafc",
  border: "2px solid #e2e8f0",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#4a5568",
  cursor: "pointer",
  transition: "all 0.2s",
};

const activeCategoryButton = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "2px solid transparent",
};

const productsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "30px",
};

const productCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
};

const imageContainer = {
  position: "relative",
  width: "100%",
  height: "220px",
  overflow: "hidden",
  background: "#f7fafc",
};

const productImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s",
};

const categoryBadge = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "rgba(102, 126, 234, 0.9)",
  color: "white",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "capitalize",
};

const productContent = {
  padding: "20px",
};

const productName = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 12px 0",
};

const productDetails = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const priceTag = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#667eea",
};

const quantityTag = {
  fontSize: "14px",
  color: "#718096",
  fontWeight: "500",
};

const addToCartButton = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const emptyState = {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "60px 20px",
  color: "white",
};

const emptyIcon = {
  fontSize: "80px",
  marginBottom: "20px",
};

const emptyTitle = {
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 10px 0",
};

const emptyText = {
  fontSize: "16px",
  opacity: 0.9,
};

