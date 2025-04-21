"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react"
import { useNavigation } from "@/hooks/use-navigation"
import toast from "react-hot-toast"
import { productsData } from "@/app/data/productsData"
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Header() {
  const { cartItems } = useCart()
  const { wishlistItems } = useWishlist()
  const { currentPath, isActive, navigate } = useNavigation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const desktopSearchRef = useRef(null)
  const mobileSearchRef = useRef(null)

  // Highlight matching substring
  const highlightMatch = (text) => {
    if (!searchQuery) return text
    const regex = new RegExp(`(${searchQuery})`, "gi")
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase()
        ? <span key={i} className="text-[#1080b0]">{part}</span>
        : part
    )
  }

  // Trim down to only id/name/category
  const trimmedProducts = productsData.map(({ id, name, category }) => ({
    id, name, category
  }))

  // Filter results
  const searchResults = trimmedProducts.filter(item =>
    searchQuery &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Sticky shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on nav
  useEffect(() => setMobileMenuOpen(false), [currentPath])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (
        !desktopSearchRef.current?.contains(e.target) &&
        !mobileSearchRef.current?.contains(e.target)
      ) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    toast.success(`Showing results for "${searchQuery}"`)
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
    setShowSearchResults(false)
  }

  const navLinks = [
    { name: "Home",       href: "/" },
    { name: "Shop",       href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About",      href: "/about" },
    { name: "Contact",    href: "/contact" },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
      isScrolled ? "shadow-md" : ""
    } bg-white`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-[#1080b0]">
              Kumhar
            </motion.div>
          </Link>

          {/* DESKTOP NAV & SEARCH at ≥lg */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Nav links */}
            <nav className="flex items-center space-x-6">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => navigate(link.href)}
                  className={`transition-colors ${
                    isActive(link.href)
                      ? "text-[#1080b0] font-medium"
                      : "text-gray-700 hover:text-[#1080b0]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search bar */}
            <div className="relative" ref={desktopSearchRef}>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value)
                    setShowSearchResults(e.target.value.length > 0)
                  }}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                  className="w-40 lg:w-64 p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1080b0]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                <button type="submit" className="sr-only">Search</button>
              </form>

              {/* Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                  <div className="flex items-center px-3 py-2 border-b">
                    <Search size={16} className="text-gray-400 mr-2"/>
                    <span className="text-gray-700">Results for “{searchQuery}”</span>
                  </div>
                  <ul>
                    {searchResults.map(result => (
                      <motion.li
                        key={result.id}
                        className="border-b last:border-b-0"
                        whileTap={{ scale: 0.97 }}
                      >
                        <Link
                          href={`/product/${result.id}`}
                          onClick={() => {
                            navigate(`/product/${result.id}`)
                            setShowSearchResults(false)
                          }}
                          className="block p-3 transition-colors duration-200 hover:bg-[#1080b0] hover:text-white active:bg-[#0e5c83]"
                        >
                          <div className="font-medium">{highlightMatch(result.name)}</div>
                          <div className="text-sm text-gray-500">{highlightMatch(result.category)}</div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS & HAMBURGER */}
          <div className="flex items-center space-x-4">
            <Link
              href="/account/profile"
              onClick={() => navigate("/account/profile")}
              className={`text-gray-700 hover:text-[#1080b0] ${
                currentPath.startsWith("/account") ? "text-[#1080b0]" : ""
              }`}
            >
              <User size={20}/>
            </Link>
            
            <Link
              href="/cart"
              className={`relative text-gray-700 hover:text-[#1080b0] ${
                currentPath === "/cart" || currentPath.startsWith("/checkout")
                  ? "text-[#1080b0]" : ""
              }`}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#1080b0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </Link>


            <Link
              href="/wishlist"
              className={`relative text-gray-700 hover:text-[#1080b0] ${
                currentPath === "/wishlist" || currentPath.startsWith("/checkout")
                  ? "text-[#1080b0]" : ""
              }`}
            >
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#1080b0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            </Link>
            {/* show hamburger until lg */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU & SEARCH (<lg) */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:hidden bg-white border-t overflow-hidden ${mobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Mobile Search */}
          <div className="relative mb-4" ref={mobileSearchRef}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(e.target.value.length > 0)
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="w-full p-2 pl-10 border rounded-md"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1080b0]">
                Go
              </button>
            </form>
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                <div className="flex items-center px-3 py-2 border-b">
                  <Search size={16} className="text-gray-400 mr-2"/>
                  <span className="text-gray-700">Results for “{searchQuery}”</span>
                </div>
                <ul>
                  {searchResults.map(result => (
                    <motion.li
                      key={result.id}
                      className="border-b last:border-b-0"
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={`/product/${result.id}`}
                        onClick={() => {
                          navigate(`/product/${result.id}`)
                          setShowSearchResults(false)
                        }}
                        className="block p-3 transition-colors duration-200 hover:bg-[#1080b0] hover:text-white active:bg-[#0e5c83]"
                      >
                        <div className="font-medium">{highlightMatch(result.name)}</div>
                        <div className="text-sm text-gray-500">{highlightMatch(result.category)}</div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  navigate(link.href)
                  setMobileMenuOpen(false)
                }}
                className={`py-2 transition-colors ${
                  isActive(link.href)
                    ? "text-[#1080b0] font-medium"
                    : "text-gray-700 hover:text-[#1080b0]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
