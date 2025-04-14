"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Lock, Shield, Eye, EyeOff } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"
import toast from "react-hot-toast"

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    blogPosts: false,
    accountAlerts: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareOrderHistory: false,
    allowRecommendations: true,
    storePaymentInfo: true,
    allowCookies: true,
  })

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target
    setPrivacySettings({
      ...privacySettings,
      [name]: checked,
    })
  }

  const handleSaveNotifications = () => {
    toast.success("Your notification preferences have been updated") 
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.success("New passwords do not match")
      return
    }

    // In a real app, this would call an API to change the password
    toast.success("Your password has been updated successfully")

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSavePrivacy = () => {
    toast.success("Your privacy preferences have been updated")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar activePage="settings" />

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-[#1080b0] mb-6">Account Settings</h1>

                <div className="border-b mb-6">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                        activeTab === "notifications"
                          ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                          : "text-gray-600 hover:text-[#1080b0]"
                      }`}
                    >
                      Notifications
                    </button>
                    <button
                      onClick={() => setActiveTab("password")}
                      className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                        activeTab === "password"
                          ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                          : "text-gray-600 hover:text-[#1080b0]"
                      }`}
                    >
                      Password
                    </button>
                    <button
                      onClick={() => setActiveTab("privacy")}
                      className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                        activeTab === "privacy"
                          ? "text-[#1080b0] border-b-2 border-[#1080b0]"
                          : "text-gray-600 hover:text-[#1080b0]"
                      }`}
                    >
                      Privacy
                    </button>
                  </div>
                </div>

                {activeTab === "notifications" && (
                  <div>
                    <div className="flex items-center mb-6">
                      <Bell size={20} className="text-[#1080b0] mr-2" />
                      <h2 className="text-lg font-semibold">Notification Preferences</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Order Updates</h3>
                          <p className="text-sm text-gray-600">Receive notifications about your order status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="orderUpdates"
                            checked={notificationSettings.orderUpdates}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Promotions & Discounts</h3>
                          <p className="text-sm text-gray-600">Receive notifications about sales and special offers</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="promotions"
                            checked={notificationSettings.promotions}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">New Arrivals</h3>
                          <p className="text-sm text-gray-600">Get notified when new products are added</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="newArrivals"
                            checked={notificationSettings.newArrivals}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Blog Posts & Articles</h3>
                          <p className="text-sm text-gray-600">Receive notifications about new blog content</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="blogPosts"
                            checked={notificationSettings.blogPosts}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Account Alerts</h3>
                          <p className="text-sm text-gray-600">Important notifications about your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="accountAlerts"
                            checked={notificationSettings.accountAlerts}
                            onChange={handleNotificationChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveNotifications}
                        className="bg-[#1080b0] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                      >
                        Save Preferences
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === "password" && (
                  <div>
                    <div className="flex items-center mb-6">
                      <Lock size={20} className="text-[#1080b0] mr-2" />
                      <h2 className="text-lg font-semibold">Change Password</h2>
                    </div>

                    <form onSubmit={handleChangePassword}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              id="currentPassword"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full p-2 border border-gray-300 rounded-md pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full p-2 border border-gray-300 rounded-md pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                          </p>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full p-2 border border-gray-300 rounded-md pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="bg-[#1080b0] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                        >
                          Change Password
                        </motion.button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "privacy" && (
                  <div>
                    <div className="flex items-center mb-6">
                      <Shield size={20} className="text-[#1080b0] mr-2" />
                      <h2 className="text-lg font-semibold">Privacy Settings</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Share Order History</h3>
                          <p className="text-sm text-gray-600">
                            Allow us to use your order history for personalized recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="shareOrderHistory"
                            checked={privacySettings.shareOrderHistory}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Product Recommendations</h3>
                          <p className="text-sm text-gray-600">
                            Allow us to show you personalized product recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="allowRecommendations"
                            checked={privacySettings.allowRecommendations}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Store Payment Information</h3>
                          <p className="text-sm text-gray-600">
                            Securely store your payment information for faster checkout
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="storePaymentInfo"
                            checked={privacySettings.storePaymentInfo}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-md">
                        <div>
                          <h3 className="font-medium">Allow Cookies</h3>
                          <p className="text-sm text-gray-600">
                            Allow us to use cookies to improve your browsing experience
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="allowCookies"
                            checked={privacySettings.allowCookies}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#bae1e6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1080b0]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSavePrivacy}
                        className="bg-[#1080b0] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0c6a8e] transition-colors"
                      >
                        Save Settings
                      </motion.button>
                    </div>
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

