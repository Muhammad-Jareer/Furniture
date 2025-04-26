// cartUtils.js

import { supabase } from "./client"; 

const CART_KEY = "cart_items";

// ==========================
// LOCAL STORAGE METHODS
// ==========================

const getLocalCartItems = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

const setLocalCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};

// ==========================
// SUPABASE METHODS
// ==========================

const getSupabaseCartItems = async (user_id) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select("*")
    .eq('user_id', user_id);

  if (error) {
    console.error("Error fetching cart from Supabase:", error.message);
    return [];
  }
  return data;
};

const addSupabaseCartItem = async (product, user_id) => {
  const { data: existing, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user_id)
    .eq('product_id', product.product_id)
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking cart item:", fetchError.message);
    return;
  }

  if (existing) {
    // Update quantity if exists
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + product.quantity })
      .eq('id', existing.id);

    if (updateError) {
      console.error("Error updating cart item:", updateError.message);
    }
  } else {
    // Insert new
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert([{
        user_id,
        product_id: product.product_id,
        quantity: product.quantity,
      }]);

    if (insertError) {
      console.error("Error inserting cart item:", insertError.message);
    }
  }
};

// cartUtils.js (or cart_items.js)

const removeSupabaseCartItem = async (product_id, user_id) => {
  // Debug logging: check incoming parameters
  console.log("[cart_items] removeSupabaseCartItem called with", {
    user_id,
    product_id,
  });

  if (!user_id || !product_id) {
    console.error("[cart_items] Missing user_id or product_id:", {
      user_id,
      product_id,
    });
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user_id)
    .eq("product_id", product_id);

  if (error) {
    console.error("Error removing cart item from Supabase:", error.message);
  } else {
    console.log("[cart_items] Cart item removed successfully for", {
      user_id,
      product_id,
    });
  }
};


const clearSupabaseCart = async (user_id) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user_id);

  if (error) {
    console.error("Error clearing cart from Supabase:", error.message);
  }
};

// ==========================
// CART FUNCTIONS
// ==========================

export const cartItems = async (user) => {
  if (!user || !user.id) {
    console.warn("No valid user provided to cartItems function.");
    return getLocalCartItems();
  }
  return await getSupabaseCartItems(user.id);
};

export const addToCart = async (product, user) => {
  if (user) {
    await addSupabaseCartItem(product, user.id);
  } else {
    const existingCart = getLocalCartItems();
    const existingItem = existingCart.find(item => item.product_id === product.product_id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      existingCart.push(product);
    }

    setLocalCartItems(existingCart);
  }
};

export const removeFromCart = async (product_id, user) => {
  if (user) {
    await removeSupabaseCartItem(product_id, user.id);
  } else {
    const existingCart = getLocalCartItems();
    const updatedCart = existingCart.filter(item => item.product_id !== product_id);
    setLocalCartItems(updatedCart);
  }
};

export const clearCart = async (user) => {
  if (user) {
    await clearSupabaseCart(user.id);
  } else {
    clearLocalCart();
  }
};

export const syncCartListWithSupabase = async (user) => {
  if (!user) return;

  const localCart = getLocalCartItems();

  for (const product of localCart) {
    await addSupabaseCartItem(product, user.id);
  }

  clearLocalCart();
};
