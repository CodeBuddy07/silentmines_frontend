'use client';

import Header from '@/components/dashboard/header/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import React, { useState } from 'react';

const page = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Flower' },
    { id: 2, name: 'Edibles' },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory }]);
      setNewCategory('');
    }
  };

  return (
    <div className="p-6">
      <Header title="Category" subTitle="Create and manage categories" />

      <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-lg mt-6 shadow">
        <div className="flex items-end gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="category" className="text-white mb-2 block">New Category</Label>
            <Input
              id="category"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-[#1a2a1a] border-muted/30"
            />
          </div>
          <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700 text-white">
            Add
          </Button>
        </div>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="text-white">
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Category Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id} className="text-white">
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
