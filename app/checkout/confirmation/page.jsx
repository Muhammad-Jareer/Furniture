"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulate fetching order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setTimeout(() => {
        setOrderDetails({
          id: "ORD-2023-1234",
          date: new Date().toISOString(),
          total: 1849.98,
          shipping: 0,
          tax: 143.99,
          items: [
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
          ],
          shippingAddress: {
            name: "John Doe",
            address: "123 Main Street",
            city: "Anytown",
            state: "CA",
            zipCode: "12345",
            country: "United States",
          },
          paymentMethod: "Credit Card (**** 1234)",
          estimatedDelivery: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        })
        setLoading(false)
      }, 800)
    }

    fetchOrderDetails()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded-md"></div>
              <div className="h-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // helper to compute subtotal
  const subtotal = orderDetails.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Confirmation Banner */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order is now being
                processed.
              </p>
            </div>

            {/* Order Meta */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Order Number
                  </p>
                  <p className="font-semibold">{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold">
                    {new Date(orderDetails.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total</p>
                  <p className="font-semibold">
                    ${orderDetails.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Payment Method
                  </p>
                  <p className="font-semibold">
                    {orderDetails.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Order Details
              </h2>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-2">
                Shipping Address
              </h2>
              <p>{orderDetails.shippingAddress.name}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.state}{" "}
                {orderDetails.shippingAddress.zipCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Estimated Delivery & CTA */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Estimated Delivery
              </h2>
              <p className="mb-4">
                {new Date(
                  orderDetails.estimatedDelivery
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link href="/shop">
                <button className="bg-[#1080b0] text-white px-6 py-2 rounded-md hover:bg-[#0d6a8a] transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
