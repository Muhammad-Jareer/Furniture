"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/shop/product-card"

export default function RelatedProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Simulate fetching related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts(
          [
            {
              id: 2,
              name: "Minimalist Coffee Table",
              image: "/placeholder.svg?height=300&width=300",
              price: 499.99,
              vendor: "Modern Designs",
              category: "Living Room",
              rating: 4.5,
              reviews: 18,
              inStock: true,
            },
            {
              id: 7,
              name: "Modern TV Stand",
              image: "/placeholder.svg?height=300&width=300",
              price: 449.99,
              vendor: "Modern Designs",
              category: "Living Room",
              rating: 4.3,
              reviews: 9,
              inStock: true,
            },
            {
              id: 6,
              name: "Rustic Bookshelf",
              image: "/placeholder.svg?height=300&width=300",
              price: 599.99,
              vendor: "Artisan Creations",
              category: "Living Room",
              rating: 4.4,
              reviews: 12,
              inStock: false,
            },
            {
              id: 9,
              name: "Accent Armchair",
              image: "/placeholder.svg?height=300&width=300",
              price: 749.99,
              vendor: "Luxury Furnishings",
              category: "Living Room",
              rating: 4.6,
              reviews: 21,
              inStock: true,
            },
          ].filter((product) => product.id !== Number.parseInt(currentProductId)),
        )
        setLoading(false)
      }, 800)
    }

    fetchRelatedProducts()
  }, [currentProductId])

  if (products.length === 0 && !loading) {
    return null
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-8">Related Products</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-lg overflow-hidden shadow-md p-4 h-80">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-40 w-full rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
                  <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

