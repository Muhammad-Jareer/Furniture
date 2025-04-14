"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowDown, ArrowUp } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock orders data - in a real app, this would come from an API
  const orders = [
    {
      id: "ORD-2023-1001",
      date: "2023-10-15",
      total: 1799.97,
      status: "delivered",
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
          price: 499.98,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-2023-0892",
      date: "2023-09-28",
      total: 899.99,
      status: "shipped",
      items: [
        {
          id: 4,
          name: "Comfortable Bed Frame",
          image: "/placeholder.svg?height=80&width=80",
          price: 899.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-2023-0764",
      date: "2023-08-12",
      total: 349.99,
      status: "delivered",
      items: [
        {
          id: 5,
          name: "Ergonomic Office Chair",
          image: "/placeholder.svg?height=80&width=80",
          price: 349.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-2023-0651",
      date: "2023-07-05",
      total: 1049.98,
      status: "cancelled",
      items: [
        {
          id: 7,
          name: "Modern TV Stand",
          image: "/placeholder.svg?height=80&width=80",
          price: 449.99,
          quantity: 1,
        },
        {
          id: 6,
          name: "Rustic Bookshelf",
          image: "/placeholder.svg?height=80&width=80",
          price: 599.99,
          quantity: 1,
        },
      ],
    },
  ]

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    } else if (sortField === "total") {
      return sortDirection === "asc" ? a.total - b.total : b.total - a.total
    } else if (sortField === "id") {
      return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    }
    return 0
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar activePage="orders" />

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#1080b0] mb-4 sm:mb-0">My Orders</h1>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-auto"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border rounded-md px-3 py-2"
                    >
                      <option value="all">All Orders</option>
                      <option value="delivered">Delivered</option>
                      <option value="shipped">Shipped</option>
                      <option value="processing">Processing</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {sortedOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#bae1e6] mb-4">
                      <Search size={24} className="text-[#1080b0]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your search or filter to find what you're looking for."
                        : "You haven't placed any orders yet."}
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">
                            <button
                              onClick={() => handleSort("id")}
                              className="flex items-center font-medium text-gray-700"
                            >
                              Order ID
                              {sortField === "id" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp size={14} className="ml-1" />
                                ) : (
                                  <ArrowDown size={14} className="ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="text-left py-3 px-4">
                            <button
                              onClick={() => handleSort("date")}
                              className="flex items-center font-medium text-gray-700"
                            >
                              Date
                              {sortField === "date" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp size={14} className="ml-1" />
                                ) : (
                                  <ArrowDown size={14} className="ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">
                            <button
                              onClick={() => handleSort("total")}
                              className="flex items-center font-medium text-gray-700"
                            >
                              Total
                              {sortField === "total" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp size={14} className="ml-1" />
                                ) : (
                                  <ArrowDown size={14} className="ml-1" />
                                ))}
                            </button>
                          </th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <Link
                                href={`/account/orders/${order.id}`}
                                className="font-medium text-[#1080b0] hover:underline"
                              >
                                {order.id}
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              {new Date(order.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium">${order.total.toFixed(2)}</td>
                            <td className="py-4 px-4 text-right">
                              <Link
                                href={`/account/orders/${order.id}`}
                                className="inline-block text-sm font-medium text-[#1080b0] hover:underline"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

