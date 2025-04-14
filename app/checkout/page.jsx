"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, CreditCard, Check, Lock } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveInfo: true,

    // Payment Information
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    savePayment: false,
  })

  // Simulate fetching cart data
  useEffect(() => {
    const fetchCart = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setCartItems([
          {
            id: 1,
            name: "Modern Wooden Sofa",
            image: "/placeholder.svg?height=80&width=80",
            price: 1299.99,
            quantity: 1,
          },
          {
            id: 2,
            name: "Minimalist Coffee Table",
            image: "/placeholder.svg?height=80&width=80",
            price: 499.99,
            quantity: 1,
          },
        ])
        setLoading(false)
      }, 800)
    }

    fetchCart()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, this would submit the order to an API
    toast.success("Your order has been successfully placed")

    // Redirect to confirmation page (in a real app)
    window.location.href = "/checkout/confirmation"
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
    return calculateSubtotal() + calculateTax() + calculateShipping()
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md w-1/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-32 bg-gray-200 rounded-md"></div>
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
          <div className="flex items-center mb-6">
            <Link href="/" className="text-gray-500 hover:text-[#1080b0]">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <Link href="/cart" className="text-gray-500 hover:text-[#1080b0]">
              Cart
            </Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-700 font-medium">Checkout</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-6">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">Checkout Steps</h2>
                    <div className="text-sm text-gray-500">Step {activeStep} of 3</div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep >= 1 ? "bg-[#1080b0] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {activeStep > 1 ? <Check size={16} /> : "1"}
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${activeStep > 1 ? "bg-[#1080b0]" : "bg-gray-200"}`}></div>

                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep >= 2 ? "bg-[#1080b0] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {activeStep > 2 ? <Check size={16} /> : "2"}
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${activeStep > 2 ? "bg-[#1080b0]" : "bg-gray-200"}`}></div>

                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        activeStep >= 3 ? "bg-[#1080b0] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <div className={activeStep >= 1 ? "text-[#1080b0] font-medium" : "text-gray-500"}>Shipping</div>
                    <div className={activeStep >= 2 ? "text-[#1080b0] font-medium" : "text-gray-500"}>Payment</div>
                    <div className={activeStep >= 3 ? "text-[#1080b0] font-medium" : "text-gray-500"}>Review</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Shipping Information */}
                  {activeStep === 1 && (
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                          Apartment, Suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP/Postal Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="saveInfo"
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Save this information for next time</span>
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2 bg-[#1080b0] text-white rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                        >
                          Continue to Payment
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Information */}
                  {activeStep === 2 && (
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Payment Information</h3>

                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Payment Method</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <Lock size={14} className="mr-1" />
                            Secure Payment
                          </div>
                        </div>

                        <div className="border rounded-md p-4 mb-4 bg-[#f8f9fa]">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="creditCard"
                              checked={true}
                              className="rounded-full border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
                            />
                            <span className="ml-2 font-medium">Credit Card</span>
                            <div className="ml-auto flex items-center space-x-2">
                              <CreditCard size={20} className="text-[#1080b0]" />
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="XXX"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="savePayment"
                            checked={formData.savePayment}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Save this payment method for future purchases
                          </span>
                        </label>
                      </div>

                      <div className="flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                        >
                          Back to Shipping
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2 bg-[#1080b0] text-white rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                        >
                          Review Order
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review Order */}
                  {activeStep === 3 && (
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Review Your Order</h3>

                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Shipping Information</h4>
                        <div className="bg-[#f8f9fa] p-4 rounded-md">
                          <p className="font-medium">
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p>
                            {formData.address}
                            {formData.apartment ? `, ${formData.apartment}` : ""}
                          </p>
                          <p>
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                          <p>{formData.country}</p>
                          <p className="mt-2">{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <div className="bg-[#f8f9fa] p-4 rounded-md flex items-center">
                          <CreditCard size={20} className="text-[#1080b0] mr-3" />
                          <div>
                            <p className="font-medium">Credit Card</p>
                            <p className="text-sm text-gray-600">**** **** **** {formData.cardNumber.slice(-4)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Order Items</h4>
                        <div className="border rounded-md overflow-hidden">
                          {cartItems.map((item) => (
                            <div key={item.id} className="p-4 border-b flex items-center">
                              <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                        >
                          Back to Payment
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="px-6 py-2 bg-[#1080b0] text-white rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                        >
                          Place Order
                        </motion.button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        <div className="absolute top-0 right-0 bg-[#1080b0] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

