"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

export default function BlogPreview() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Perfect Sofa for Your Living Room",
      excerpt: "Discover the key factors to consider when selecting a sofa that matches your style and needs.",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      date: "June 15, 2023",
      author: "Interior Design Team",
    },
    {
      id: 2,
      title: "5 Tips for Maintaining Wooden Furniture",
      excerpt:
        "Learn how to keep your wooden furniture looking beautiful for years to come with these simple care tips.",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      date: "May 28, 2023",
      author: "Furniture Care Experts",
    },
    {
      id: 3,
      title: "Trending Furniture Styles for 2023",
      excerpt: "Stay ahead of the curve with our guide to this year's most popular furniture trends and designs.",
      image: "https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
      date: "April 10, 2023",
      author: "Style & Trends Team",
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#1080b0]">From Our Blog</h2>
        <Link href="/blog" className="text-[#1080b0] hover:underline font-medium">
          View All Posts
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={item}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.id}`} className="block relative">
              <div className="relative h-48 w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </Link>

            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>{post.date}</span>
              </div>

              <Link href={`/blog/${post.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-[#1080b0] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <Link
                href={`/blog/${post.id}`}
                className="text-[#1080b0] hover:underline font-medium inline-flex items-center"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

