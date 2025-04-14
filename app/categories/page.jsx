"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { categorizedProducts } from "../data/productCategories"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1080b0] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Browse Our Categories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-lg"
            >
              Explore our wide range of furniture collections for every room in your home
            </motion.p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categorizedProducts.map((section, index) => {
                const { category, products } = section

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <Link href={`/shop?category=${encodeURIComponent(category)}`} className="block relative">
                      <div className="relative h-64 w-full">
                        <Image
                          src={products[0]?.image || "/placeholder.svg"}
                          alt={category}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-[#1080b0] text-white text-sm px-3 py-1 rounded-full">
                        {products.length} items
                      </div>
                    </Link>

                    <div className="p-6">
                      <Link href={`/shop?category=${encodeURIComponent(category)}`}>
                        <h2 className="text-2xl font-bold text-[#1080b0] mb-2 hover:underline">{category}</h2>
                      </Link>
                      <p className="text-gray-600 mb-4">
                        Discover premium {category.toLowerCase()} to elevate your space.
                      </p>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Popular in this category:</h3>
                        <div className="flex flex-wrap gap-2">
                          {products.slice(0, 3).map((item) => (
                            <Link
                              key={item.id}
                              href={`/shop?category=${encodeURIComponent(category)}&product=${item.id}`}
                              className="bg-[#f8f9fa] hover:bg-[#bae1e6] text-gray-700 text-sm px-3 py-1 rounded-full transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/shop?category=${encodeURIComponent(category)}`}
                        className="mt-6 inline-block text-[#1080b0] font-medium hover:underline"
                      >
                        Browse {category} →
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1080b0] mb-4"
            >
              Can't Find What You're Looking For?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Our collection is constantly growing. If you don't see what you need, contact us and we'll help you find
              the perfect piece for your home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-8 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
