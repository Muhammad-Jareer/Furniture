"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "react-hot-toast"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] bg-[#1080b0]">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <Image src="/placeholder.svg?height=600&width=1200" alt="About Kumhar" fill className="object-cover" />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              About Kumhar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white max-w-2xl"
            >
              Connecting artisans and customers through beautifully crafted furniture
            </motion.p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold text-[#1080b0] mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, Kumhar began with a simple mission: to connect skilled artisans with customers who
                  appreciate handcrafted furniture. Our founder, Aanya Sharma, noticed a gap in the market for
                  high-quality, sustainably produced furniture that tells a story.
                </p>
                <p className="text-gray-700 mb-4">
                  The name "Kumhar" comes from the Hindi word for "potter" or "craftsman," reflecting our dedication to
                  traditional craftsmanship and artisanal skills. We believe that furniture should be more than just
                  functional—it should be a work of art that brings beauty and meaning to your home.
                </p>
                <p className="text-gray-700">
                  Today, Kumhar works with over 100 artisans across the country, helping them showcase their talents and
                  connect with customers who value their craftsmanship. Each piece in our collection has a story, from
                  the hands that crafted it to the sustainable materials used.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Our workshop" fill className="object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1080b0] mb-12 text-center"
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-[#bae1e6] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#1080b0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Artisan Support</h3>
                <p className="text-gray-700">
                  We believe in fair compensation and sustainable business practices that support our artisan partners
                  and their communities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-[#bae1e6] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#1080b0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-700">
                  We're committed to environmentally responsible practices, from sourcing sustainable materials to
                  reducing waste in our operations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-[#bae1e6] rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#1080b0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality & Craftsmanship</h3>
                <p className="text-gray-700">
                  We uphold the highest standards of quality and craftsmanship, ensuring that each piece is built to
                  last for generations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#1080b0] mb-4 text-center"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center text-gray-700 max-w-2xl mx-auto mb-12"
            >
              The passionate people behind Kumhar who work tirelessly to connect artisans with customers
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Aanya Sharma", role: "Founder & CEO", image: "/placeholder.svg?height=300&width=300" },
                {
                  name: "Raj Patel",
                  role: "Head of Artisan Relations",
                  image: "/placeholder.svg?height=300&width=300",
                },
                { name: "Priya Mehta", role: "Design Director", image: "/placeholder.svg?height=300&width=300" },
                { name: "Vikram Singh", role: "Operations Manager", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-[#f8f9fa] rounded-lg overflow-hidden text-center"
                >
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#1080b0]">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

