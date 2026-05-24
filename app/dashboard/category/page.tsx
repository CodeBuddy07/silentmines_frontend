'use client';

import { useCallback, useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import axiosSecure from '@/lib/useAxiosSecure';


type Subcategory = { _id: string; name: string };
type Category = {
  _id: string;
  name: string;
  description: string;
  subcategories?: Subcategory[];
};

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axiosSecure.get(`/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsCategoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEditClick = (category: any) => {
    setSelected(category);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;

    try {
      const response = await axiosSecure.patch(`/categories/${selected._id}`, {
        name: selected.name,
        description: selected.description,
      });

      if (response.status === 200) {
        setCategories(prev =>
          prev.map(cat => (cat._id === selected._id ? { ...cat, name: selected.name, description: selected.description } : cat))
        );
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosSecure.delete(`/categories/${selected._id}`);

      if (response.status === 200) {
        setCategories(prev => prev.filter(cat => cat._id !== selected._id));
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addSubcategory = async () => {
    if (!newSubcategoryName || !selected) return;

    try {
      const response = await axiosSecure.post(
        `/categories/${selected._id}/subcategories`,
        { name: newSubcategoryName }
      );

      if (response.status === 201) {
        const freshSubcategories = response.data.subcategories || [];
        setSelected((prev: any) => ({ ...prev, subcategories: freshSubcategories }));
        setCategories(prev =>
          prev.map(cat =>
            cat._id === selected._id ? { ...cat, subcategories: freshSubcategories } : cat
          )
        );
        setNewSubcategoryName('');
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const deleteSubcategory = async (subId: string) => {
    if (!selected || !subId) return;

    try {
      const response = await axiosSecure.delete(
        `/categories/${selected._id}/subcategories/${subId}`
      );

      if (response.status === 200) {
        const updatedSubs = (selected.subcategories || []).filter((sub: any) => String(sub._id) !== String(subId));
        setSelected((prev: any) => ({ ...prev, subcategories: updatedSubs }));
        setCategories(prev =>
          prev.map(cat =>
            cat._id === selected._id ? { ...cat, subcategories: updatedSubs } : cat
          )
        );
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div className="p-6">
      <Header title="Manage Category" subTitle="Manage all categories" />

      <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-xl mt-6 shadow-lg space-y-4">
        <Table className="w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-white text-sm">Name</TableHead>
              <TableHead className="text-white text-sm">Description</TableHead>
              <TableHead className="text-white text-sm">Subcategories</TableHead>
              <TableHead className="text-right text-white text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length ? (
              categories.map((category) => (
                <TableRow
                  key={category._id}
                  onClick={() => handleEditClick(category)}
                  className="cursor-pointer hover:bg-white/5 transition-all ease-in-out duration-200"
                >
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {category.subcategories && category.subcategories.length > 0
                      ? category.subcategories.map((sub) => sub?.name).join(', ')
                      : <span className="text-gray-400">—</span>}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(category);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white py-4">
                  No categories available
                </TableCell>
              </TableRow>
            )}

            {isCategoryLoading && (
              <TableRow>
                <TableCell colSpan={4} className="p-4">
                  <Skeleton className="h-[40px] w-full rounded-lg bg-[#363535]" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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

            {/* Add Subcategory Section */}
            <div className="mt-6 space-y-4">
              {selected && (
                <div>
                  <Label>Add Subcategory to {selected.name}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      placeholder="Subcategory Name"
                      className="bg-white/10 text-white"
                    />
                    <Button onClick={addSubcategory} className="bg-green-600 hover:bg-green-700">
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Display existing subcategories */}
            <div className="space-y-2">
              {(selected?.subcategories || []).map((sub: any) => (
                <div key={sub._id} className="flex items-center gap-2">
                  <Input
                    className="bg-white/10 border cursor-not-allowed border-white/20 text-white"
                    value={sub?.name}
                    readOnly
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteSubcategory(sub._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
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

      <DeleteProductModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={selected?.name}
      />
    </div>
  );
}
