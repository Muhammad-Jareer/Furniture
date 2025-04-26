import { supabase } from './client';

export const fetchWishlistItems = async (userId) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select("id, product_id, inserted_at")
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const addWishlistItem = async (item) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert([item]);

  if (error) throw error;
  return data;
};

export const deleteWishlistItem = async (itemId) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
  return data;
};

export const isItemInWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle();

  if (error) throw error;
  return data;
};