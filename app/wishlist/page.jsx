"use client"; 

import { useState, useEffect } from "react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { supabase } from "@/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  // Fetch full product details whenever wishlistItems change
  useEffect(() => {
    async function loadProducts() {
      if (wishlistItems.length === 0) {
        setProducts([]);
        return;
      }
      const ids = wishlistItems.map((w) => w.id);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image, in_stock, category, created_at")
        .in("id", ids);

      if (!error) {
        setProducts(data);
      } else {
        console.error("Error loading wishlist products:", error);
      }
    }
    loadProducts();
  }, [wishlistItems]);

  const handleRemoveItem = (id) => {
    removeFromWishlist(id);
    toast.success("Item removed from your wishlist");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("All items removed from your wishlist");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#1080b0]">
                My Wishlist
              </h1>
              {products.length > 0 && (
                <button
                  onClick={handleClearWishlist}
                  className="text-gray-600 hover:text-red-500 text-sm font-medium"
                >
                  Clear Wishlist
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bae1e6] mb-4">
                  <Heart size={24} className="text-[#1080b0]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Browse our collections and add items you love to your
                  wishlist.
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Added On</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/product/${item.id}`}
                                className="font-medium hover:text-[#1080b0] hover:underline"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          {item.in_stock ? (
                            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={!item.in_stock}
                              className={`p-2 rounded-full ${
                                item.in_stock
                                  ? "bg-[#1080b0] text-white hover:bg-[#0c6a8e]"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                              title={
                                item.in_stock ? "Add to cart" : "Out of stock"
                              }
                            >
                              <ShoppingCart size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
