"use client";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import type { Metadata } from "next";
import { AuthProvider } from "../contexts/auth-context";
import ProtectedRoute from "./_components/protected-route";
import { CartProvider, useCart } from "../contexts/cartContext";
import { Toaster } from "@/components/ui/sonner";
import OrderPopup from "./_components/OrderForm";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { getCartItemCount } = useCart();

  const cartItemCount = getCartItemCount();

  return (
    <AuthProvider>
      


        <ProtectedRoute>
          <Navbar />
          <div className="bg-[url('/starry_background.jpg')] bg-repeat text-white min-h-screen">

            {children}
            {/* Floating Cart Button */}
            {cartItemCount > 0 && (
              <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                <OrderPopup>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 sm:p-4 shadow-lg shadow-emerald-500/30 relative">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                      {cartItemCount}
                    </span>
                  </Button>
                </OrderPopup>
              </div>
            )}
            <Toaster position="top-center" richColors expand={true} />
          </div>
          <Footer />
        </ProtectedRoute>
    </AuthProvider>
  );
}
