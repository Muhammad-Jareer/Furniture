"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"
import toast from "react-hot-toast"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Modern Wooden Sofa",
      image: "/placeholder.svg?height=120&width=120",
      price: 1299.99,
      category: "Living Room",
      inStock: true,
      dateAdded: "2023-10-15",
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      image: "/placeholder.svg?height=120&width=120",
      price: 349.99,
      category: "Office",
      inStock: true,
      dateAdded: "2023-10-10",
    },
    {
      id: 8,
      name: "Luxury King Size Bed",
      image: "/placeholder.svg?height=120&width=120",
      price: 1499.99,
      category: "Bedroom",
      inStock: false,
      dateAdded: "2023-09-28",
    },
    {
      id: 12,
      name: "Minimalist Desk Lamp",
      image: "/placeholder.svg?height=120&width=120",
      price: 89.99,
      category: "Lighting",
      inStock: true,
      dateAdded: "2023-09-15",
    },
  ])

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))

    toast.success("The item has been removed from your wishlist")
  }

  const handleAddToCart = (item) => {
    toast.success(`${item.name} has been added to your cart`)
  }

  const handleClearWishlist = () => {
    setWishlistItems([])

    toast.success("All items have been removed from your wishlist")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar activePage="wishlist" />

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#1080b0] mb-4 sm:mb-0">My Wishlist</h1>

                  {wishlistItems.length > 0 && (
                    <button
                      onClick={handleClearWishlist}
                      className="text-gray-600 hover:text-red-500 text-sm font-medium"
                    >
                      Clear Wishlist
                    </button>
                  )}
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bae1e6] mb-4">
                      <Heart size={24} className="text-[#1080b0]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Your Wishlist is Empty</h3>
                    <p className="text-gray-500 mb-6">
                      Browse our collections and add items you love to your wishlist.
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
                        {wishlistItems.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
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
                                  <p className="text-sm text-gray-500">{item.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-medium">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-4">
                              {item.inStock ? (
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
                              {new Date(item.dateAdded).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  disabled={!item.inStock}
                                  className={`p-2 rounded-full ${
                                    item.inStock
                                      ? "bg-[#1080b0] text-white hover:bg-[#0c6a8e]"
                                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  }`}
                                  title={item.inStock ? "Add to cart" : "Out of stock"}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

