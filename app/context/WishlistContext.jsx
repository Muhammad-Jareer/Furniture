"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
  isItemInWishlist,
} from "@/supabase/wishlist_items";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        const supabaseWishlist = await fetchWishlistItems(user.id);
        if (supabaseWishlist.length > 0) {
          setWishlistItems(supabaseWishlist.map((w) => ({ id: w.product_id })));
        } else {
          const stored = localStorage.getItem("wishlist");
          const localWishlist = stored ? JSON.parse(stored) : [];
          if (localWishlist.length > 0) {
            await syncWishlistWithSupabase(user.id, localWishlist);
            setWishlistItems(localWishlist);
            localStorage.removeItem("wishlist");
          }
        }
      } else {
        const stored = localStorage.getItem("wishlist");
        const localWishlist = stored ? JSON.parse(stored) : [];
        setWishlistItems(localWishlist);
      }
    };

    loadWishlist();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = async (product) => {
    setWishlistItems((prev) => {
      const alreadyIn = prev.some((item) => item.id === product.id);
      return alreadyIn ? prev : [...prev, { id: product.id }];
    });

    if (user) {
      const exists = await isItemInWishlist(user.id, product.id);
      if (!exists) {
        await addWishlistItem({
          user_id: user.id,
          product_id: product.id,
        });
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      const serverItem = await isItemInWishlist(user.id, productId);
      if (serverItem) {
        await deleteWishlistItem(serverItem.id);
      }
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    if (!user) {
      localStorage.removeItem("wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};



export const syncWishlistWithSupabase = async (userId, wishlistItems) => {
  if (!userId || wishlistItems.length === 0) return;

  try {
    for (const item of wishlistItems) {
      const exists = await isItemInWishlist(userId, item.id);
      if (!exists) {
        await addWishlistItem({
          user_id: userId,
          product_id: item.id,
        });
      }
    }
  } catch (error) {
    console.error("Failed to sync wishlist with Supabase:", error);
  }
};

export const useWishlist = () => useContext(WishlistContext);
