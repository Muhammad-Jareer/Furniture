import { supabase } from './client';

const CART_KEY = "cart_items";

// Fetch all cart items for a user
export const fetchCartItems = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('id, product_id, quantity, inserted_at, updated_at')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

// Add a new item to the cart
export const addCartItem = async ({ user_id, product_id, quantity }) => {
  const { data, error } = await supabase
    .from('cart_items')
    .insert([{ user_id, product_id, quantity }])
    .single();

  if (error) throw error;
  return data;
};

// Update quantity of an existing cart item
export const updateCartItem = async (itemId, quantity) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .single();

  if (error) throw error;
  return data;
};

// Remove an item from the cart by its id
export const deleteCartItem = async (itemId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .single();

  if (error) throw error;
  return data;
};

// Check if a specific product is already in the cart
export const isItemInCart = async (userId, productId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Clear all cart items for a user
export const clearCartItems = async (userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
};

export const syncCartWithSupabase = async (userId) => {
  if (!userId) {
    return;
  }

  const raw = localStorage.getItem(CART_KEY);
  const local = JSON.parse(raw || "[]");

  if (!Array.isArray(local) || local.length === 0) {
    return;
  }

  try {
    for (const { id: productId, quantity } of local) {
      const serverItem = await isItemInCart(userId, productId);

      if (serverItem) {
        await updateCartItem(serverItem.id, serverItem.quantity + quantity);
      } else {
        await addCartItem({ user_id: userId, product_id: productId, quantity });
      }
    }
    localStorage.removeItem(CART_KEY);
  } catch (err) {
    // You may optionally rethrow or handle errors differently
    throw err;
  }
};
