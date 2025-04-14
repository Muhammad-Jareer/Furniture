"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast"

export default function ProductCard({ product, viewMode = "grid" }) {
  
  const { addToCart } = useCart() 

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)

    toast.success(`${product.name} added to cart`)
  }
  
  const handleAddToWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    toast.success(`${product.name} added to wishlist`)

  }

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col md:flex-row">
          <Link href={`/product/${product.id}`} className="block relative md:w-1/3">
            <div className="relative h-64 md:h-full w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="absolute top-2 right-2 bg-[#1080b0] text-white text-xs px-2 py-1 rounded">
              {product.category}
            </div>
          </Link>

          <div className="p-4 md:p-6 flex flex-col md:w-2/3">
            <div className="mb-auto">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>

              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-xl mb-2 hover:text-[#1080b0] transition-colors">{product.name}</h3>
              </Link>

              <p className="text-sm text-gray-600 mb-4">By {product.vendor}</p>

              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                {!product.inStock && <span className="ml-2 text-red-500 text-sm">Out of Stock</span>}
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToWishlist}
                  className="p-2 rounded-full bg-[#e3e1e1] hover:bg-[#c5d4d9] transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`px-4 py-2 rounded-md ${
                    product.inStock
                      ? "bg-[#1080b0] text-white hover:bg-[#0c6a8e]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition-colors flex items-center`}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 w-full">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="absolute top-2 right-2 bg-[#1080b0] text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-[#1080b0] transition-colors">{product.name}</h3>
        </Link>

        <p className="text-sm text-gray-600 mb-2">By {product.vendor}</p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWishlist}
              className="p-2 rounded-full bg-[#e3e1e1] hover:bg-[#c5d4d9] transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-2 rounded-full ${
                product.inStock
                  ? "bg-[#1080b0] text-white hover:bg-[#0c6a8e]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </motion.button>
          </div>
        </div>

        {!product.inStock && <p className="text-red-500 text-sm mt-2">Out of Stock</p>}
      </div>
    </motion.div>
  )
}

