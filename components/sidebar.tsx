"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, PlusCircleIcon, AlignEndVertical, LogOut } from "lucide-react"
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
        label: "Category",
        href: "/dashboard/category",
        icon: AlignEndVertical,
    },
]

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const handleLogout = () => {
        toast.success("Logged out successfully!")
        window.location.href = "/log-in"
    }

    return (
        <>
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="sm"
                className="lg:hidden fixed top-4 left-4 z-50"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
            >
                {/* Background image behind blur */}
                <div
                    className="absolute inset-0 bg-cover bg-repeat z-0"
                    style={{ backgroundImage: "url('/space.webp')" }}
                />

                {/* Blurry overlay */}
                <div className="absolute inset-0 bg-green-600/10 backdrop-blur-md z-10" />

                {/* Sidebar content */}
                <div className="relative z-20 flex flex-col h-full text-white">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 pt-10">
                        <div className="h-16 w-24">
                            <h1 className="text-white text-lg font-semibold">SilentMines</h1>
                        </div>
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
                                            "flex items-center mb-1 space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-black text-white"
                                                : "hover:bg-white/10 hover:text-white"
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
                    <div className="pr-4 py-4 border-t border-white/20">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
}
