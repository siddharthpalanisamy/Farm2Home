import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getProducts,
  updateProductPrice,
  deleteProduct,
} from "../api";
import "../styles/animations.css";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.currentTarget.classList.add('button-press');
    setTimeout(() => {
      e.currentTarget.classList.remove('button-press');
    }, 200);
  };
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleAdd() {
    if (!name || !category || !price || !quantity) {
      alert("Fill all fields!");
      return;
    }

    await addProduct({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      image_url: imageUrl,
      farmer_id: 1,
    });

    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
    loadProducts();
  }

  async function handlePriceChange(id) {
    const newPrice = prompt("Enter new price:");
    if (!newPrice) return;
    await updateProductPrice(id, Number(newPrice));
    loadProducts();
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  }

  return (
    <div style={container} className="animated-gradient">
      {/* Header */}
      <header style={header} className="slide-up">
        <div style={headerContent}>
          <div style={headerLeft}>
            <div style={logo}>🌾</div>
            <div>
              <h1 style={headerTitle}>Farmer Dashboard</h1>
              <p style={headerSubtitle}>Manage your farm products</p>
            </div>
          </div>
          <button style={logoutButton} onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </header>

      <div style={content}>
        {/* Add Product Card */}
        <div style={formCard}>
          <h2 style={cardTitle}>➕ Add New Product</h2>
          <div style={formGrid}>
            <div style={inputGroup}>
              <label style={label}>Product Name</label>
              <input
                style={input}
                placeholder="e.g., Fresh Tomatoes"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={inputGroup}>
              <label style={label}>Category</label>
              <select
                style={input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="grain">Grain</option>
              </select>
            </div>

            <div style={inputGroup}>
              <label style={label}>Price (₹)</label>
              <input
                type="number"
                style={input}
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div style={inputGroup}>
              <label style={label}>Quantity</label>
              <input
                type="number"
                style={input}
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div style={{ ...inputGroup, gridColumn: "1 / -1" }}>
              <label style={label}>Image URL (Optional)</label>
              <input
                style={input}
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>

          <button 
            style={addButton} 
            onClick={(e) => {
              handleButtonClick(e);
              handleAdd();
            }}
            className="hover-scale"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Products Section */}
        <div style={productsSection}>
          <h2 style={sectionTitle}>
            My Products <span style={badge}>{products.length}</span>
          </h2>

          {products.length === 0 ? (
            <div style={emptyState}>
              <div style={emptyIcon}>📦</div>
              <h3 style={emptyTitle}>No products yet</h3>
              <p style={emptyText}>Add your first product to get started!</p>
            </div>
          ) : (
            <div style={productsGrid}>
              {products.map((p) => (
                <div key={p.id} style={productCard}>
                  <div style={imageContainer}>
                    <img
                      src={p.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={p.name}
                      style={productImage}
                    />
                    <div style={categoryTag}>{p.category}</div>
                  </div>

                  <div style={productInfo}>
                    <h3 style={productName}>{p.name}</h3>
                    <div style={productDetails}>
                      <div style={priceTag}>₹{p.price}</div>
                      <div style={quantityTag}>Qty: {p.quantity}</div>
                    </div>

                    <div style={buttonRow}>
                      <button
                        style={updateButton}
                        className="hover-scale"
                        onClick={(e) => {
                          handleButtonClick(e);
                          handlePriceChange(p.id);
                        }}
                      >
                        ✏️ Update Price
                      </button>
                      <button
                        style={deleteButton}
                        className="hover-scale"
                        onClick={(e) => {
                          handleButtonClick(e);
                          handleDelete(p.id);
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== PREMIUM STYLES ===================== */

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

const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const logo = {
  fontSize: "48px",
};

const headerTitle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1a202c",
  margin: 0,
};

const headerSubtitle = {
  fontSize: "14px",
  color: "#718096",
  margin: "4px 0 0 0",
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

const formCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const cardTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 24px 0",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginBottom: "24px",
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

const addButton = {
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
};

const productsSection = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
};

const sectionTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1a202c",
  margin: "0 0 24px 0",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const badge = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
};

const productsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
};

const productCard = {
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  border: "1px solid #e2e8f0",
  animation: "scaleIn 0.5s ease-out",
};

const imageContainer = {
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  background: "#f7fafc",
};

const productImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const categoryTag = {
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

const productInfo = {
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

const buttonRow = {
  display: "flex",
  gap: "12px",
};

const updateButton = {
  flex: 1,
  padding: "12px",
  background: "#ffc107",
  color: "#1a202c",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s",
};

const deleteButton = {
  flex: 1,
  padding: "12px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s",
};

const emptyState = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#718096",
};

const emptyIcon = {
  fontSize: "64px",
  marginBottom: "16px",
};

const emptyTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#2d3748",
  margin: "0 0 8px 0",
};

const emptyText = {
  fontSize: "16px",
  color: "#718096",
  margin: 0,
};
