'use client';

import Header from '@/components/dashboard/header/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Save } from 'lucide-react';
import { useState } from 'react';

const initialCategories = [
  {
    id: 1,
    name: 'Flower',
    subcategories: [
      { id: 11, name: 'Tier 1 (EXOTIC)', unit: '', hasPrice: true, price: '' },
      { id: 12, name: 'Tier 2 (TOP SHELF)', unit: '', hasPrice: true, price: '' },
      { id: 13, name: 'Tier 3 (CHEAP)', unit: '', hasPrice: true, price: '' },
      { id: 14, name: 'Snowcaps', unit: '', hasPrice: true, price: '' },
      { id: 15, name: 'Moonrocks', unit: '', hasPrice: true, price: '' }
    ]
  },
  {
    id: 2,
    name: 'Pre-Rolls',
    subcategories: [
      { id: 21, name: '2.5g jars', unit: '', hasPrice: true, price: '' },
      { id: 22, name: 'Packwoods', unit: '', hasPrice: true, price: '' },
      { id: 23, name: 'Sluggers', unit: '', hasPrice: true, price: '' }
    ]
  },
  {
    id: 3,
    name: 'Extracts',
    subcategories: [
      { id: 31, name: 'Shatter', unit: '', hasPrice: true, price: '' },
      { id: 32, name: 'Sugar', unit: '', hasPrice: true, price: '' },
      { id: 33, name: 'Live Resin', unit: '', hasPrice: true, price: '' },
      { id: 34, name: 'Hash Rosin', unit: '', hasPrice: true, price: '' },
      { id: 35, name: 'Badder', unit: '', hasPrice: true, price: '' }
    ]
  },
  {
    id: 4,
    name: 'Edibles',
    subcategories: [
      { id: 41, name: '600mg Dosage', unit: '', hasPrice: true, price: '' },
      { id: 42, name: '500mg Dosage', unit: '', hasPrice: true, price: '' },
      { id: 43, name: 'Flavor/Type', unit: '', hasPrice: true, price: '' }
    ]
  },
  {
    id: 5,
    name: 'Vapes',
    subcategories: [
      { id: 51, name: 'Cartridges', unit: '', hasPrice: true, price: '' },
      { id: 52, name: 'Disposables', unit: '', hasPrice: true, price: '' },
      { id: 53, name: 'Live Resin Pens', unit: '', hasPrice: true, price: '' }
    ]
  },
  {
    id: 6,
    name: 'Contact',
    subcategories: [
      { id: 61, name: 'Telegram Username', unit: '', hasPrice: false, price: '' },
      { id: 62, name: 'Signal Username', unit: '', hasPrice: false, price: '' }
    ]
  }
];




const Page = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCat = {
      id: Date.now(),
      name: newCategoryName,
      subcategories: [
        { id: Date.now(), name: '', unit: '', hasPrice: true, price: '' }
      ]
    };
    setCategories([...categories, newCat]);
    setNewCategoryName('');
  };

  const handleAddSubcategory = (catId: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              {
                id: Date.now(),
                name: '',
                unit: '',
                hasPrice: true,
                price: ''
              }
            ]
          }
          : cat
      )
    );
  };

  const handleUpdateField = (
    catId: number,
    subId: number,
    field: string,
    value: any
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
            ...cat,
            subcategories: cat.subcategories.map((sub) =>
              sub.id === subId ? { ...sub, [field]: value } : sub
            )
          }
          : cat
      )
    );
  };

  const handleDeleteCategory = (catId: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== catId));
  };

  const handleDeleteSubcategory = (catId: number, subId: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
            ...cat,
            subcategories: cat.subcategories.filter((sub) => sub.id !== subId)
          }
          : cat
      )
    );
  };

  return (
    <div className="p-6">
      <Header title="Category" subTitle="Create and manage categories" />

      <div className="bg-[#0f1b0f]/60 backdrop-blur-md border border-white/10 p-6 rounded-lg mt-6 shadow">
        <div className="flex items-end gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="category" className="text-white mb-2 block">
              New Category
            </Label>
            <Input
              id="category"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-[#1a2a1a] border-muted/30 text-white"
            />
          </div>
          <Button
            onClick={handleAddCategory}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="text-white">
              <TableHead>ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id} className="text-white">
                <TableCell>{cat.id}</TableCell>
                <TableCell>
                  <Input
                    value={cat.name}
                    onChange={(e) =>
                      setCategories((prev) =>
                        prev.map((c) =>
                          c.id === cat.id ? { ...c, name: e.target.value } : c
                        )
                      )
                    }
                    className="bg-[#1a2a1a] text-white"
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {cat.subcategories.map((sub) => (
                      <div key={sub.id} className="grid grid-cols-6 gap-2">
                        <Input
                          placeholder="Subcategory Name"
                          value={sub.name}
                          onChange={(e) =>
                            handleUpdateField(cat.id, sub.id, 'name', e.target.value)
                          }
                          className="bg-[#1a2a1a] text-white col-span-2"
                        />
                        <Input
                          placeholder="Unit"
                          value={sub.unit}
                          onChange={(e) =>
                            handleUpdateField(cat.id, sub.id, 'unit', e.target.value)
                          }
                          className="bg-[#1a2a1a] text-white"
                        />
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={sub.hasPrice}
                            onCheckedChange={(val) =>
                              handleUpdateField(cat.id, sub.id, 'hasPrice', val)
                            }
                          />
                          <span className="text-sm text-white/80">Has Fixed Price</span>
                        </div>
                        {!sub.hasPrice && (
                          <Input
                            placeholder="Price"
                            type="number"
                            value={sub.price}
                            onChange={(e) =>
                              handleUpdateField(cat.id, sub.id, 'price', e.target.value)
                            }
                            className="bg-[#1a2a1a] text-white"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSubcategory(cat.id, sub.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 text-white border-white/20"
                      onClick={() => handleAddSubcategory(cat.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subcategory
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" className="text-white border-white/20 mr-2">
                    <Save className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
