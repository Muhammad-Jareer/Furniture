"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Heart } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BreadcrumbWrapper from "@/components/ui/BreadcrumbWrapper";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext"; // ✅ Correct context

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // ✅ Use wishlist context
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Wishlist" },
  ];

  const handleRemoveItem = (id) => {
    removeFromWishlist(id);
    toast.success("Removed from wishlist");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <BreadcrumbWrapper items={breadcrumbItems} />
          <h1 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-6">Your Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#bae1e6] mb-4">
                <Heart size={32} className="text-[#1080b0]" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Start adding products you love!</p>
              <Link
                href="/shop"
                className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-6 py-3 rounded-md font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 relative group transition hover:shadow-md">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-blue-100 transition duration-300"
                    aria-label="Remove from wishlist"
                  >
                    <X size={20} className="text-gray-500 hover:text-[#1080b0] transition-colors duration-300" />
                  </button>
                  <Link href={`/product/${item.id}`}>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="mt-3 flex justify-between">
                      <h3 className="text-md font-semibold text-gray-800 hover:text-[#1080b0] line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">${item.price?.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
