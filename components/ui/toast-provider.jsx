"use client"

import { Toaster } from "react-hot-toast"

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-white text-gray-900 shadow-lg border",
          duration: 4000
        }}
      />
    </>
  )
}