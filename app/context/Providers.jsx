import { CartProvider } from "@/app/context/CartContext"
import { ToastProvider } from "@/components/ui/toast-provider"

export const Providers = ({ children }) => {
  return (
    <CartProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </CartProvider>
  )
}
