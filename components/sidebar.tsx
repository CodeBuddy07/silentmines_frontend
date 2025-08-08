"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, PlusCircleIcon, AlignEndVertical, LogOut, MegaphoneIcon, CannabisIcon, StarHalf, CalendarSync } from "lucide-react"
import { toast } from "sonner"

const navigationItems = [
  {
    id: "addProduct",
    label: "Products",
    href: "/dashboard",
    icon: PlusCircleIcon,
  },
  {
    id: "category",
    label: "Manage Category",
    href: "/dashboard/category",
    icon: AlignEndVertical,
  },
  {
    id: "tags",
    label: "Manage Tags",
    href: "/dashboard/tags",
    icon: CannabisIcon,
  },
  {
    id: "review",
    label: "Manage Reviews",
    href: "/dashboard/manageReviews",
    icon: StarHalf,
  },
  {
    id: "time",
    label: "Manage Times",
    href: "/dashboard/manageTimes",
    icon: CalendarSync,
  },
  {
    id: "announcement",
    label: "Announcement",
    href: "/dashboard/announcement",
    icon: MegaphoneIcon,
  },
];

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully!")
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#0f1b0f]/60 backdrop-blur-md border-r border-green-800/30 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Sidebar content */}
        <div className="flex flex-col h-full text-white relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 pt-10">
            <h1 className="text-green-400 text-xl font-bold">Dr. Green Thumb</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.id} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-black text-green-400"
                        : "hover:bg-green-600/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-green-800/20">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-white hover:text-white hover:bg-green-600/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
