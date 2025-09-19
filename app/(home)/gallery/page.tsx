// app/gallery/page.tsx
"use client";

import LoadingScreen from '@/components/shared/LoadingScreen';
import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/productCard';
import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { Product } from '@/types';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';



interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subCategories?: SubCategory[];
}



// Dummy categories data - same as in navbar
const category = 
  {
    id: '1',
    name: 'Gallery',
    slug: 'all',
    description: 'Browse our extensive gallery of products. All out of this world.',
    subCategories: []
  };


const CategoryPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);


  const getData = async () => {
    setLoading(true);
    const res = await useAxios.get(`/products?page=${currentPage}&limit=${itemsPerPage}`);
    setProducts(res.data.data);
    setTotalPages(res.data.totalPages);
    setTotalItems(res.data.totalItems);
    setLoading(false)
  }


  useEffect(() => {
    getData();
  }, [currentPage,itemsPerPage]);




  // Reset to first page when changing filters or items per page
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    getData();
  };




  // Loading state (simulate loading)
  if (!category) {
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

  return (
    <>
      {
        loading ? (
          <LoadingScreen />
        ) : (
          <div className="min-h-screen bg-black/60 backdrop-blur-[1px]">
            {/* Rotating Quality Badge */}
            <div className="flex items-center justify-center py-20 bg-gradient-to-b from-black via-black via-75% to-transparent">
              <div
                className="relative w-48 h-48 animate-spin text-white"
                style={{ animationDuration: '10s' }}
              >
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="
                    M 100, 100
                    m -60, 0
                    a 60,60 0 1,1 130,0
                    a 60,60 0 1,1 -130,0
                  "
                    />
                  </defs>
                  <text fontSize="18" fontWeight="600" fill="white" letterSpacing="2">
                    <textPath href="#circlePath" startOffset="0">
                      ✦ HIGH QUALITY ✦ 100% REAL FLOWER ✦ HIGH QUALITY ✦
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            <div
              className="mt-8 flex flex-wrap justify-center items-center gap-4 w-full"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {["Flower", "Pre-Rolls", "Extracts", "Edibles", "Vapes", "Mushrooms"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/categories/${item == "Flower" ? "flowers" : item.toLowerCase()}`}
                  >
                    <Button
                      key={item}
                      className="border border-green-500 cursor-pointer text-green-500 hover:bg-green-500/10 hover:text-white transition-all duration-300"
                      size="lg"
                    >
                      {item}
                    </Button>
                  </Link>
                )
              )}
            </div>

            {/* Header Section */}
            <div className="bg-black/20 border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>



            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-300">
                    Total {totalItems} products
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="perPage" className="text-sm font-medium text-gray-300">
                      Show:
                    </label>
                    <select
                      id="perPage"
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value={8}>8 per page</option>
                      <option value={12}>12 per page</option>
                      <option value={24}>24 per page</option>
                      <option value={48}>48 per page</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {products.map((product: Product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      type={product.type}
                      image={product.photoUrls}
                      discount={product.discount}
                      category={product.category}
                      subcategory={product.subcategory}
                      name={product.name}
                      priceOptions={product.priceOptions}
                      dealoftheweek={product.dealoftheweek}
                      bestSeller={product.bestSeller}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No products found</h3>
                </div>
              )}

              {/* Pagination */}
              {totalPages! > 1 && products.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages|| 0}
                  onPageChange={setCurrentPage}
                />
              )}

              {/* Results Summary */}
              {products.length > 0 && (
                <div className="text-center mt-8 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-300">
                    Page {currentPage} of {totalPages} • Showing {products.length} products
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      }
    </>

  );
};

export default CategoryPage;