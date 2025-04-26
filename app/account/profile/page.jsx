"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Edit2, Camera } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"
import toast from "react-hot-toast"

export default function ProfilePage() {
  
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "United States",
    },
  })

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    street: userData.address.street,
    city: userData.address.city,
    state: userData.address.state,
    zipCode: userData.address.zipCode,
    country: userData.address.country,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Update user data
    setUserData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    })

    setIsEditing(false)

    toast.success("Your profile information has been updated successfully")
  }

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      street: userData.address.street,
      city: userData.address.city,
      state: userData.address.state,
      zipCode: userData.address.zipCode,
      country: userData.country,
    })

    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar activePage="profile" />

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#1080b0]">My Profile</h1>
                  {!isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-[#1080b0] hover:text-[#0c6a8e]"
                    >
                      <Edit2 size={16} className="mr-1" />
                      Edit Profile
                    </motion.button>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[#bae1e6]">
                          <Image src="/placeholder-user.jpg" alt="Profile" fill className="object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-[#1080b0] text-white p-2 rounded-full hover:bg-[#0c6a8e]">
                          <Camera size={16} />
                        </button>
                      </div>
                      <h2 className="text-xl font-semibold">{userData.name}</h2>
                      <p className="text-gray-500">{userData.email}</p>
                    </div>

                    <div className="mt-8 space-y-4">
                      <div className="p-4 bg-[#f8f9fa] rounded-md">
                        <h3 className="font-medium mb-2">Account Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Orders</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Wishlist Items</span>
                            <span className="font-medium">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reviews</span>
                            <span className="font-medium">5</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-[#f8f9fa] rounded-md">
                        <h3 className="font-medium mb-2">Member Since</h3>
                        <p>January 15, 2023</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
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
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-3 border-b pb-2">Address Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="md:col-span-2">
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              id="street"
                              name="street"
                              value={formData.street}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP/Postal Code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>

                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#1080b0] hover:bg-[#0c6a8e] text-white rounded-md"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <h3 className="font-semibold text-lg mb-3 border-b pb-2">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{userData.name}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{userData.email}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{userData.phone}</p>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-3 border-b pb-2">Address Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Street Address</p>
                            <p className="font-medium">{userData.address.street}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">City</p>
                            <p className="font-medium">{userData.address.city}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">State/Province</p>
                            <p className="font-medium">{userData.address.state}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">ZIP/Postal Code</p>
                            <p className="font-medium">{userData.address.zipCode}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Country</p>
                            <p className="font-medium">{userData.address.country}</p>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                          <Link href="/account/change-password" className="text-[#1080b0] hover:underline">
                            Change Password
                          </Link>
                        </div>
                      </div>
                    )}
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

