"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import PromotionalOffers from "@/components/home/promotional-offers"
import VendorHighlights from "@/components/home/vendor-highlights"
import BlogPreview from "@/components/home/blog-preview"
import CallToAction from "@/components/home/call-to-action"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1080b0]">Welcome to Kumhar</h2>
            <p className="text-center max-w-3xl mx-auto text-gray-700">
              Discover beautifully crafted furniture that transforms your living spaces. At Kumhar, we connect you with
              skilled artisans and premium furniture vendors to bring quality, style, and comfort to your home.
            </p>
          </div>

          <FeaturedProducts />
          <PromotionalOffers />
          <VendorHighlights />
          <BlogPreview />
        </motion.div>

        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

