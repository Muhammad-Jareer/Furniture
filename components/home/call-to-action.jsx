"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="bg-[#bae1e6] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1080b0] mb-4"
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-700 mb-8"
          >
            Browse our collection of handcrafted furniture pieces or connect with skilled artisans to create something
            unique for your home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/shop"
              className="bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/vendors"
              className="bg-white hover:bg-[#e3e1e1] text-[#1080b0] px-8 py-3 rounded-md font-medium transition-colors border border-[#1080b0]"
            >
              Meet Our Artisans
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

