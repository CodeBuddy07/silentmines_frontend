"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, PlusCircleIcon, AlignEndVertical, LogOut, MegaphoneIcon, CannabisIcon, StarHalf, CalendarSync, Settings } from "lucide-react"
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
    id: "type",
    label: "Manage Types",
    href: "/dashboard/types",
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
  {
    id: "changePassword",
    label: "Change Password",
    href: "/dashboard/changepassword",
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');

      // Clear auth_token from cookies
      // Method 1: Using document.cookie (works in all browsers)
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // If you have subdomains, also clear for the domain
      // document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;

      sessionStorage.clear();

      // Show success message
      toast.success("Logged out successfully!");

      // Redirect to login page after a brief delay
      setTimeout(() => {
        window.location.href = '/log-in'; // or use your router's navigation
        // For Next.js router: router.push('/login');
        // For React Router: navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('Logout error:', error);
      toast.error("An error occurred during logout");

      // Force redirect even if there's an error
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  };


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
            <h1 className="text-green-400 text-xl font-bold">The Green Thumb</h1>
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
