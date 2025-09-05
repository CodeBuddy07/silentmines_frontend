"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ProductCard from "../productCard/productCard";
import DeleteProductModal from "../deleteProductModal/deleteProductModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import axios from "axios";

const AllProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [priceInput, setPriceInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [priceList, setPriceList] = useState<{ price: string; unit: string }[]>([]);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/products?page=1");
                setProducts(response.data.data);
                console.log(response.data);
                
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

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

    const confirmDelete = () => {
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        setDeleteModal(false);
    };

    const handleUpdateProduct = async () => {
        try {
            const updatedProduct = {
                name: selectedProduct.name,
                description: selectedProduct.description,
                category: selectedProduct.category,
                type: selectedProduct.type,
                priceOptions: priceList
            };

            const response = await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, updatedProduct);

            if (response.status === 200) {
                setProducts(products.map((product) =>
                    product._id === selectedProduct._id ? response.data : product
                ));
                setEditModal(false); // Close the edit modal
            }
        } catch (error) {
            console.error("Error updating product:", error);
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

            {/* Edit Modal */}
            <Dialog open={editModal} onOpenChange={setEditModal}>
                <DialogContent className="sm:max-w-md bg-black text-white border border-black">
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateProduct();
                            }}
                            className="space-y-4"
                        >
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-white">Name</label>
                                <input
                                    type="text"
                                    value={selectedProduct.name ?? ""}
                                    onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                    }
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Category</Label>
                                <Select
                                    value={selectedProduct.category ?? ""}
                                    onValueChange={(value) =>
                                        setSelectedProduct({ ...selectedProduct, category: value })
                                    }
                                >
                                    <select className="bg-[#1a1a1a] mt-3 w-full text-white">
                                        <option value="" disabled>
                                            Select Category
                                        </option>
                                        <option value="flower">Flower</option>
                                        <option value="tier-1-(EXOTIC)">Tier 1 (EXOTIC)</option>
                                        <option value="tier-2-(TOP-SHELF)">Tier 2 (TOP SHELF)</option>
                                        <option value="tier-3-(CHEAP)">Tier 3 (CHEAP)</option>
                                        <option value="snowcaps">Snowcaps</option>
                                    </select>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-white">Description</label>
                                <textarea
                                    value={selectedProduct.description ?? ""}
                                    onChange={(e) =>
                                        setSelectedProduct({ ...selectedProduct, description: e.target.value })
                                    }
                                    rows={3}
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Prices</label>
                                {selectedProduct.prices?.map((price: any, idx: any) => (
                                    <div key={idx} className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Weight"
                                            value={price.weight ?? ""}
                                            onChange={(e) => {
                                                const updatedPrices = [...selectedProduct.prices];
                                                updatedPrices[idx].weight = e.target.value;
                                                setSelectedProduct({ ...selectedProduct, prices: updatedPrices });
                                            }}
                                            className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Amount"
                                            value={price.amount ?? ""}
                                            onChange={(e) => {
                                                const updatedPrices = [...selectedProduct.prices];
                                                updatedPrices[idx].amount = e.target.value;
                                                setSelectedProduct({ ...selectedProduct, prices: updatedPrices });
                                            }}
                                            className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                        />
                                    </div>
                                ))}
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