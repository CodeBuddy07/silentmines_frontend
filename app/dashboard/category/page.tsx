'use client';

import { useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { baseUrl } from '@/lib/useAxiosSecure';

type Subcategory = { _id: number; name: string };
type Category = {
  _id: number;
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

  const handleEditClick = (category: any) => {
    setSelected(category);
    setEditModalOpen(true);
  };

  const handleSave = () => {
    setCategories(prev =>
      prev.map(cat => (cat._id === selected._id ? selected : cat))
    );
    setEditModalOpen(false);
  };

  const confirmDelete = async () => {
    console.log("inside delete category: ", selected._id);

    try {
      // Making DELETE API call to delete the selected category
      const response = await axios.delete(`${baseUrl}/categories/${selected._id}`);

      if (response.status === 200) {
        // Successfully deleted, update the state by removing the category
        setCategories(prev => prev.filter(cat => cat._id !== selected._id));

        // Close the modal
        setDeleteModalOpen(false);
        console.log('Category deleted successfully');
      } else {
        console.error('Error deleting category:', response.status);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addSubcategory = async () => {
    if (!newSubcategoryName || !selected) return;

    try {
      // Sending POST request to add a new subcategory
      const response = await axios.post(
        `${baseUrl}/categories/${selected._id}/subcategories`,
        { name: newSubcategoryName }
      );

      if (response.status === 201) {
        // Assuming response.data.subcategory contains the new subcategory object (including _id)
        const updatedCategories = categories.map((category) => {
          if (category._id === selected._id) {
            const updatedCategory = { ...category };
            if (!updatedCategory.subcategories) {
              updatedCategory.subcategories = [];
            }
            // Push the full subcategory object to subcategories, not just the name
            updatedCategory.subcategories.push(response.data.subcategory);
            return updatedCategory;
          }
          return category;
        });

        // Update the selected category with the newly added subcategory
        setSelected({
          ...selected,
          subcategories: [...(response.data.subcategories || [])],
        });

        // Update categories state with the new subcategory
        setCategories(updatedCategories);
        setNewSubcategoryName(''); // Clear the input field after adding
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };



  // Handle deleting a subcategory
  const deleteSubcategory = async (subId: any) => {
    if (!selected || !subId) return;

    try {
      // Sending request to backend to delete the subcategory
      const response = await axios.delete(
        `${baseUrl}/categories/${selected._id}/subcategories/${subId}`
      );

      console.log('inside delete subcategory');


      if (response.status === 200) {
        // Update the categories state by removing the deleted subcategory
        const updatedCategories = categories.map((category) => {
          if (category._id === selected._id) {
            const updatedCategory = { ...category };
            updatedCategory.subcategories = updatedCategory.subcategories?.filter(sub => sub._id !== Number(subId));
            return updatedCategory;
          }
          return category;
        });

        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const response = await axios.get(`${baseUrl}/categories`);

        if (response) {
          setCategories(response.data);

          setIsCategoryLoading(false)
        } else {
          setIsCategoryLoading(false)
        }
      } catch (error) {
        setIsCategoryLoading(false);
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, [newSubcategoryName, selected]);

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
                value={selected?.description || ''}  // Safely access selected.description
                onChange={(e) => setSelected({ ...selected, description: e.target.value })}
              />
            </div>

            {/* Add Subcategory Section */}
            <div className="mt-6 space-y-4">
              {selected && (  // Ensure selected is not null
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
                      Add Subcategory
                    </Button>
                  </div>
                </div>
              )}
            </div>
  
            {/* Display existing subcategories */}
            <div className="space-y-4">
              {(selected?.subcategories || []).map((sub: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    className="bg-white/10 border cursor-not-allowed border-white/20 text-white"
                    value={sub?.name} // Display the name of the subcategory
                    readOnly
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      const updatedSubs = (selected?.subcategories || []).filter((_: any, i: number) => i !== index);
                      setSelected({ ...selected, subcategories: updatedSubs });
                      deleteSubcategory(sub._id);
                    }}
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