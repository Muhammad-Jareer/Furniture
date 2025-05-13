"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  isItemInCart,
  clearCartItems,
} from "@/supabase/cart_items";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // 🆕 loading state
  const [error, setError] = useState(null);

  // Load cart on user change

useEffect(() => {
  const loadCart = async () => {
    console.log("[CartContext] ▶️ loadCart start, user=", user);
    setLoading(true);

    try {
      if (user) {
        console.log("[CartContext]  fetching from Supabase…");
        const items = await fetchCartItems(user.id);
        console.log("[CartContext]  got items:", items);
        setCartItems(items.map(i => ({ id: i.product_id, quantity: i.quantity })));
      } else {
        console.log("[CartContext]  loading from localStorage…");
        const stored = localStorage.getItem("cart_items");
        console.log("[CartContext]  raw localStorage:", stored);
        setCartItems(stored ? JSON.parse(stored) : []);
      }
    } catch (err) {
      setError("Failed to load cart items.");
      console.error("[CartContext] 🔥 loadCart error:", err);
    } finally {
      console.log("[CartContext] ✅ loadCart done, setting loading=false");
      setLoading(false);
    }
  };

  loadCart();
}, [user]);


  // Persist to localStorage when logged-out
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Add or update item
  const addToCart = async (product, quantity = 1) => {
    try {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { id: product.id, quantity }];
      });

      if (user) {
        const serverItem = await isItemInCart(user.id, product.id);
        if (serverItem) {
          await updateCartItem(serverItem.id, serverItem.quantity + quantity);
        } else {
          await addCartItem({
            user_id: user.id,
            product_id: product.id,
            quantity,
          });
        }
      }
    } catch (err) {
      setError("Failed to add item to cart.");
      console.error("[CartContext] addToCart error:", err);
    }
  };

  // Remove an item
  const removeFromCart = async (productId) => {
    try {
      setCartItems((prev) => prev.filter((i) => i.id !== productId));

      if (user) {
        const serverItem = await isItemInCart(user.id, productId);
        if (serverItem) {
          await deleteCartItem(serverItem.id);
        }
      }
    } catch (err) {
      setError("Failed to remove item from cart.");
      console.error("[CartContext] removeFromCart error:", err);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setCartItems([]);

      if (user) {
        await clearCartItems(user.id);
      } else {
        localStorage.removeItem("cart_items");
      }
    } catch (err) {
      setError("Failed to clear cart.");
      console.error("[CartContext] clearCart error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading, // 🆕 Expose loading state
        addToCart,
        removeFromCart,
        clearCart,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
