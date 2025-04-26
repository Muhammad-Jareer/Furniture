// supabase/db.js
import { supabase } from "./client";

export async function getProducts() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      // Log with a clear prefix so you can grep it in your logs
      console.error("[getProducts] Supabase error:", error);
      throw error;
    }

    if (!products) {
      // No data and no error is unexpected—defensive check
      console.warn("[getProducts] No products returned, returning empty array");
      return [];
    }

    return products;
  } catch (err) {
    // This will catch both Supabase errors and any unexpected throw above
    console.error("[getProducts] Unexpected error:", err);
    throw err;
  }
}


// New getProductById function
export async function getProductById(id) {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single(); // Fetch only one product

    if (error) {
      console.error("[getProductById] Supabase error:", error);
      throw error;
    }

    if (!product) {
      console.warn(`[getProductById] No product found with id: ${id}`);
      return null;
    }

    return product;
  } catch (err) {
    console.error("[getProductById] Unexpected error:", err);
    throw err;
  }
}
