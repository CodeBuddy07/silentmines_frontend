"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility if needed
import ProductCard from "../productCard/productCard";
import DeleteProductModal from "../deleteProductModal/deleteProductModal";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const defaultProducts = [
    {
        id: 1,
        image: "/Product_Demo_Image.png",
        discount: 75,
        category: "flower", // from SelectItem
        subcategory: "jar", // from SelectItem
        name: "LEMON BUBBLEGUM 🍋⚡",
        prices: [
            { weight: "1 LB", amount: "750" },
            { weight: "2 LB", amount: "750" },
            { weight: "3 LB", amount: "750" }
        ]
    },
    {
        id: 2,
        image: "/Product_Demo_Image.png",
        discount: 75,
        category: "tier-1-(EXOTIC)", // from SelectItem
        subcategory: "packwood", // from SelectItem
        name: "CHERRY 7UP 🍒🥤",
        prices: [
            { weight: "1 LB", amount: "750" },
            { weight: "2 LB", amount: "750" },
            { weight: "3 LB", amount: "750" }
        ]
    },
    {
        id: 3,
        image: "/Product_Demo_Image.png",
        discount: 75,
        category: "tier-2-(TOP-SHELF)", // from SelectItem
        subcategory: "sluggers", // from SelectItem
        name: "CALIFORNIA DREAM 🌟🌊",
        prices: [
            { weight: "1 LB", amount: "750" },
            { weight: "2 LB", amount: "750" },
            { weight: "3 LB", amount: "750" }
        ]
    },
    {
        id: 4,
        image: "/Product_Demo_Image.png",
        discount: 75,
        category: "tier-3-(CHEAP)", // from SelectItem
        subcategory: "shatter", // from SelectItem
        name: "CAKE POPZ 🧁🎉",
        prices: [
            { weight: "1 LB", amount: "750" },
            { weight: "2 LB", amount: "750" },
            { weight: "3 LB", amount: "750" }
        ]
    }
];



const AllProducts = () => {
    const [products, setProducts] = useState(defaultProducts);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [priceInput, setPriceInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [priceList, setPriceList] = useState<{ price: string; unit: string }[]>([]);

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="relative group">
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
            {/* Edit Modal (Simple Placeholder)*/}
            <Dialog open={editModal} onOpenChange={setEditModal}>
                <DialogContent className="sm:max-w-md bg-black text-white border border-black">
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>

                    {selectedProduct && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setProducts((prev) =>
                                    prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
                                );
                                setEditModal(false);
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
                                <Select>
                                    <SelectTrigger className="bg-[#1a1a1a] mt-3 w-full text-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] text-white">
                                        <SelectItem value="flower">Flower</SelectItem>
                                        <SelectItem value="tier-1-(EXOTIC) ">Tier 1 (EXOTIC)</SelectItem>
                                        <SelectItem value="tier-2-(TOP-SHELF)">Tier 2 (TOP SHELF)</SelectItem>
                                        <SelectItem value="tier-3-(CHEAP)">Tier 3 (CHEAP)</SelectItem>
                                        <SelectItem value="snowcaps">Snowcaps</SelectItem>
                                        <SelectItem value="moonrocks">Moonrocks</SelectItem>
                                        <SelectItem value="pre-rolls">Pre-Rolls</SelectItem>
                                        <SelectItem value="extracts">Extracts</SelectItem>
                                        <SelectItem value="edibles">Edibles</SelectItem>
                                        <SelectItem value="vapes">Vapes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <Label>Type (optional)</Label>
                                <Select>
                                    <SelectTrigger className="bg-[#1a1a1a] mt-3 w-full text-white">
                                        <SelectValue placeholder="e.g. jar, packwood" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] text-white">
                                        <SelectItem value="jar">Jar</SelectItem>
                                        <SelectItem value="packwood">Packwood</SelectItem>
                                        <SelectItem value="sluggers">Sluggers</SelectItem>
                                        <SelectItem value="shatter">Shatter</SelectItem>
                                        <SelectItem value="sugar">Sugar</SelectItem>
                                        <SelectItem value="live-resin">Live Resin</SelectItem>
                                        <SelectItem value="hash-rosin">Hash Rosin</SelectItem>
                                        <SelectItem value="badder">Badder</SelectItem>
                                        <SelectItem value="cartridges">Cartridges</SelectItem>
                                        <SelectItem value="disposables">Disposables</SelectItem>
                                        <SelectItem value="live-resin-pens">Live Resin Pens</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-white">Discount (%)</label>
                                <input
                                    type="number"
                                    value={selectedProduct.discount ?? 0}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            discount: Number(e.target.value),
                                        })
                                    }
                                    className="bg-white/10 border border-white/20 px-3 py-2 rounded-md text-white"
                                    required
                                />
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
                                {(selectedProduct.prices ?? []).map((price: any, idx: any) => (
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