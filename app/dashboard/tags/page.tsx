'use client';

import { useState } from 'react';
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

const initialTags = [
    { id: 1, title: 'Flower' },
    { id: 2, title: 'Pre-Rolls' },
    { id: 3, title: 'Extracts' },
    { id: 4, title: 'Edibles' },
    { id: 5, title: 'Vapes' },
    { id: 6, title: 'Contact' },
];

export default function Page() {
    const [tags, setTags] = useState(initialTags);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    const handleEditClick = (tag: any) => {
        setSelected(tag);
        setEditModalOpen(true);
    };

    const handleSave = () => {
        setTags(prev =>
            prev.map(t => (t.id === selected.id ? selected : t))
        );
        setEditModalOpen(false);
    };

    const confirmDelete = () => {
        setTags(prev => prev.filter(t => t.id !== selected?.id));
        setDeleteModalOpen(false);
    };

    return (
        <div className="p-6">
            <Header title="Manage Tags" subTitle="Manage all tags" />

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
                                key={tag.id}
                                onClick={() => handleEditClick(tag)}
                                className="cursor-pointer hover:bg-white/5"
                            >
                                <TableCell>{tag.title}</TableCell>
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
                                value={selected?.title || ''}
                                onChange={(e) => setSelected({ ...selected, title: e.target.value })}
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
