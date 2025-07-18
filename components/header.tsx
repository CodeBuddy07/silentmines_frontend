"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
    const [searchQuery, setSearchQuery] = useState("")
    // const [notificationCount] = useState(3);

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-[#F5F5F5] border-gray-200 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">

                </div>
            </div>
        </header>
    )
}