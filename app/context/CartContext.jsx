"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  cartItems as fetchCartItems,
  addToCart as addCartItem,
  removeFromCart as deleteCartItem,
  clearCart as clearCartItems,
  syncCartListWithSupabase,
} from "@/supabase/cart_items";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          const supabaseCart = await fetchCartItems(user);
          if (supabaseCart.length > 0) {
            setCartItems(
              supabaseCart.map((item) => ({
                id: item.product_id,
                quantity: item.quantity,
              }))
            );
          } else {
            const stored = localStorage.getItem("cart");
            const localCart = stored ? JSON.parse(stored) : [];
            if (localCart.length > 0) {
              await syncCartListWithSupabase(user.id, localCart);
              setCartItems(localCart);
              localStorage.removeItem("cart");
            }
          }
        } else {
          const stored = localStorage.getItem("cart");
          const localCart = stored ? JSON.parse(stored) : [];
          setCartItems(localCart);
        }
      } catch (err) {
        setError("Failed to load cart items.");
        console.error("Error loading cart:", err);
      }
    };

    loadCart();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    try {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { id: product.id, quantity }];
      });
  
      if (user) {
        // ✅ Pass correctly structured data
        await addCartItem({ product_id: product.id, quantity }, user);
      }
    } catch (err) {
      setError("Failed to add item to cart.");
      console.error("Error adding to cart:", err);
    }
  };
  
  // CartContext.jsx

const removeFromCart = async (productId) => {
  try {
    console.log("[CartContext] Removing item from cart:", productId);
    console.log("[CartContext] User ID in removeFromCart:", user?.id);

    // Remove from local state
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

    if (user?.id) {
      console.log(
        "[CartContext] Deleting cart item from Supabase for",
        { user_id: user.id, product_id: productId }
      );
      await deleteCartItem(productId, user);
    } else {
      console.warn("[CartContext] User ID is not valid. Skipping Supabase delete.");
    }
  } catch (err) {
    setError("Failed to remove item from cart.");
    console.error("Error removing from cart:", err);
  }
};

  
  

  const clearCart = async () => {
    try {
      setCartItems([]);

      if (user) {
        await clearCartItems(user.id);
      } else {
        localStorage.removeItem("cart");
      }
    } catch (err) {
      setError("Failed to clear cart.");
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
