import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import type { Metadata } from "next";
import { AuthProvider } from "../contexts/auth-context";
import ProtectedRoute from "./_components/protected-route";
import { CartProvider, useCart } from "../contexts/cartContext";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "The Green Thumb",
  description: "High Quality Weed That's Out of This World",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <AuthProvider>
      <CartProvider>
        <ProtectedRoute>
          <Navbar />
          <div className="bg-[url('/starry_background.jpg')] bg-repeat text-white min-h-screen">

            {children}
            <Toaster position="top-center" richColors  expand={true} />
          </div>
          <Footer />
        </ProtectedRoute>
      </CartProvider>
    </AuthProvider>
  );
}
