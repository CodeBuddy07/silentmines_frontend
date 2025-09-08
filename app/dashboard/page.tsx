'use client';

import { useEffect, useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllProducts from '@/components/dashboard/allProducts/allProducts';
import { toast } from 'sonner';
import CategoryModel from '@/components/dashboard/categoryModel/CategoryModel';
import TypesModal from '@/components/dashboard/typesModel/TypesModel';
import axios from 'axios';

export const baseUrl = 'http://localhost:5001/api';

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
    const [discount, setDiscount] = useState('');
    const [categories, setCategories] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [isTypesOpen, setIsTypesOpen] = useState(false);
    const [newType, setNewType] = useState({ title: "" });
    const [types, setTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [dealOfTheWeek, setDealOfTheWeek] = useState(false);
    const [bestSeller, setBestSeller] = useState(false);

    const addCategory = async () => {
        if (!newCategory.name) {
            toast.error('Please provide a category name.');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/categories`, {
                name: newCategory.name,
                description: newCategory.description,
            });

            if (response.status === 201) {
                toast.success('Category added successfully!');
                setIsCategoryOpen(false);
                setNewCategory({ name: "", description: "" });
            } else {
                toast.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('An error occurred while adding the category');
        }
    };

    const handleFileChange = (files: FileList | null, type: 'photo' | 'video') => {
        if (!files) return;
        const fileArray = Array.from(files);
        type === 'photo'
            ? setPhotos([...photos, ...fileArray])
            : setVideos([...videos, ...fileArray]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('type', type);
        formData.append('discount', discount);
        formData.append('priceOptions', JSON.stringify(priceList));
        formData.append('dealofftheweek', dealOfTheWeek ? 'true' : 'false');;
        formData.append('bestSeller', bestSeller ? 'true' : 'false');

        photos.forEach(photo => formData.append('photos', photo));
        videos.forEach(video => formData.append('videos', video));

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const req = await axios.post(`${baseUrl}/products`, formData);
            const response = req;
            console.log(response);

            if (response.data.status === 201) {
                toast.success('Product added successfully!');
            } else {
                toast.error('Error adding product');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            toast.error('An unexpected error occurred');
        }
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

    const addType = async () => {
        if (!newType.title) {
            toast.error('Please provide a type title.');
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/types`, {
                name: newType.title
            })

            if (response.status === 201) {
                toast.success('Type added successfully!');
                setIsTypesOpen(false);
                setNewType({ title: "" });
            } else {
                toast.error('Failed to add type');
            }
        } catch (error) {
            console.error('Error adding category:', error);

            toast.error('An error occurred while adding the category');
        }

        setIsTypesOpen(false);
        setNewType({ title: "" });
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${baseUrl}/categories`);

            if (response.data) {
                setCategories(response.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const fetchTypes = async () => {
        try {
            const response = await axios.get(`${baseUrl}/types`);

            if (response.data) {
                setTypes(response.data)
            }
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    }

    useEffect(() => {
        fetchTypes();
        fetchCategories();
    }, [])

    return (
        <div>
            <Header title="Add New Product" subTitle="Fill in the product details below" />

            <Tabs defaultValue="add">
                <div className='flex items-center justify-between'>
                    <TabsList className="bg-[#0f1b0f]/60 border-b border-white/10 mb-8">
                        <TabsTrigger
                            className="text-white cursor-pointer data-[state=active]:bg-green-600 data-[state=active]:text-white"
                            value="add"
                        >
                            Add Product
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-white cursor-pointer data-[state=active]:bg-green-600 data-[state=active]:text-white"
                            value="allProducts"
                        >
                            All Products
                        </TabsTrigger>
                    </TabsList>

                    <div className='flex items-center gap-2'>
                        <Button
                            className='bg-[#00A63E] cursor-pointer'
                            onClick={() => setIsCategoryOpen(true)}
                        >Add Category</Button>

                        {/* Category Model */}
                        <CategoryModel
                            open={isCategoryOpen}
                            setOpen={setIsCategoryOpen}
                            title="Add Category"
                            fields={[
                                {
                                    name: "name",
                                    placeholder: "Category Name",
                                    value: newCategory.name,
                                    onChange: (val: any) => setNewCategory({ ...newCategory, name: val }),
                                },
                                {
                                    name: "description",
                                    placeholder: "Description",
                                    type: "textarea",
                                    value: newCategory.description,
                                    onChange: (val: any) =>
                                        setNewCategory({ ...newCategory, description: val }),
                                },
                            ]}
                            onSave={addCategory}
                        />

                        <Button className="bg-[#00A63E] cursor-pointer" onClick={() => setIsTypesOpen(true)}>
                            Add Tages
                        </Button>

                        <TypesModal
                            open={isTypesOpen}
                            setOpen={setIsTypesOpen}
                            title="Add Tags"
                            fields={[
                                {
                                    name: "title",
                                    placeholder: "Tags Title",
                                    value: newType.title,
                                    onChange: (val) => setNewType({ title: val }),
                                },
                            ]}
                            onSave={addType}
                        />
                    </div>
                </div>

                <TabsContent value="add">
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

                        <div className="space-y-1">
                            <Label>Discount (%)</Label>
                            <Input
                                placeholder="e.g. 10"
                                type="number"
                                min="0"
                                max="100"
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                className="bg-[#1a2a1a] mt-3 text-white"
                            />
                        </div>

                        <div className="flex gap-6 items-center mt-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={dealOfTheWeek}
                                    onChange={() => setDealOfTheWeek(prev => !prev)}
                                    className="w-4 h-4"
                                />
                                <Label>Deal of the Week</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={bestSeller}
                                    onChange={() => setBestSeller(prev => !prev)}
                                    className="w-4 h-4"
                                />
                                <Label>Best Selling</Label>
                            </div>
                        </div>



                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
                            <div className="flex-1">
                                <Label>Category</Label>
                                <Select onValueChange={setCategory}>
                                    <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a2a1a] text-white">
                                        {categories.map((category: any) => (
                                            <SelectItem key={category._id} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
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
                                        {types.map((type: any) => (
                                            <SelectItem key={type._id} value={type.name}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* show sub category dynamically */}
                        {categories.map((cat: any) =>
                            category === cat.name && cat.subcategories.length > 0 ? (
                                <div className="flex-1" key={cat._id}>
                                    <Label>Sub Category</Label>
                                    <Select onValueChange={setType}>
                                        <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                            <SelectValue placeholder="e.g. jar, packwood" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1a2a1a] text-white">
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
                </TabsContent>
                <TabsContent value="allProducts">
                    <AllProducts />
                </TabsContent>
            </Tabs>


        </div>
    );
};

export default AddProductForm;