"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ProductCard from "../productCard/productCard";
import DeleteProductModal from "../deleteProductModal/deleteProductModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { baseUrl } from "@/app/dashboard/page";
import { toast } from "sonner";
import axios from "axios";

const AllProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [priceInput, setPriceInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [priceList, setPriceList] = useState<{ price: string; unit: string }[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([]);


    const handleUpdateProduct = async (e: any) => {
        e.preventDefault();

        try {
            // Create FormData
            const formData = new FormData();




            // Append product details
            formData.append("name", selectedProduct.name);
            formData.append("description", selectedProduct.description);
            formData.append("discount", selectedProduct.discount.toString());
            formData.append("category", selectedProduct.category);
            formData.append("priceOptions", JSON.stringify(selectedProduct.priceOptions));

            // Append image files
            imageFiles.forEach((file) => formData.append("photos", file));

            // Append video files
            videoFiles.forEach((file) => formData.append("videos", file));


            // Make API call
            const response = await axios.put(`http://localhost:5001/api/products/${selectedProduct._id}`, formData);

            console.log('test');


            console.log(response)

            if (response.status === 200) {
                console.log("Product updated successfully:", response.data);
                toast.success("Product updated successfully");
            } else {
                toast.error("Failed to update product");
            }

            setEditModal(false); // Close modal
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product");
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/products?page=2");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [handleUpdateProduct]);

    const handleDelete = (product: any) => {
        setSelectedProduct(product);
        setDeleteModal(true);
    };

    const handleAddPriceUnit = () => {
        if (!priceInput || !unitInput) return;
        setPriceList([...priceList, { price: priceInput, unit: unitInput }]);
        setPriceInput('');
        setUnitInput('');
    };

    const handleDeletePriceUnit = (index: number) => {
        setPriceList(priceList.filter((_, i) => i !== index));
    };

    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setEditModal(true);
    };

    const confirmDelete = async () => {
        const response = await axios.delete(`${baseUrl}/products/${selectedProduct._id}`);

        if (response.status === 200) {
            setProducts(products.filter((p) => p._id !== selectedProduct._id));
            toast.success("Product deleted successfully!");
        }

        setDeleteModal(false);
    };

    // new function
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImageFiles([...imageFiles, ...Array.from(files)]);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setVideoFiles([...videoFiles, ...Array.from(files)]);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product._id} className="relative group">
                    <ProductCard {...product} />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Button size="icon" variant="secondary" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(product)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}

            {/* Delete Confirmation Modal */}
            <DeleteProductModal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={confirmDelete}
                productName={selectedProduct?.name}
            />

            {/* Edit Product Modal */}
            <Dialog open={editModal} onOpenChange={setEditModal}>
                <DialogContent className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-black text-white border border-black p-6">
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <form onSubmit={handleUpdateProduct} className="space-y-4">
                            {/* Product Name */}
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-white">Name</label>
                                <input
                                    type="text"
                                    value={selectedProduct.name}
                                    onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                    }
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                    required
                                />
                            </div>

                            {/* Product Description */}
                            <div className="space-y-1 flex flex-col">
                                <Label>Description</Label>
                                <textarea
                                    value={selectedProduct.description}
                                    onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                                    }
                                    rows={3}
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                    required
                                />
                            </div>


                            <div className="flex gap-4">

                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-medium text-white">Discount (%)</label>
                                    <input
                                        type="number"
                                        value={selectedProduct.discount}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, discount: e.target.value })
                                        }
                                        className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                        required
                                    />
                                </div>


                                <div className="flex-1">
                                    <Label>Category</Label>
                                    <Select
                                        value={selectedProduct.category}
                                        onValueChange={(value) =>
                                            setSelectedProduct({ ...selectedProduct, category: value })
                                        }
                                    >
                                        <SelectTrigger className="bg-[#1a1a1a] w-full text-white">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1a1a1a] text-white">
                                            <SelectItem value="flower">Flower</SelectItem>
                                            <SelectItem value="tier-1-(EXOTIC)">Tier 1 (EXOTIC)</SelectItem>
                                            <SelectItem value="tier-2-(TOP-SHELF)">Tier 2 (TOP SHELF)</SelectItem>
                                            <SelectItem value="tier-3-(CHEAP)">Tier 3 (CHEAP)</SelectItem>
                                            <SelectItem value="snowcaps">Snowcaps</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Price Options */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Prices</label>
                                {selectedProduct.priceOptions?.map((price: any, idx: any) => (
                                    <div key={idx} className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={price.unit}
                                            onChange={(e) => {
                                                const updatedPrices = [...selectedProduct.priceOptions];
                                                updatedPrices[idx].unit = e.target.value;
                                                setSelectedProduct({ ...selectedProduct, priceOptions: updatedPrices });
                                            }}
                                            className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                        />
                                        <input
                                            type="number"
                                            value={price.price}
                                            onChange={(e) => {
                                                const updatedPrices = [...selectedProduct.priceOptions];
                                                updatedPrices[idx].price = e.target.value;
                                                setSelectedProduct({ ...selectedProduct, priceOptions: updatedPrices });
                                            }}
                                            className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-white mr-2">Upload Images</Label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                />
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {imageFiles.map((file, idx) => (
                                        <div key={idx} className="relative w-20 h-20">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                className="rounded object-cover w-full h-full"
                                            />
                                            <button
                                                onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== idx))}
                                                className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video Upload */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-white mr-2">Upload Videos</Label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoChange}
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                />
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {videoFiles.map((file, idx) => (
                                        <div key={idx} className="relative w-24 h-20">
                                            <video
                                                src={URL.createObjectURL(file)}
                                                controls
                                                className="rounded w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== idx))}
                                                className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <DialogFooter className="mt-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    className="hover:bg-white bg-red-500"
                                    onClick={() => setEditModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>



        </div>
    );
};

export default AllProducts;