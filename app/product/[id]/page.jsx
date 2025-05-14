"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BreadcrumbWrapper from "@/components/ui/BreadcrumbWrapper"
import ProductReviews from "@/components/product/product-reviews"
import RelatedProducts from "@/components/product/related-products"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { getProducts } from "@/supabase/db"
import { useCart } from "@/app/context/CartContext"
import { useWishlist } from "@/app/context/WishlistContext"

export default function ProductPage({ params }) {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await addToCart({ id: product.id, quantity: 1 })
      toast.success(`${product.name} added to cart`)
    } catch (err) {
      toast.error("Failed to add to cart")
      console.error(err)
    }
  }
  
  const handleAddToWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    } catch (err) {
      toast.error("Failed to add to wishlist")
      console.error(err)
    }
  }

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        toast.error("Failed to load products")
        console.error("ProductPage › fetchProducts error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Find the current product
  const product = products.find((item) => item?.id === id)

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link href="/shop" className="text-[#1080b0] hover:underline">
              Return to shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = [product.image, ...(product.variant_images || [])]

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.category, href: `/shop?category=${product.category}` },
    { label: product.name, href: "" },
  ]

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleShare = () => {
    const productUrl = window.location.href
    navigator.clipboard.writeText(productUrl).catch(() => {
      const tempInput = document.createElement("input")
      tempInput.value = productUrl
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand("copy")
      document.body.removeChild(tempInput)
    })

    toast.success(`${product.name} copied to clipboard`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-[#f8f9fa] py-3 border-b">
          <div className="container mx-auto px-4">
            <BreadcrumbWrapper items={breadcrumbItems} />
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="lg:w-1/2">
                <div className="relative h-[400px] md:h-[500px] w-full mb-4 bg-white rounded-lg overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full relative"
                    >
                      <Image
                        src={images[activeImageIndex] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                        activeImageIndex === index ? "border-[#1080b0]" : "border-transparent"
                      }`}
                      aria-label={`View image ${index + 1}`}
                      aria-current={activeImageIndex === index ? "true" : "false"}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-lg p-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                          className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-[#1080b0]">${product.price.toFixed(2)}</span>
                      {product.discount && (
                        <span className="ml-3 text-lg text-gray-500 line-through">${product.discount.toFixed(2)}</span>
                      )}
                      {product.discount && (
                        <span className="ml-3 bg-[#1080b0] text-white text-sm px-2 py-1 rounded">
                          Save ${(product.discount - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Price includes taxes</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  <div className="mb-6">
                    <p className="font-medium mb-2">
                      Vendor:{" "}
                      <Link
                        href={`/vendor/${product.vendor.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-[#1080b0] hover:underline"
                      >
                        {product.vendor}
                      </Link>
                    </p>
                    <p className="font-medium">
                      Availability:
                      <span className={product.in_stock ? "text-green-600 ml-1" : "text-red-500 ml-1"}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </p>
                  </div>

                  {product.in_stock && (
                    <div className="mb-6">
                      <label htmlFor="quantity" className="block font-medium mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="p-2 border rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value))}
                          min="1"
                          max="10"
                          className="p-2 w-16 text-center border-y outline-none"
                        />
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= 10}
                          className="p-2 border rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={!product.in_stock}
                      className={`flex-1 py-3 px-6 rounded-md font-medium flex items-center justify-center ${
                        product.in_stock
                          ? "bg-[#1080b0] text-white hover:bg-[#0c6a8e]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToWishlist}
                      className="py-3 px-4 rounded-md border border-[#1080b0] text-[#1080b0] hover:bg-[#f0f7fa] flex items-center justify-center"
                    >
                      <Heart size={18} className="mr-2" />
                      Wishlist
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShare}
                      className="py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                    >
                      <Share2 size={18} />
                    </motion.button>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex items-start">
                      <Truck size={20} className="text-[#1080b0] mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-sm text-gray-600">Free standard shipping on orders over $75</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <RotateCcw size={20} className="text-[#1080b0] mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">30-Day Returns</p>
                        <p className="text-sm text-gray-600">Return or exchange within 30 days</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Shield size={20} className="text-[#1080b0] mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">5-Year Warranty</p>
                        <p className="text-sm text-gray-600">Manufacturer warranty on all products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-8 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === "description"
                        ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                        : "text-gray-600 hover:text-[#1080b0]"
                    }`}
                    aria-selected={activeTab === "description" ? "true" : "false"}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === "features"
                        ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                        : "text-gray-600 hover:text-[#1080b0]"
                    }`}
                    aria-selected={activeTab === "features" ? "true" : "false"}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab("specifications")}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === "specifications"
                        ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                        : "text-gray-600 hover:text-[#1080b0]"
                    }`}
                    aria-selected={activeTab === "specifications" ? "true" : "false"}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === "reviews"
                        ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                        : "text-gray-600 hover:text-[#1080b0]"
                    }`}
                    aria-selected={activeTab === "reviews" ? "true" : "false"}
                  >
                    Reviews ({product.reviews})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Product Description</h2>
                    <p className="mb-4">{product.description}</p>
                    <p className="mb-4">
                      Our Modern Wooden Sofa is the perfect centerpiece for any living room. The clean lines and natural
                      wood finish create a timeless aesthetic that complements a variety of interior styles, from
                      mid-century modern to contemporary.
                    </p>
                    <p>
                      Each sofa is handcrafted by skilled artisans who take pride in their work, ensuring exceptional
                      quality and attention to detail. The solid oak frame provides sturdy support, while the
                      high-density foam cushions offer the perfect balance of comfort and durability.
                    </p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Key Features</h2>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#bae1e6] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-[#1080b0] text-xs font-bold">✓</span>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
                    <div className="border rounded-md overflow-hidden">
                      {Object.entries(product.specifications).map(([key, value], index, arr) => (
                        <div
                          key={key}
                          className={`flex flex-col sm:flex-row ${index !== arr.length - 1 ? "border-b" : ""}`}
                        >
                          <div className="sm:w-1/3 bg-gray-50 p-3 font-medium">{key}</div>
                          <div className="sm:w-2/3 p-3">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviews} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </main>
      <Footer />
    </div>
  )
}