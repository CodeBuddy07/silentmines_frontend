"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ProductCard from "../productCard/productCard";
import DeleteProductModal from "../deleteProductModal/deleteProductModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import Pagination from "@/components/shared/pagination";
import axiosSecure from "@/lib/useAxiosSecure";
import Image from "next/image";



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
    const [categories, setCategories] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState<number[]>([]);
    const [videosToDelete, setVideosToDelete] = useState<number[]>([]);
    const [dealOfTheWeek, setDealOfTheWeek] = useState(false);
    const [bestSeller, setBestSeller] = useState(false);
    const [subCategory, setSubCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();

    const handleUpdateProduct = async (e: any) => {
        e.preventDefault();

        const updatedProduct = {
            ...selectedProduct,
            dealoftheweek: dealOfTheWeek,
            bestSeller: bestSeller,
            subcategory: subCategory
        };

        // Prepare FormData if needed
        const formData = new FormData();
        // Add product details to formData
        formData.append("name", updatedProduct.name);
        formData.append("description", updatedProduct.description);
        formData.append("discount", updatedProduct.discount.toString());
        formData.append("photosToDelete", JSON.stringify(photosToDelete));
        formData.append("videosToDelete", JSON.stringify(videosToDelete));
        formData.append("category", updatedProduct.category);
        formData.append("type", updatedProduct.type);
        formData.append("subcategory", updatedProduct.subcategory);
        formData.append("priceOptions", JSON.stringify(updatedProduct.priceOptions));
        formData.append("dealoftheweek", updatedProduct.dealoftheweek.toString());
        formData.append("bestSeller", updatedProduct.bestSeller.toString());


        // Append image files
        imageFiles.forEach((file) => formData.append("photos", file));

        // Append video files
        videoFiles.forEach((file) => formData.append("videos", file));

        try {
            setLoading(true);
            const response = await axiosSecure.put(`/products/${updatedProduct._id}`, formData);

            if (response.status === 200) {
                console.log("Product updated successfully:", response.data);
                // Reset checkboxes
                setDealOfTheWeek(false);
                setBestSeller(false);
                setEditModal(false);
                setLoading(false);
                setSelectedProduct(null);
                setSubCategory('');
                setImageFiles([]);
                setVideoFiles([]);
                toast.success("Product updated successfully!");
            } else {
                setLoading(false);
                console.error("Failed to update product");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error updating product:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosSecure.get(`/categories`);

            if (response.data) {
                setCategories(response.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axiosSecure.get(`/products?page=${currentPage}&limit=6`);
            setProducts(response.data.data);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axiosSecure.get(`/types`);
            console.log(response.data);

            if (response.data) {
                setType(response.data)
            }
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [editModal, currentPage]);

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
        // Reset deletion arrays when opening modal
        setPhotosToDelete([]);
        setVideosToDelete([]);
    };

    const confirmDelete = async () => {
        const response = await axiosSecure.delete(`/products/${selectedProduct._id}`);

        if (response.status === 200) {
            setProducts(products.filter((p) => p._id !== selectedProduct._id));
            toast.success("Product deleted successfully!");
        }

        setDeleteModal(false);
    };

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

    // Function to mark a photo for deletion
    const markPhotoForDeletion = (index: number) => {
        if (photosToDelete.includes(index)) {
            setPhotosToDelete(photosToDelete.filter(i => i !== index));
        } else {
            setPhotosToDelete([...photosToDelete, index]);
        }
    };

    // Function to mark a video for deletion
    const markVideoForDeletion = (index: number) => {
        if (videosToDelete.includes(index)) {
            setVideosToDelete(videosToDelete.filter(i => i !== index));
        } else {
            setVideosToDelete([...videosToDelete, index]);
        }
    };



    useEffect(() => {
        fetchTypes();
        if (selectedProduct?.subcategory) {
            setSubCategory(selectedProduct.subcategory);
        }
    }, [selectedProduct]);

    return (
        <>
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
                {/* Edit Product Modal */}
                <Dialog open={editModal} onOpenChange={setEditModal}>
                    <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl bg-black text-white border border-black p-3 sm:p-4 md:p-6 max-h-[95vh] overflow-y-auto">
                        <DialogHeader className="pb-2 sm:pb-4">
                            <DialogTitle className="text-lg sm:text-xl md:text-2xl">Update Product</DialogTitle>
                        </DialogHeader>

                        {selectedProduct && (
                            <form onSubmit={handleUpdateProduct} className="space-y-3 sm:space-y-4 md:space-y-6">
                                {/* Basic Information Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                    {/* Product Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white">Name</label>
                                        <input
                                            type="text"
                                            value={selectedProduct.name}
                                            onChange={(e) =>
                                                setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                            }
                                            className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-white">Types</Label>
                                        <Select
                                            value={selectedProduct.type}
                                            onValueChange={(value) =>
                                                setSelectedProduct({ ...selectedProduct, type: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1a1a] text-white">
                                                {type && (type as any[]).map((t: any) => (
                                                    <SelectItem key={t._id} value={t.name}>
                                                        {t.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    {/* Product Description */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-white">Description</Label>
                                        <textarea
                                            value={selectedProduct.description}
                                            onChange={(e) =>
                                                setSelectedProduct({ ...selectedProduct, description: e.target.value })
                                            }
                                            rows={3}
                                            className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base resize-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Category and Discount Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {/* Discount */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white">Discount (%)</label>
                                        <input
                                            type="number"
                                            value={selectedProduct.discount}
                                            onChange={(e) =>
                                                setSelectedProduct({ ...selectedProduct, discount: e.target.value })
                                            }
                                            className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-white">Category</Label>
                                        <Select
                                            value={selectedProduct.category}
                                            onValueChange={(value) =>
                                                setSelectedProduct({ ...selectedProduct, category: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1a1a1a] text-white">
                                                {categories.map((category: any) => (
                                                    <SelectItem key={category._id} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Sub Category - Dynamic */}
                                    {categories.map(
                                        (cat: any) =>
                                            selectedProduct?.category === cat.name && cat.subcategories.length > 0 ? (
                                                <div className="space-y-2" key={cat._id}>
                                                    <Label className="text-sm font-medium text-white">Sub Category</Label>
                                                    <Select
                                                        value={subCategory}
                                                        onValueChange={setSubCategory}
                                                    >
                                                        <SelectTrigger className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base">
                                                            <SelectValue placeholder="e.g. jar, packwood" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-black/90 border border-white/20 text-white">
                                                            {cat.subcategories.map((subcat: any) => (
                                                                <SelectItem key={subcat._id} value={subcat.name}>
                                                                    {subcat.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            ) : null
                                    )}
                                </div>

                                {/* Price Options Section */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-white">Price Options</label>
                                    <div className="space-y-2">
                                        {selectedProduct.priceOptions?.map((price: any, idx: number) => (
                                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={price.unit}
                                                    onChange={(e) => {
                                                        const updatedPrices = [...selectedProduct.priceOptions];
                                                        updatedPrices[idx].unit = e.target.value;
                                                        setSelectedProduct({ ...selectedProduct, priceOptions: updatedPrices });
                                                    }}
                                                    placeholder="Unit (e.g., 1g, 3.5g)"
                                                    className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base"
                                                />
                                                <input
                                                    type="number"
                                                    value={price.price}
                                                    onChange={(e) => {
                                                        const updatedPrices = [...selectedProduct.priceOptions];
                                                        updatedPrices[idx].price = e.target.value;
                                                        setSelectedProduct({ ...selectedProduct, priceOptions: updatedPrices });
                                                    }}
                                                    placeholder="Price"
                                                    className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm sm:text-base"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Flags Section */}
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            defaultChecked={selectedProduct.dealoftheweek}
                                            onChange={(e) => setDealOfTheWeek(e.target.checked)}
                                            className="w-4 h-4"
                                            id="dealofweek"
                                        />
                                        <Label htmlFor="dealofweek" className="text-sm">Deal of the Week</Label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            defaultChecked={selectedProduct.bestSeller}
                                            onChange={(e) => setBestSeller(e.target.checked)}
                                            className="w-4 h-4"
                                            id="bestseller"
                                        />
                                        <Label htmlFor="bestseller" className="text-sm">Best Selling</Label>
                                    </div>
                                </div>

                                {/* Media Management Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                    {/* Images Section */}
                                    <div className="space-y-3">
                                        {/* Existing Images */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-white">Existing Images</Label>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                                {selectedProduct.photoUrls?.map((url: any, index: number) => (
                                                    <div key={index} className="relative aspect-square">
                                                        <Image
                                                            src={url}
                                                            alt={`Product ${index + 1}`}
                                                            width={500} // Add a width and height for better optimization
                                                            height={500}
                                                            className={`rounded object-cover w-full h-full ${photosToDelete.includes(index) ? 'opacity-50 border-2 border-red-500' : ''}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => markPhotoForDeletion(index)}
                                                            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${photosToDelete.includes(index) ? 'bg-red-600 text-white' : 'bg-black/60 hover:bg-red-600 text-white'}`}
                                                        >
                                                            {photosToDelete.includes(index) ? '✓' : '×'}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* New Image Upload */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-white">Upload New Images</Label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/20 file:text-white"
                                            />
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
                                                {imageFiles.map((file, idx) => (
                                                    <div key={idx} className="relative aspect-square">
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            alt={`New ${idx + 1}`}
                                                            width={500} // Specify a width and height for optimization
                                                            height={500}
                                                            className="rounded object-cover w-full h-full"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== idx))}
                                                            className="absolute -top-1 -right-1 w-6 h-6 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Videos Section */}
                                    <div className="space-y-3">
                                        {/* Existing Videos */}
                                        <div className="space-y-2 ">
                                            <Label className="text-sm font-medium text-white">Existing Videos</Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                                                {selectedProduct.videoUrls?.map((url: any, index: number) => (
                                                    <div key={index} className="relative aspect-video">
                                                        <video
                                                            src={url}
                                                            controls
                                                            className={`rounded w-full h-full object-cover ${videosToDelete.includes(index) ? 'opacity-50 border-2 border-red-500' : ''}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => markVideoForDeletion(index)}
                                                            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${videosToDelete.includes(index) ? 'bg-red-600 text-white' : 'bg-black/60 hover:bg-red-600 text-white'}`}
                                                        >
                                                            {videosToDelete.includes(index) ? '✓' : '×'}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* New Video Upload */}
                                        <div className="space-y-2 mt-10">
                                            <Label className="text-sm font-medium text-white">Upload New Videos</Label>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                multiple
                                                onChange={handleVideoChange}
                                                className="w-full bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white text-sm file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-white/20 file:text-white"
                                            />
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
                                                {videoFiles.map((file, idx) => (
                                                    <div key={idx} className="relative aspect-video">
                                                        <video
                                                            src={URL.createObjectURL(file)}
                                                            controls
                                                            className="rounded w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== idx))}
                                                            className="absolute -top-1 -right-1 w-6 h-6 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-4 sm:pt-6 border-t border-white/10">
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        className="w-full sm:w-auto order-2 sm:order-1 hover:bg-white bg-red-500 hover:text-black"
                                        onClick={() => setEditModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-full md:ml-5 sm:w-auto order-1 sm:order-2 bg-green-600 hover:bg-green-700 text-white"
                                        type="submit"
                                    >
                                        {loading ? 'Updating...' : 'Save Changes'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>


            </div>

            <div className="flex items-center justify-center w-full">
                {totalPages! > 1 && products.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages || 0}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </>

    );
};

export default AllProducts;

