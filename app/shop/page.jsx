"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import {Breadcrumb} from "@/components/ui/breadcrumb"
import ProductCard from "@/components/shop/product-card"
import FilterSidebar from "@/components/shop/filter-sidebar"
import { productsData } from "@/app/data/productsData";
import { Toaster } from "react-hot-toast"

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
    vendors: [],
    ratings: null,
  })

  // Breadcrumb items for the shop page
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Shop" }]

  // Simulate fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts(productsData);
        setLoading(false)
      }, 600)
    }

    fetchProducts()
  }, [])

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
      return false
    }

    // Price range filter
    if (product.price < activeFilters.priceRange[0] || product.price > activeFilters.priceRange[1]) {
      return false
    }

    // Vendor filter
    if (activeFilters.vendors.length > 0 && !activeFilters.vendors.includes(product.vendor)) {
      return false
    }

    // Rating filter
    if (activeFilters.ratings && product.rating < activeFilters.ratings) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return b.id - a.id
      case "rating":
        return b.rating - a.rating
      default:
        return 0 // featured - no specific sort
    }
  })

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#f8f9fa] py-3 border-b">
          <div className="container mx-auto px-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="bg-[#bae1e6]/30 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1080b0]">Shop Our Collection</h1>
            <p className="text-gray-600 mt-2">Discover beautifully crafted furniture for every room</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <button
                onClick={toggleFilters}
                className="w-full flex items-center justify-between bg-white p-3 rounded-md shadow-sm border"
                aria-expanded={showFilters}
                aria-controls="mobile-filters"
              >
                <div className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  <span>Filters</span>
                </div>
                <ChevronDown size={18} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              {showFilters && (
                <motion.div
                  id="mobile-filters"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-2"
                >
                  <FilterSidebar
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    className="md:hidden"
                  />
                </motion.div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <FilterSidebar activeFilters={activeFilters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Showing <span className="font-medium">{sortedProducts.length}</span> products
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="flex items-center">
                    <label htmlFor="sort-by" className="text-sm mr-2 text-gray-500">
                      Sort by:
                    </label>
                    <select
                      id="sort-by"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border rounded-md p-2 text-sm w-full sm:w-auto"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>

                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-[#1080b0] text-white" : "bg-white text-gray-600"}`}
                      aria-label="Grid view"
                      aria-pressed={viewMode === "grid"}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-[#1080b0] text-white" : "bg-white text-gray-600"}`}
                      aria-label="List view"
                      aria-pressed={viewMode === "list"}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-80">
                      <div className="animate-pulse">
                        <div className="bg-gray-200 h-40 w-full rounded-md mb-4"></div>
                        <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                        <div className="bg-gray-200 h-4 w-1/2 rounded mb-4"></div>
                        <div className="bg-gray-200 h-8 w-1/3 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <SlidersHorizontal size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
                  <button
                    onClick={() =>
                      setActiveFilters({
                        categories: [],
                        priceRange: [0, 5000],
                        vendors: [],
                        ratings: null,
                      })
                    }
                    className="text-[#1080b0] font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

