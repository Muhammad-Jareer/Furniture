"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BreadcrumbWrapper from "@/components/ui/BreadcrumbWrapper";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { getProductById } from "@/supabase/db";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [fullCartItems, setFullCartItems] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (cartItem) => {
          const product = await getProductById(cartItem.id); // Fetch product data by ID
          return { ...cartItem, ...product }; // Merge cart item with product details
        })
      );
      setFullCartItems(updatedCartItems);
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Cart" }];

  const handleQuantityChange = (id, newQuantity) => {
    const parsedQuantity = Number(newQuantity);
    const validQuantity = !isNaN(parsedQuantity) && parsedQuantity >= 1 ? parsedQuantity : 1;
    updateQuantity(id, validQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.success("The item has been removed from your cart");
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "welcome10") {
      setPromoApplied(true);
      setDiscount(calculateSubtotal() * 0.1);
      toast.success("10% discount has been applied!");
    } else {
      toast.error("Invalid or expired promo code.");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 1000 ? 0 : 50;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discount;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <BreadcrumbWrapper items={breadcrumbItems} />
          <h1 className="text-2xl md:text-3xl font-bold text-[#1080b0] mb-6">Shopping Cart</h1>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#bae1e6] mb-4">
                <ShoppingBag size={32} className="text-[#1080b0]" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
              <Link
                href="/shop"
                className="inline-block bg-[#1080b0] hover:bg-[#0c6a8e] text-white px-6 py-3 rounded-md font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({fullCartItems.length})</h2>
                  </div>

                  <div>
                    {fullCartItems.map((item) => (
                      <div key={item.id} className="p-6 border-b flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-24 flex-shrink-0">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <Link href={`/product/${item.id}`} className="font-semibold text-lg hover:text-[#1080b0]">
                              {item.name}
                            </Link>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 border rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus size={16} />
                              </button>

                              <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                max={item.maxQuantity}
                                onChange={(e) => {
                                  const newQty = Number(e.target.value) || 1;
                                  const validQty = Math.min(Math.max(newQty, 1), item.maxQuantity);
                                  handleQuantityChange(item.id, validQty);
                                }}
                                className="p-1 w-12 text-center border-y outline-none"
                              />

                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                className="p-1 border rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">${(item.price || 0).toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 flex justify-between items-center">
                    <Link href="/shop" className="text-[#1080b0] hover:underline flex items-center">
                      <ArrowRight size={16} className="mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                    <button onClick={clearCart} className="text-gray-600 hover:text-red-500">
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo-code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        placeholder={promoApplied ? "WELCOME10 Applied" : "Enter promo code"}
                        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#1080b0] disabled:bg-gray-100"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className="bg-[#1080b0] text-white px-4 py-2 rounded-r-md font-medium hover:bg-[#0c6a8e] disabled:bg-gray-400"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && <p className="text-green-600 text-sm mt-1">10% discount applied!</p>}
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-[#1080b0] hover:bg-[#0c6a8e] text-white text-center py-3 rounded-md font-medium"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
