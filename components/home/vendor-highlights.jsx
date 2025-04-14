"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export default function VendorHighlights() {
  const vendors = [
    {
      id: 1,
      name: "Artisan Creations",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      description: "Specializing in handcrafted wooden furniture with traditional techniques.",
      rating: 4.8,
      reviews: 124,
      featured: "Modern Wooden Sofa",
    },
    {
      id: 2,
      name: "Modern Designs",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      description: "Contemporary furniture with clean lines and innovative materials.",
      rating: 4.7,
      reviews: 98,
      featured: "Minimalist Coffee Table",
    },
    {
      id: 3,
      name: "Luxury Furnishings",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      description: "Premium quality furniture for those who appreciate the finer things.",
      rating: 4.9,
      reviews: 156,
      featured: "Elegant Dining Set",
    },
  ]

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
        <h2 className="text-2xl md:text-3xl font-bold text-[#1080b0]">Featured Artisans</h2>
        <Link href="/vendors" className="text-[#1080b0] hover:underline font-medium">
          View All
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {vendors.map((vendor) => (
          <motion.div
            key={vendor.id}
            variants={item}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-center mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                <Image src={vendor.image || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{vendor.name}</h3>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-1">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-sm">
                    {vendor.rating} ({vendor.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{vendor.description}</p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-1">Featured Product:</p>
              <Link href={`/vendor/${vendor.id}`} className="text-[#1080b0] hover:underline font-medium">
                {vendor.featured}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

