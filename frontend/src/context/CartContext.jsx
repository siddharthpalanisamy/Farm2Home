import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [walletPoints, setWalletPoints] = useState(0);

  // Load cart and wallet from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    const savedPoints = localStorage.getItem("walletPoints");
    if (savedPoints) {
      setWalletPoints(parseInt(savedPoints) || 0);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wallet points to localStorage
  useEffect(() => {
    localStorage.setItem("walletPoints", walletPoints.toString());
  }, [walletPoints]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const addWalletPoints = (points) => {
    setWalletPoints((prev) => prev + points);
  };

  const calculatePointsEarned = () => {
    // Earn 1 point for every ₹10 spent
    return Math.floor(getCartTotal() / 10);
  };

  const calculateCarbonFootprint = () => {
    // Calculate based on:
    // - Product types (vegetables have lower footprint than fruits)
    // - Distance (default 10km)
    // - Packaging (average)
    let footprint = 0;
    cartItems.forEach((item) => {
      const baseFootprint = item.category === "vegetable" ? 0.5 : item.category === "fruit" ? 0.7 : 0.6;
      footprint += baseFootprint * item.quantity;
    });
    // Add shipping footprint (average 0.3kg CO2 per km)
    footprint += 10 * 0.3; // 10km distance
    return footprint.toFixed(2);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    walletPoints,
    addWalletPoints,
    calculatePointsEarned,
    calculateCarbonFootprint,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

