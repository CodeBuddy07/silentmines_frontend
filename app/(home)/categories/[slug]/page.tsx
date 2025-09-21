// app/categories/[slug]/page.tsx
"use client";

import DynamicProductShowCase from '@/components/shared/DynamicProductShowCase';
import LoadingScreen from '@/components/shared/LoadingScreen';
import useAxios from '@/hooks/useAxios';
import { Product, ProductCategory } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';




const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const getCategories = async () => {
    const res = await useAxios.get(`/categories`);
    setCategories(res.data);
    setLoading(false);
  }

  const category = useMemo(() => {
    return categories?.find(cat => cat.name === categorySlug) || null;
  }, [categories, categorySlug]); 


  const getData = async () => {
    const res = await useAxios.get(`/products/category/${categorySlug}?page=${currentPage}&limit=${itemsPerPage}&subcategory=${activeSubCategory? activeSubCategory : ''}`);
    setProducts(res.data.data);
    setTotalPages(res.data.totalPages);
    setTotalItems(res.data.totalItems);
  }


  useEffect(() => {
    getData();
    getCategories();
  }, [currentPage, itemsPerPage, activeSubCategory]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    console.log('sdsd',newItemsPerPage);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    getData();
  };

  // console.log(products.filter((p)=> {p.subcategory.replaceAll(' ', '_').toLowerCase() == activeSubCategory?.replaceAll(' ', '_').toLowerCase();}));
  // console.log(products.filter((p)=> {p.subcategory === activeSubCategory; console.log('frontend',activeSubCategory);}));

  // Loading state (simulate loading)
  if (!loading && !category) {
    return (
      <div className="min-h-screen bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">Category not found</h3>
          <p className="text-gray-400 mb-6">The requested category could not be found.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen/>
  }
  

  return (
    <DynamicProductShowCase

      activeSubCategory={activeSubCategory}
      setActiveSubCategory={setActiveSubCategory}
      products={products}
      category={category!}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      handleItemsPerPageChange={handleItemsPerPageChange}
      totalPages={totalPages}
      totalItems={totalItems}
      setCurrentPage={setCurrentPage}

    />
  );
};

export default CategoryPage;