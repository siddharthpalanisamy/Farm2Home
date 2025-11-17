import React, { useState } from "react";

export default function ProductCard({ product, onUpdate, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(product);

  return (
    <div style={{ background: "#222", padding: "15px", marginBottom: "15px" }}>
      {!edit ? (
        <>
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.quantity}</p>

          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </>
      ) : (
        <>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <button
            onClick={() => {
              onUpdate(product.id, form);
              setEdit(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
