"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Submit credentials to backend
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f1b0f] border border-green-800/30 rounded-2xl shadow-xl p-8 text-white">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Dr. Green Thumb</h1>
                <p className="text-sm text-center text-gray-400 mb-8">Admin Login</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label htmlFor="username" className="text-white">Username</Label>
                        <Input
                            id="username"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Login
                    </Button>
                </form>

                <div className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} Dr. Green Thumb. All rights reserved.
                </div>
            </div>
        </div>
    )
}
