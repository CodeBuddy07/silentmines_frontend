'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/dashboard/header/header';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import DeleteProductModal from '@/components/dashboard/deleteProductModal/deleteProductModal';
import axios from 'axios';
import { baseUrl } from '@/lib/useAxiosSecure';

export default function Page() {
    const [tags, setTags] = useState<any[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    // Fetch tags from the backend when the component mounts
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${baseUrl}/types`);
                setTags(response.data); // Assuming response contains an array of tags
            
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchTags();
    }, []);

    // Handle edit button click to open the edit modal
    const handleEditClick = (tag: any) => {
        setSelected(tag);
        setEditModalOpen(true);
    };

    // Handle saving the edited tag
    const handleSave = async () => {
        if (!selected) return;

        try {
            const response = await axios.put(
                `${baseUrl}/types/${selected.id}`,
                { title: selected.title }
            );

            if (response.status === 200) {
                setTags(prev => prev.map(tag => (tag.id === selected.id ? selected : tag)));
                setEditModalOpen(false);
            }
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    // Handle confirm delete
    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/types/${selected?._id}`);
            if (response.status === 200) {
                setTags(prev => prev.filter(tag => tag._id !== selected?._id));
                setDeleteModalOpen(false);
            }    
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    return (
        <div className="p-6">
            <Header title="Manage Types" subTitle="Manage all types" />

            <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mt-6 shadow space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-right text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tags.map((tag) => (
                            <TableRow
                                key={tag._id}
                                onClick={() => handleEditClick(tag)}
                                className="cursor-pointer hover:bg-white/5"
                            >
                                <TableCell>{tag.name}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelected(tag);
                                            setDeleteModalOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ✅ Edit Modal */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="bg-black text-white border border-white/10 z-50 fixed">
                    <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                className="mt-1 bg-white/10 border border-white/20 text-white"
                                value={selected?.name || ''}
                                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ✅ Delete Modal */}
            <DeleteProductModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                productName={selected?.title}
            />
        </div>
    );
}
