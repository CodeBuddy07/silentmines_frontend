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


const initialCategories = [
  { id: 1, name: 'Flower', description: 'Test description for category 1' },
  { id: 2, name: 'Pre-Rolls', description: 'Test description for category 2' },
  { id: 3, name: 'Extracts', description: 'Test description for category 3' },
  { id: 4, name: 'Edibles', description: 'Test description for category 4' },
  { id: 5, name: 'Vapes', description: 'Test description for category 5' },
  { id: 6, name: 'Contact', description: 'Test description for category 6' },
];

export default function Page() {
  const [categories, setCategories] = useState(initialCategories);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleEditClick = (category: any) => {
    setSelected(category);
    setEditModalOpen(true);
  };

  const handleSave = () => {
    setCategories(prev =>
      prev.map(cat => (cat.id === selected.id ? selected : cat))
    );
    setEditModalOpen(false);
  };

  const confirmDelete = () => {
    setCategories(prev => prev.filter(cat => cat.id !== selected?.id));
    setDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <Header title="Manage Category" subTitle="Manage all categories" />

      <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mt-6 shadow space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-white">Name</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                onClick={() => handleEditClick(category)}
                className="cursor-pointer hover:bg-white/5"
              >
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent modal trigger on row click
                      setSelected(category);
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
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                className="mt-1 bg-white/10 border border-white/20 text-white"
                value={selected?.name || ''}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                className="mt-1 bg-white/10 border border-white/20 text-white"
                value={selected?.description || ''}
                onChange={(e) => setSelected({ ...selected, description: e.target.value })}
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

      {/* ✅ Delete Modal (your component) */}
      <DeleteProductModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={selected?.name}
      />
    </div>
  );
}
