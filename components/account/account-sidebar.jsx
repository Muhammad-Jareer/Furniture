"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { User, ShoppingBag, CreditCard, LogOut, Settings } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigation } from "@/hooks/use-navigation"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

export default function AccountSidebar({ activePage }) {
  const { user, signOut, isLoading } = useAuth()
  const { currentPath, navigate } = useNavigation()
  const router = useRouter()

  const handleLogout = async () => {
    if (isLoading) {
      toast.loading("Please wait...");
      return;
    }
  
    const username = user?.email || "User";
    const { error } = await signOut();
  
    if (error) {
      toast.error("Logout failed: " + error.message);
    } else {
      toast.success(`Goodbye, ${username}!`);
      router.push("/login");
    }
  };

  const menuItems = [
    { id: "profile",  label: "My Profile",      icon: <User size={18} />,        href: "/account/profile" },
    { id: "orders",   label: "My Orders",       icon: <ShoppingBag size={18} />,  href: "/account/orders" },
    { id: "payment",  label: "Payment Methods", icon: <CreditCard size={18} />,   href: "/account/payment" },
    { id: "settings", label: "Account Settings",icon: <Settings size={18} />,     href: "/account/settings" },
  ]

  const getActivePage = () => {
    if (activePage) return activePage
    for (const item of menuItems) {
      if (currentPath === item.href || currentPath.startsWith(item.href)) {
        return item.id
      }
    }
    return "profile"
  }

  const activePageId = getActivePage()

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-bold text-lg mb-4 px-2">My Account</h2>

      <nav className="space-y-1">
        {menuItems.map(item => (
          <Link key={item.id} href={item.href} onClick={() => navigate(item.href)}>
            <motion.div
              whileHover={{ x: 5 }}
              className={`flex items-center px-2 py-3 rounded-md cursor-pointer ${
                activePageId === item.id
                  ? "bg-[#bae1e6] text-[#1080b0]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-2 py-3 rounded-md text-gray-700 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
          disabled={isLoading}
        >
          <span className="mr-3">
            <LogOut size={18} />
          </span>
          <span>Logout</span>
        </button>

      </nav>
    </div>
  )
}
