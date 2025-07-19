// 'use client';

// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Trash2, X } from 'lucide-react';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import Header from '@/components/dashboard/header/header';

// const AddProductForm = () => {
//     const [productName, setProductName] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [type, setType] = useState('');
//     const [priceInput, setPriceInput] = useState('');
//     const [unitInput, setUnitInput] = useState('');
//     const [priceList, setPriceList] = useState<{ price: string; unit: string }[]>([]);
//     const [photos, setPhotos] = useState<File[]>([]);
//     const [videos, setVideos] = useState<File[]>([]);

//     const handleAddPriceUnit = () => {
//         if (!priceInput || !unitInput) return;
//         setPriceList([...priceList, { price: priceInput, unit: unitInput }]);
//         setPriceInput('');
//         setUnitInput('');
//     };

//     const handleDeletePriceUnit = (index: number) => {
//         setPriceList(priceList.filter((_, i) => i !== index));
//     };

//     const handleFileChange = (
//         files: FileList | null,
//         type: 'photo' | 'video'
//     ) => {
//         if (!files) return;
//         const fileArray = Array.from(files);
//         type === 'photo'
//             ? setPhotos([...photos, ...fileArray])
//             : setVideos([...videos, ...fileArray]);
//     };

//     return (
//         <div>
//             <Header title="Add New Product" subTitle="Fill in the product details below" />
//             <div className="p-6 bg-[#0f1b0f]/60 rounded-lg shadow border border-white/10 text-white space-y-6">
//                 <Label className=''>Name</Label>
//                 <Input
//                     placeholder="Name"
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     className="bg-[#1a2a1a] text-white"
//                 />
//                 <Label className=''>Description</Label>
//                 <Textarea
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="bg-[#1a2a1a] text-white"
//                 />

//                 <div className="flex items-center gap-4">
//                     <div className='flex-1 w-full'>
//                         <Label>Category</Label>
//                         <Select onValueChange={setCategory}>
//                             <SelectTrigger className="bg-[#1a2a1a] w-full mt-3 text-white">
//                                 <SelectValue placeholder="Select Category" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-[#1a2a1a] text-white">
//                                 <SelectItem value="flower">Flower</SelectItem>
//                                 <SelectItem value="pre-rolls">Pre-Rolls</SelectItem>
//                                 <SelectItem value="extracts">Extracts</SelectItem>
//                                 <SelectItem value="edibles">Edibles</SelectItem>
//                                 <SelectItem value="vapes">Vapes</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className='flex-1 w-full'>
//                         <Label>Type (optional)</Label>
//                         <Select onValueChange={setType}>
//                             <SelectTrigger className="bg-[#1a2a1a] w-full mt-3 text-white">
//                                 <SelectValue placeholder="e.g. jar, packet, potla" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-[#1a2a1a] text-white">
//                                 <SelectItem value="jar">Jar</SelectItem>
//                                 <SelectItem value="packet">Packet</SelectItem>
//                                 <SelectItem value="potla">Potla</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 <div className="flex items-end gap-2">
//                     <div className='flex-1 w-full'>
//                         <Label className=''>Price</Label>
//                         <Input
//                             placeholder="Price"
//                             value={priceInput}
//                             onChange={(e) => setPriceInput(e.target.value)}
//                             className="bg-[#1a2a1a] text-white mt-3 w-full"
//                         />
//                     </div>
//                     <div className='flex-1 w-full'>
//                         <Label className=''>Unit</Label>
//                         <div className='flex items-center mt-3 gap-2'>
//                             <Input
//                                 placeholder="Unit (e.g. 1LB)"
//                                 value={unitInput}
//                                 onChange={(e) => setUnitInput(e.target.value)}
//                                 className="bg-[#1a2a1a] text-white w-full"
//                             />
//                             <Button onClick={handleAddPriceUnit} className="bg-green-600 hover:bg-green-700 text-white">
//                                 Add
//                             </Button>
//                         </div>
//                     </div>
//                 </div>

