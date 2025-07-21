import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { Dispatch, SetStateAction } from 'react'

interface ProductPrice {
    weight: string;
    amount: string;
}

export interface Product {
    id: string | number;
    name?: string;
    category?: string;
    type?: string;
    discount?: number;
    description?: string;
    prices?: ProductPrice[];
    [key: string]: any;
}
interface UpdateProductsProps {
    editModal: boolean;
    setEditModal: (open: boolean) => void;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product) => void;
    setProducts: Dispatch<SetStateAction<Product[]>>;
}

const UpdateProducts: React.FC<UpdateProductsProps> = ({ editModal, setEditModal, selectedProduct, setSelectedProduct, setProducts }) => {
    return (
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
                                            const updatedPrices = [...(selectedProduct.prices ?? [])];
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
                                            const updatedPrices = [...(selectedProduct.prices ?? [])];
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
    )
}

export default UpdateProducts