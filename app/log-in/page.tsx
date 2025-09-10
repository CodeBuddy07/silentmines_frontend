// "use client"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { useState } from "react"

// export default function AdminLoginPage() {
//     const [credentials, setCredentials] = useState({ username: "", password: "" })

//     const handleSubmit = (e: React.FormEvent) => {
//         console.log();

//         e.preventDefault()
//     }

//     return (
//         <div className="min-h-screen bg-black flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-[#0f1b0f] border border-green-800/30 rounded-2xl shadow-xl p-8 text-white">
//                 <h1 className="text-3xl font-bold text-center mb-6 text-green-400">The Green Thumb</h1>
//                 <p className="text-sm text-center text-gray-400 mb-8">Admin Login</p>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <Label htmlFor="username" className="text-white">Username</Label>
//                         <Input
//                             id="username"
//                             className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
//                             value={credentials.username}
//                             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                             placeholder="admin"
//                         />
//                     </div>

//                     <div>
//                         <Label htmlFor="password" className="text-white">Password</Label>
//                         <Input
//                             id="password"
//                             type="password"
//                             className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
//                             value={credentials.password}
//                             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                             placeholder="••••••••"
//                         />
//                     </div>
//                     <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
//                         Login
//                     </Button>
//                 </form>

//                 <div className="text-center mt-4">
//                     <a
//                         href="/forget-password"
//                         className="text-green-400 hover:text-green-600 font-semibold text-sm"
//                     >
//                         Forget Password?
//                     </a>
//                 </div>


//                 <div className="text-center text-xs text-gray-500 mt-6">
//                     © {new Date().getFullYear()} The Green Thumb. All rights reserved.
//                 </div>
//             </div>
//         </div>
//     )
// }


"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios" // Import axios for API calls
import { toast } from "sonner"

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false) // To manage loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Check if credentials are empty
        if (!credentials.email || !credentials.password) {
            toast.error("Please fill in both fields.")
            return
        }

        setIsLoading(true)

        try {
            const response = await axios.post("http://localhost:5001/api/admin/login", {
                email: credentials.email,
                password: credentials.password,
            })
            console.log(response);

            if (response.status === 200) {
        
                toast.success("Login successful!")
        
                document.cookie = `auth_token=${response.data.token}`;
        
                window.location.href = "/dashboard";
        
                localStorage.setItem('token', response.data.token);
            }
        } catch (error: any) {
            // Check if error response exists and display accordingly
            if (error.response) {
                toast.error(error.response.data.message || "Login failed. Please try again.")
            } else {
                toast.error("An unexpected error occurred.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#0f1b0f] border border-green-800/30 rounded-2xl shadow-xl p-8 text-white">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-400">The Green Thumb</h1>
                <p className="text-sm text-center text-gray-400 mb-8">Admin Login</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label htmlFor="username" className="text-white">Username</Label>
                        <Input
                            id="username"
                            className="mt-1 bg-[#1a2a1a] border border-green-800 text-white placeholder-gray-400"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                {/* <div className="text-center mt-4">
                    <a
                        href="/forget-password"
                        className="text-green-400 hover:text-green-600 font-semibold text-sm"
                    >
                        Forget Password?
                    </a>
                </div> */}

                <div className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} The Green Thumb. All rights reserved.
                </div>
            </div>
        </div>
    )
}

