"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!")
        } else {
            console.log(newPassword);
            
            console.log("Password reset successful!")
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f1b0f] border border-green-800/30 rounded-2xl shadow-xl p-8 text-white">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-400">The Green Thumb</h1>
                <p className="text-sm text-center text-gray-400 mb-8">Reset your password to continue.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label htmlFor="email" className="text-white">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your-email@example.com"
                        />
                    </div>

                    <div>
                        <Label htmlFor="new-password" className="text-white">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Reset Password
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <a 
                        href="/login" 
                        className="text-green-400 hover:text-green-600 font-semibold text-sm"
                    >
                        Back to Login
                    </a>
                </div>

                <div className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} The Green Thumb. All rights reserved.
                </div>
            </div>
        </div>
    )
}