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

export default function AddProductPage() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        prices: "",
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

        // Submit `data` to API route
    }

    return (
        <Tabs defaultValue="add" className="p-6">
            <TabsList className="mb-6">
                <TabsTrigger value="add">Add Product</TabsTrigger>
                <TabsTrigger value="view">All Products</TabsTrigger>
            </TabsList>

            <TabsContent value="add">
                <Card className=" bg-white/10 backdrop-blur-lg border text-white border-muted/40">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            New Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
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
                                    placeholder="Detailed product description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prices">Price Tiers</Label>
                                <Input
                                    id="prices"
                                    placeholder="e.g. 3.5g: $30, 7g: $55"
                                    value={form.prices}
                                    onChange={(e) =>
                                        setForm({ ...form, prices: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Upload Images</Label>
                                <label className="inline-block px-4 py-2 bg-gray-800 text-white rounded cursor-pointer w-full">
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
                                                className="w-24 h-24 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video">Upload Video</Label>
                                <label className="inline-block px-4 py-2 bg-gray-800 text-white rounded cursor-pointer w-full">
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
                                    <video controls className="w-full max-w-xs mt-2 rounded border">
                                        <source src={URL.createObjectURL(form.video)} />
                                    </video>
                                )}
                            </div>



                            <Button type="submit" className="w-full">
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
