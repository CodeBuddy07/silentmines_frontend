
import { Sidebar } from "@/components/sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dr. Green Thumb | Dashboard",
  description: "Admin Dashboard for Product Management",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <div className="relative flex h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-repeat z-0"
        style={{ backgroundImage: "url('/space.webp')" }}
      />

      {/* Dark Green Overlay with Blur */}
      <div className="absolute inset-0 bg-[#0f1b0f]/5 backdrop-blur-sm z-0" />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden text-white">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
