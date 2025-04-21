"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, isLoading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, user } = await login(formData);

    if (error) {
      toast.error(error.message || "Login failed. Try again.");
    } else {
      toast.success(`Welcome back, ${user?.user_metadata?.first_name || "user"}!`);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1080b0]">Login to Your Account</h1>
                <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1080b0]"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1080b0]"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="remember-me"
                      className="h-4 w-4 text-[#1080b0] border-gray-300 rounded"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <Link href="/account/forgot-password" className="text-sm text-[#1080b0] hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 bg-[#1080b0] text-white py-3 rounded-md font-medium transition-colors duration-200 ${
                    isLoading ? "cursor-not-allowed opacity-70" : "hover:bg-[#0c6a8e]"
                  }`}
                >
                  {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                  {isLoading ? "Signing In..." : "Sign In"}
                </motion.button>
              </form>

              <div className="mt-6">
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 rounded-md py-2 px-4 shadow-sm transition text-sm font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                    <path fill="#4285f4" d="M533.5 278.4c0-17.7-1.6-35-4.6-51.6H272v97.8h147.2c-6.4 34.8-25.6 64.3-54.5 84v69.6h88.2c51.5-47.4 80.6-117.2 80.6-200z"/>
                    <path fill="#34a853" d="M272 544.3c73.6 0 135.4-24.4 180.6-66.2l-88.2-69.6c-24.5 16.5-55.8 26-92.4 26-71 0-131-47.9-152.4-112.1H30.6v70.4c45.4 89.6 138.6 151.5 241.4 151.5z"/>
                    <path fill="#fbbc04" d="M119.6 322.4c-10.1-30.1-10.1-62.3 0-92.4V159.6H30.6c-35.9 71.8-35.9 155 0 226.8l89-70z"/>
                    <path fill="#ea4335" d="M272 107.7c39.9-.6 78.2 13.9 107.7 40.4l80.4-80.4C407.5 24.7 343.6 0 272 0 169.2 0 76 61.9 30.6 151.5l89 70c21.3-64.1 81.4-112 152.4-113.8z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#1080b0] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
