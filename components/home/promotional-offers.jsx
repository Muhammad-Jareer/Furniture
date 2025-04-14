"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function PromotionalOffers() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-8">Special Offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative rounded-lg overflow-hidden h-64 md:h-80"
        >
          <Image src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Summer Sale" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1080b0]/80 to-transparent flex flex-col justify-center p-8">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Summer Sale</h3>
            <p className="text-white mb-4 max-w-xs">Up to 40% off on selected outdoor furniture. Limited time offer.</p>
            <Link
              href="/shop?sale=summer"
              className="bg-white text-[#1080b0] px-6 py-2 rounded-md font-medium hover:bg-[#e3e1e1] transition-colors inline-block w-fit"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative rounded-lg overflow-hidden h-64 md:h-80"
        >
          <Image src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="New Arrivals" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#3e4d2b]/80 to-transparent flex flex-col justify-center items-end text-right p-8">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">New Arrivals</h3>
            <p className="text-white mb-4 max-w-xs">Discover our latest collection of handcrafted bedroom furniture.</p>
            <Link
              href="/shop?category=bedroom&sort=newest"
              className="bg-white text-[#3e4d2b] px-6 py-2 rounded-md font-medium hover:bg-[#e3e1e1] transition-colors inline-block w-fit"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

