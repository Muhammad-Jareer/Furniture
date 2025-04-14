"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { productsData } from "@/app/data/productsData";
import { ShoppingCart, Heart } from "lucide-react"
import toast from "react-hot-toast";


export default function FeaturedProducts() {

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    toast.success(`${product.name} added to cart`)
  }

  const handleAddToWishlist = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    toast.success(`${product.name} added to wishlist`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1080b0]">Featured Products</h2>
        <Link href="/shop" className="text-[#1080b0] hover:underline font-medium">
          View All
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {productsData.slice(0, 6).map((product) => (
          <motion.div
            key={product.id}
            variants={item}
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
                    onClick={(e) => handleAddToWishlist(e, product)}
                    className="p-2 rounded-full bg-[#e3e1e1] hover:bg-[#c5d4d9] transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2 rounded-full bg-[#1080b0] text-white hover:bg-[#0c6a8e] transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

