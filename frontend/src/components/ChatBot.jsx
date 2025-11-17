import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your Farm2Home assistant. How can I help you today? 😊",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { walletPoints, calculatePointsEarned, getCartTotal } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What's in my cart?",
    "How many points do I have?",
    "How to track my order?",
    "Payment methods?",
    "Delivery information",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input.toLowerCase());
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 500);
  };

  const handleQuickReply = (text) => {
    setInput(text);
    handleSend();
  };

  const generateBotResponse = (userInput) => {
    const cartTotal = getCartTotal();
    const pointsEarned = calculatePointsEarned();

    if (userInput.includes("cart") || userInput.includes("items")) {
      return `You have ${cartTotal > 0 ? cartTotal.toFixed(2) : 0} worth of items in your cart! 🛒\n\nYou can view your cart by clicking the cart icon in the header.`;
    }

    if (userInput.includes("point") || userInput.includes("wallet")) {
      return `Your current wallet balance is ${walletPoints} points! 🎁\n\nYou'll earn ${pointsEarned} points from this order. 1 point = ₹10 spent.\n\nPoints can be redeemed for discounts on future orders!`;
    }

    if (userInput.includes("track") || userInput.includes("order")) {
      return "To track your order:\n1. Click on 'Track Order' after placing an order\n2. Enter your order ID\n3. You'll see real-time updates on your order status!\n\nTrack your orders from the Orders page. 📦";
    }

    if (userInput.includes("payment") || userInput.includes("pay")) {
      return "We accept multiple payment methods:\n\n💳 Credit/Debit Cards\n📱 UPI (Google Pay, PhonePe, Paytm)\n💵 Cash on Delivery\n\nAll payments are secure and encrypted! 🔒";
    }

    if (userInput.includes("delivery") || userInput.includes("shipping")) {
      return "Our delivery information:\n\n📅 Standard delivery: 2-3 days\n🚚 Express delivery: 1 day (available)\n📍 Free delivery on orders above ₹500\n💰 Delivery fee: ₹50\n\nWe deliver fresh farm products directly to your door! 🌾";
    }

    if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
      return "Hello! 👋 Welcome to Farm2Home! How can I assist you today?\n\nI can help you with:\n• Cart & Orders\n• Payment Information\n• Delivery Details\n• Wallet Points\n• And much more!";
    }

    if (userInput.includes("help") || userInput.includes("support")) {
      return "I'm here to help! 😊\n\nI can assist you with:\n• Checking your cart\n• Wallet points balance\n• Order tracking\n• Payment methods\n• Delivery information\n• Product inquiries\n\nJust ask me anything!";
    }

    if (userInput.includes("thanks") || userInput.includes("thank")) {
      return "You're welcome! 😊 Happy to help!\n\nIs there anything else I can assist you with?";
    }

    return "I'm still learning, but I can help you with:\n\n• Cart & Orders\n• Wallet Points\n• Payment Methods\n• Delivery Information\n• Order Tracking\n\nTry asking me about these topics! 😊";
  };

  return (
    <>
      {/* Chat Button */}
      <button
        style={chatButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={chatWindow}>
          <div style={chatHeader}>
            <div style={headerInfo}>
              <div style={botAvatar}>🤖</div>
              <div>
                <div style={botName}>Farm2Home Assistant</div>
                <div style={botStatus}>Online • Usually replies instantly</div>
              </div>
            </div>
            <button style={closeButton} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div style={messagesContainer}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...message,
                  ...(msg.sender === "user" ? userMessage : botMessage),
                }}
              >
                <div style={messageContent}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div style={quickRepliesContainer}>
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  style={quickReplyButton}
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div style={inputContainer}>
            <input
              style={inputField}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={sendButton} onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const chatButton = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  fontSize: "28px",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
};

const chatWindow = {
  position: "fixed",
  bottom: "110px",
  right: "30px",
  width: "400px",
  height: "600px",
  maxHeight: "80vh",
  background: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  zIndex: 999,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  overflow: "hidden",
};

const chatHeader = {
  padding: "20px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headerInfo = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const botAvatar = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const botName = {
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "4px",
};

const botStatus = {
  fontSize: "12px",
  opacity: 0.9,
};

const closeButton = {
  background: "rgba(255, 255, 255, 0.2)",
  border: "none",
  color: "white",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
};

const messagesContainer = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  background: "#f7fafc",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const message = {
  maxWidth: "75%",
  padding: "12px 16px",
  borderRadius: "16px",
  fontSize: "14px",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
};

const userMessage = {
  alignSelf: "flex-end",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderBottomRightRadius: "4px",
};

const botMessage = {
  alignSelf: "flex-start",
  background: "white",
  color: "#1a202c",
  border: "1px solid #e2e8f0",
  borderBottomLeftRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
};

const messageContent = {
  fontSize: "14px",
  lineHeight: "1.6",
};

const quickRepliesContainer = {
  padding: "12px 20px",
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  background: "#f7fafc",
  borderTop: "1px solid #e2e8f0",
};

const quickReplyButton = {
  padding: "8px 12px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  fontSize: "12px",
  color: "#4a5568",
  cursor: "pointer",
  transition: "all 0.2s",
  fontWeight: "500",
};

const inputContainer = {
  padding: "16px 20px",
  background: "white",
  borderTop: "1px solid #e2e8f0",
  display: "flex",
  gap: "12px",
};

const inputField = {
  flex: 1,
  padding: "12px 16px",
  border: "2px solid #e2e8f0",
  borderRadius: "24px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const sendButton = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  transition: "transform 0.2s",
};

