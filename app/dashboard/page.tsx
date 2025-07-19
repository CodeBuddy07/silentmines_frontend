'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, X } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import Header from '@/components/dashboard/header/header';

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [priceList, setPriceList] = useState<{ price: string; unit: string }[]>([]);
    const [photos, setPhotos] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            productName,
            description,
            category,
            type,
            priceList,
            photos,
            videos,
        });

        alert('Product submitted successfully!');
        // Reset form fields
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

    const handleFileChange = (
        files: FileList | null,
        type: 'photo' | 'video'
    ) => {
        if (!files) return;
        const fileArray = Array.from(files);
        type === 'photo'
            ? setPhotos([...photos, ...fileArray])
            : setVideos([...videos, ...fileArray]);
    };

    return (
        <div>
            <Header title="Add New Product" subTitle="Fill in the product details below" />
            <form onSubmit={handleSubmit} className="p-6 bg-[#0f1b0f]/60 rounded-xl shadow-lg border border-white/10 text-white space-y-6">

                <div className="space-y-1">
                    <Label>Name</Label>
                    <Input
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="bg-[#1a2a1a] mt-3 text-white"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Write a short description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-[#1a2a1a] mt-3 text-white"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Label>Category</Label>
                        <Select onValueChange={setCategory}>
                            <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2a1a] text-white">
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
                        <Select onValueChange={setType}>
                            <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                <SelectValue placeholder="e.g. jar, packwood" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2a1a] text-white">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1">
                        <Label>Price</Label>
                        <Input
                            placeholder="Price"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            className="bg-[#1a2a1a] mt-3 text-white"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Unit</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. 1LB"
                                value={unitInput}
                                onChange={(e) => setUnitInput(e.target.value)}
                                className="bg-[#1a2a1a] mt-3 text-white"
                            />
                            <Button
                                type='button'
                                onClick={handleAddPriceUnit}
                                className="bg-green-600 hover:bg-green-700 mt-3"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

                {priceList.length > 0 && (
                    <div className="space-y-3">
                        <Label className="text-sm text-white">Price Options</Label>
                        <div className="space-y-2">
                            {priceList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-[#1a2a1a] border border-white/10 rounded-lg p-3 shadow-sm"
                                >
                                    <div className="flex gap-4 text-sm text-white/90">
                                        <span><span className="font-medium text-white"></span> {item.unit}</span>
                                        <span><span className="font-medium text-white"></span> ${item.price}</span>
                                    </div>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleDeletePriceUnit(index)}
                                        className="hover:bg-red-500/10"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className='flex gap-3'>
                    <div className="flex-1">
                        <Label>Upload Photos</Label>
                        <Input
                            className='bg-[#1a2a1a] mt-3'
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileChange(e.target.files, 'photo')}
                        />
                        <div className="flex flex-wrap gap-3">
                            {photos.map((file, idx) => (
                                <div key={idx} className="relative w-20 h-20">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="rounded object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                                        className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <Label>Upload Videos</Label>
                        <Input
                            className='bg-[#1a2a1a] mt-3'
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={(e) => handleFileChange(e.target.files, 'video')}
                        />
                        <div className="flex flex-wrap gap-3">
                            {videos.map((file, idx) => (
                                <div key={idx} className="relative w-24 h-20">
                                    <video
                                        src={URL.createObjectURL(file)}
                                        controls
                                        className="rounded w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setVideos(videos.filter((_, i) => i !== idx))}
                                        className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button type='submit' className="w-full bg-green-600 hover:bg-green-700">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddProductForm;