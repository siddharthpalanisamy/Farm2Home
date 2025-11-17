const API_URL = "http://127.0.0.1:8000";

// --- GET ALL PRODUCTS ---
export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// --- ADD PRODUCT ---
export async function addProduct(product) {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`Failed to add product: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// --- UPDATE PRICE ---
export async function updateProductPrice(id, newPrice) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    });
    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// --- DELETE PRODUCT ---
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete product: ${res.statusText}`);
    }
    return res.ok;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}