"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Plus, Trash2, Check, X } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"
import toast from "react-hot-toast"

export default function PaymentMethodsPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit",
      cardNumber: "4111 •••• •••• 1234",
      cardHolder: "John Doe",
      expiryDate: "09/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "credit",
      cardNumber: "5555 •••• •••• 5678",
      cardHolder: "John Doe",
      expiryDate: "12/24",
      isDefault: false,
    },
  ])

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Format card number for display
    const lastFour = formData.cardNumber.slice(-4)
    const formattedCardNumber = `${formData.cardNumber.slice(0, 4)} •••• •••• ${lastFour}`

    const newPaymentMethod = {
      id: Date.now(),
      type: "credit",
      cardNumber: formattedCardNumber,
      cardHolder: formData.cardHolder,
      expiryDate: formData.expiryDate,
      isDefault: formData.isDefault,
    }

    // If new card is default, update other cards
    let updatedMethods = [...paymentMethods]
    if (formData.isDefault) {
      updatedMethods = updatedMethods.map((method) => ({
        ...method,
        isDefault: false,
      }))
    }

    setPaymentMethods([...updatedMethods, newPaymentMethod])
    setShowAddForm(false)
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })

    toast.success("Your new payment method has been added successfully") 
  }

  const handleSetDefault = (id) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedMethods)

    toast.success("Your default payment method has been updated")
  }

  const handleDelete = (id) => {
    const methodToDelete = paymentMethods.find((method) => method.id === id)

    // If deleting default method and there are other methods, make another one default
    if (methodToDelete.isDefault && paymentMethods.length > 1) {
      const otherMethods = paymentMethods.filter((method) => method.id !== id)
      otherMethods[0].isDefault = true
    }

    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))

    toast.success("The payment method has been removed from your account")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar activePage="payment" />

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#1080b0]">Payment Methods</h1>

                  {!showAddForm && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center bg-[#1080b0] text-white px-4 py-2 rounded-md hover:bg-[#0c6a8e] transition-colors"
                    >
                      <Plus size={16} className="mr-2" />
                      Add New Card
                    </motion.button>
                  )}
                </div>

                {showAddForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#f8f9fa] p-6 rounded-lg mb-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Add New Payment Method</h2>
                      <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>

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
                            placeholder="123"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-[#1080b0] focus:ring-[#1080b0]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Set as default payment method</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#1080b0] hover:bg-[#0c6a8e] text-white rounded-md"
                        >
                          Add Payment Method
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {paymentMethods.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bae1e6] mb-4">
                      <CreditCard size={24} className="text-[#1080b0]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Payment Methods</h3>
                    <p className="text-gray-500 mb-6">You haven't added any payment methods to your account yet.</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      Add Payment Method
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 ${method.isDefault ? "border-[#1080b0] bg-[#f0f7fa]" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="bg-[#bae1e6] p-2 rounded-md mr-4">
                              <CreditCard className="text-[#1080b0]" size={24} />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-semibold">{method.cardNumber}</h3>
                                {method.isDefault && (
                                  <span className="ml-2 bg-[#1080b0] text-white text-xs px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.cardHolder}</p>
                              <p className="text-sm text-gray-600">Expires: {method.expiryDate}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {!method.isDefault && (
                              <button
                                onClick={() => handleSetDefault(method.id)}
                                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#bae1e6] hover:text-[#1080b0]"
                                title="Set as default"
                              >
                                <Check size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(method.id)}
                              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t">
                  <h2 className="text-lg font-semibold mb-4">Payment Security</h2>
                  <div className="bg-[#f8f9fa] p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Your payment information is secure.</strong> We use industry-standard encryption to
                      protect your sensitive data.
                    </p>
                    <p className="text-sm text-gray-600">
                      We never store your complete card details on our servers. Your card information is securely
                      processed by our payment provider.
                    </p>
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