//                 {priceList.length > 0 && (
//                     <div>
//                         {priceList.map((item, index) => (
//                             <div key={index} className="flex items-center justify-between gap-4 bg-gray-800 p-2 rounded-lg">
//                                 <div className="text-sm">Price: ${item.price}</div>
//                                 <div className="text-sm">Unit: {item.unit}</div>
//                                 <Button variant="ghost" size="icon" onClick={() => handleDeletePriceUnit(index)}>
//                                     <Trash2 className="w-4 h-4 text-red-500" />
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Photo Upload Section */}
//                 <div>
//                     <Label>Upload Photo</Label>
//                     <Input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={(e) => handleFileChange(e.target.files, 'photo')}
//                     />
//                     <div className="flex items-center gap-2 mt-2">
//                         {photos.map((file, idx) => (
//                             <div key={idx} className="relative w-20 h-20">
//                                 <img
//                                     src={URL.createObjectURL(file)}
//                                     className="w-full h-full object-cover rounded"
//                                     alt={`photo-${idx}`}
//                                 />
//                                 <button
//                                     onClick={() =>
//                                         setPhotos((prev) => prev.filter((_, i) => i !== idx))
//                                     }
//                                     className="absolute top-0 right-0 bg-black/60 rounded-full p-1 hover:bg-red-600"
//                                 >
//                                     <X className="w-4 h-4 text-white" />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Video Upload Section */}
//                 <div>
//                     <Label>Upload Video</Label>
//                     <Input
//                         type="file"
//                         accept="video/*"
//                         multiple
//                         onChange={(e) => handleFileChange(e.target.files, 'video')}
//                     />
//                     <div className="grid grid-cols-5 gap-2 mt-2">
//                         {videos.map((file, idx) => (
//                             <div key={idx} className="relative w-20 h-20">
//                                 <video
//                                     src={URL.createObjectURL(file)}
//                                     controls
//                                     className="w-full h-full object-cover rounded"
//                                 />
//                                 <button
//                                     onClick={() =>
//                                         setVideos((prev) => prev.filter((_, i) => i !== idx))
//                                     }
//                                     className="absolute top-0 right-0 bg-black/60 rounded-full p-1 hover:bg-red-600"
//                                 >
//                                     <X className="w-4 h-4 text-white" />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <Button className="bg-green-600 hover:bg-green-700 text-white w-full cursor-pointer">
//                     Submit
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default AddProductForm;


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
        <div className="max-w-4xl mx-auto">
            <Header title="Add New Product" subTitle="Fill in the product details below" />
            <div className="p-6 bg-[#0f1b0f]/60 rounded-xl shadow-lg border border-white/10 text-white space-y-6">

                <div className="space-y-1">
                    <Label>Name</Label>
                    <Input
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="bg-[#1a2a1a] text-white"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea
                        placeholder="Write a short description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-[#1a2a1a] text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Category</Label>
                        <Select onValueChange={setCategory}>
                            <SelectTrigger className="bg-[#1a2a1a] text-white">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2a1a] text-white">
                                <SelectItem value="flower">Flower</SelectItem>
                                <SelectItem value="pre-rolls">Pre-Rolls</SelectItem>
                                <SelectItem value="extracts">Extracts</SelectItem>
                                <SelectItem value="edibles">Edibles</SelectItem>
                                <SelectItem value="vapes">Vapes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Type (optional)</Label>
                        <Select onValueChange={setType}>
                            <SelectTrigger className="bg-[#1a2a1a] text-white">
                                <SelectValue placeholder="e.g. jar, packet, potla" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a2a1a] text-white">
                                <SelectItem value="jar">Jar</SelectItem>
                                <SelectItem value="packet">Packet</SelectItem>
                                <SelectItem value="potla">Potla</SelectItem>
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
                            className="bg-[#1a2a1a] text-white"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Unit</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="e.g. 1LB"
                                value={unitInput}
                                onChange={(e) => setUnitInput(e.target.value)}
                                className="bg-[#1a2a1a] text-white"
                            />
                            <Button
                                onClick={handleAddPriceUnit}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

                {priceList.length > 0 && (
                    <div className="space-y-2">
                        <Label>Price Options</Label>
                        {priceList.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-[#1a2a1a] rounded-md p-2"
                            >
                                <div className="text-sm">${item.price} / {item.unit}</div>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleDeletePriceUnit(index)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-2">
                    <Label>Upload Photos</Label>
                    <Input
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

                <div className="space-y-2">
                    <Label>Upload Videos</Label>
                    <Input
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

                <Button className="w-full bg-green-600 hover:bg-green-700">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AddProductForm;
