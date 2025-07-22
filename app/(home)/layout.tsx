import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import type { Metadata } from "next";
import { AuthProvider } from "../contexts/auth-context";
import ProtectedRoute from "./_components/protected-route";


export const metadata: Metadata = {
  title: "Dr. Green Thumb",
  description: "High Quality Weed That's Out of This World",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div>
        <ProtectedRoute>
          <Navbar />
          <div className="bg-[url('/starry_background.jpg')] bg-repeat text-white min-h-screen">

            {children}

          </div>
          <Footer />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
}
