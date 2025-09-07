declare module "*.ttf";
// declare module 'particles.js';

interface Product {
  bestSeller: boolean;
  category: string;
  subcategory: string;
  createdAt: string;
  dealoftheweek: boolean;
  description: string;
  discount: number;
  name: string;
  photoUrls: string[];
  priceOptions: Price[];
  type: string;
  updatedAt: string;
  videoUrls: string[];
  _id: string;
}

interface Announcement {
  announcement: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  _v: string;
}


interface Subcategory {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductCategory {
  _id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface TimeSlot {
  _id: string;
  day: string;
  time: string;
  isAvailable: Boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Review {
  _id: string;
  clientName: string;
  rating: number;
  description: string;
  date: string;
  image?: string;
}


export interface Price {
  unit: string;
  price: number;
  _id: string;
}