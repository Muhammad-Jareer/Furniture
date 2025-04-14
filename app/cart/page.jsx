"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import BreadcrumbWrapper from "@/components/ui/BreadcrumbWrapper"
import toast from "react-hot-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Breadcrumb items for the cart page
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Cart" }]
  

  // Simulate fetching cart data
  useEffect(() => {
    const fetchCart = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setCartItems([
          {
            id: 1,
            name: "Modern Wooden Sofa",
            image: "/placeholder.svg?height=120&width=120",
            price: 1299.99,
            quantity: 1,
            maxQuantity: 5,
          },
          {
            id: 2,
            name: "Minimalist Coffee Table",
            image: "/placeholder.svg?height=120&width=120",
            price: 499.99,
            quantity: 1,
            maxQuantity: 10,
          },
        ])
        setLoading(false)
      }, 800)
    }

    fetchCart()
  }, [])

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast.success("The item has been removed from your cart")
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
      setDiscount(calculateSubtotal() * 0.1)

      toast.success("10% discount has been applied to your order")
    } else {
      toast.success("The promo code you entered is invalid or expired")
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 1000 ? 0 : 50 // Free shipping over $1000
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discount
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-[#1080b0] mb-6">Shopping Cart</h1>
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-40 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <BreadcrumbWrapper items={breadcrumbItems} />
          <h1 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-6">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#bae1e6] mb-4">
                <ShoppingBag size={32} className="text-[#1080b0]" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                href="/shop"
                className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                  </div>

                  <div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 border-b flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-24 flex-shrink-0">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <Link href={`/product/${item.id}`} className="font-semibold text-lg hover:text-[#1080b0]">
                              {item.name}
                            </Link>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="p-1 border rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus size={16} />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    Math.min(item.maxQuantity, Math.max(1, Number.parseInt(e.target.value) || 1)),
                                  )
                                }
                                min="1"
                                max={item.maxQuantity}
                                className="p-1 w-12 text-center border-y outline-none"
                              />
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.id, Math.min(item.maxQuantity, item.quantity + 1))
                                }
                                disabled={item.quantity >= item.maxQuantity}
                                className="p-1 border rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 flex justify-between items-center">
                    <Link href="/shop" className="text-[#1080b0] hover:underline flex items-center">
                      <ArrowRight size={16} className="mr-2 rotate-180" />
                      Continue Shopping
                    </Link>

                    <button onClick={() => setCartItems([])} className="text-gray-600 hover:text-red-500">
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo-code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        placeholder={promoApplied ? "WELCOME10 Applied" : "Enter promo code"}
                        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#1080b0] focus:border-transparent disabled:bg-gray-100"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className="bg-[#1080b0] text-white px-4 py-2 rounded-r-md font-medium hover:bg-[#0c6a8e] disabled:bg-gray-400"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && <p className="text-green-600 text-sm mt-1">10% discount applied!</p>}
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-[#1080b0] text-white py-3 rounded-md font-medium hover:bg-[#0c6a8e] transition-colors text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="bg-[#f8f9fa] rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <Truck size={20} className="text-[#1080b0] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-gray-600">On orders over $1,000</p>
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
                      <p className="font-medium">Secure Checkout</p>
                      <p className="text-sm text-gray-600">Your data is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

