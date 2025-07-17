"use client"

import { useState } from "react"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AllProducts from "@/components/dashboard/allProducts/allProducts"
import Header from "@/components/dashboard/header/header"

export default function AddProductPage() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        prices: "",
        unit: "",
        images: [] as File[],
        video: null as File | null,
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setForm({ ...form, images: Array.from(e.target.files) })
        }
    }

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, video: e.target.files[0] })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name", form.name)
        data.append("description", form.description)
        data.append("prices", form.prices)
        form.images.forEach((img) => data.append("images", img))
        if (form.video) data.append("video", form.video)
        // Submit `data` to API
    }

    return (
        <Tabs defaultValue="add" className="lg:p-6 pt-8 text-white">
            <Header title="Add Product" subTitle="Create and manage your products" />
            <TabsList className="mb-6 bg-[#0f1b0f]/60 border border-muted/30 backdrop-blur-md">
                <TabsTrigger
                    value="add"
                    className="data-[state=active]:bg-green-400 data-[state=active]:text-black text-white"
                >
                    Add Product
                </TabsTrigger>
                <TabsTrigger
                    value="view"
                    className="data-[state=active]:bg-green-400 data-[state=active]:text-black text-white"
                >
                    All Products
                </TabsTrigger>
            </TabsList>

            <TabsContent value="add">
                <Card className="bg-[#0f1b0f] text-white border border-muted/30 shadow-xl">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    className="bg-[#1a2a1a] border-muted/30"
                                    placeholder="Enter product name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    className="bg-[#1a2a1a] border-muted/30"
                                    placeholder="Detailed product description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prices">Price</Label>
                                <Input
                                    id="prices"
                                    className="bg-[#1a2a1a] border-muted/30"
                                    placeholder="Price"
                                    value={form.prices}
                                    onChange={(e) =>
                                        setForm({ ...form, prices: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    className="bg-[#1a2a1a] border-muted/30"
                                    placeholder="e.g. 3.5g, 7g"
                                    value={form.unit}
                                    onChange={(e) =>
                                        setForm({ ...form, unit: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Upload Images</Label>
                                <label className="inline-block px-4 py-2 bg-[#1a2a1a] text-white border border-muted/30 rounded cursor-pointer w-full text-center hover:bg-[#243524] transition">
                                    Choose Images
                                    <input
                                        id="images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                {form.images.length > 0 && (
                                    <div className="flex gap-3 flex-wrap mt-2">
                                        {form.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={URL.createObjectURL(img)}
                                                alt={`preview-${i}`}
                                                className="w-24 h-24 object-cover rounded border border-muted/20"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video">Upload Video</Label>
                                <label className="inline-block px-4 py-2 bg-[#1a2a1a] text-white border border-muted/30 rounded cursor-pointer w-full text-center hover:bg-[#243524] transition">
                                    Choose Video
                                    <input
                                        id="video"
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoChange}
                                        className="hidden"
                                    />
                                </label>
                                {form.video && (
                                    <video
                                        controls
                                        className="w-full max-w-xs h-[200px] mt-2 rounded border border-muted/20"
                                    >
                                        <source src={URL.createObjectURL(form.video)} />
                                    </video>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-green-700 hover:bg-green-600 text-white"
                            >
                                Save Product
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="view">
                <AllProducts />
            </TabsContent>
        </Tabs>
    )
}
