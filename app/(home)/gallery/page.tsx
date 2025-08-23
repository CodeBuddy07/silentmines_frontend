// app/gallery/page.tsx
"use client";

import DynamicProductShowCase from '@/components/shared/DynamicProductShowCase';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

// Dummy categories data - same as in navbar
const dummyCategories = [
    {
    id: '1',
    name: 'Flowers',
    slug: 'flowers',
    description: 'Beautiful fresh flowers for all occasions',
    subCategories: [
      { id: '1-1', name: 'Tier 1 (EXOTIC)', slug: 'tier-1-(exotic)' },
      { id: '1-2', name: 'Tier 2 (TOP SHELF)', slug: 'tier-2-(top-shelf)' },
      { id: '1-3', name: 'Tier 3 (CHEAP)', slug: 'tier-3-(cheap)' },
      { id: '1-4', name: 'Snowcaps', slug: 'snowcaps' },
      { id: '1-5', name: 'Monorocks', slug: 'monorocks' }
    ]
  },
  {
    id: '2',
    name: 'Pre-Rolls',
    slug: 'pre-rolls',
    description: 'Discover our complete collection of premium products. Browse through our carefully curated items.',
    subCategories: []
  },
    {
    id: '3',
    name: 'Extracts',
    slug: 'extracts',
    description: 'Discover our complete collection of premium products. Browse through our carefully curated items.',
    subCategories: []
  },
    {
    id: '4',
    name: 'Edibles',
    slug: 'edibles',
    description: 'Discover our complete collection of premium products. Browse through our carefully curated items.',
    subCategories: []
  },
      {
    id: '5',
    name: 'Vapes',
    slug: 'vapes',
    description: 'Discover our complete collection of premium products. Browse through our carefully curated items.',
    subCategories: []
  },
];

// Helper function to get random image
const getRandomImage = () => {
  const images = ['/Product_Demo_Image.png', '/demo_product-2.png'];
  return images[Math.floor(Math.random() * images.length)];
};

// Helper function to generate random prices
const generatePrices = () => [
  { weight: "1 LB", amount: (Math.floor(Math.random() * 500) + 300).toString() },
  { weight: "2 LB", amount: (Math.floor(Math.random() * 900) + 600).toString() },
  { weight: "3 LB", amount: (Math.floor(Math.random() * 1300) + 900).toString() }
];

// Updated dummy products data
const dummyProducts = [
  // Flowers - Tier 1 (EXOTIC)
  {
    id: '1',
    name: 'Red Rose Bouquet',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'tier-1-(exotic)',
    prices: generatePrices()
  },

  // Flowers - Tier 2 (TOP SHELF)
  {
    id: '2',
    name: 'White Rose Arrangement',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'tier-2-(top-shelf)',
    prices: generatePrices()
  },

  // Flowers - Tier 3 (CHEAP)
  {
    id: '3',
    name: 'Pink Rose Bundle',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'tier-3-(cheap)',
    prices: generatePrices()
  },

  // Flowers - Snowcaps
  {
    id: '4',
    name: 'Spring Tulip Mix',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'snowcaps',
    prices: generatePrices()
  },
  {
    id: '5',
    name: 'Yellow Tulip Bouquet',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'snowcaps',
    prices: generatePrices()
  },

  // Flowers - Monorocks
  {
    id: '6',
    name: 'White Lily Arrangement',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'monorocks',
    prices: generatePrices()
  },
  {
    id: '7',
    name: 'Pink Lily Bundle',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'monorocks',
    prices: generatePrices()
  },

  // Flowers - Tier 1 (EXOTIC)
  {
    id: '8',
    name: 'Garden Mixed Bouquet',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'tier-1-(exotic)',
    prices: generatePrices()
  },
  {
    id: '9',
    name: 'Wildflower Mix',
    image: getRandomImage(),
    category: 'flowers',
    subcategory: 'tier-1-(exotic)',
    prices: generatePrices()
  },

  // Pre-Rolls
  {
    id: '10',
    name: 'Classic Bridal Bouquet',
    image: getRandomImage(),
    category: 'pre-rolls',
    prices: generatePrices()
  },
  {
    id: '11',
    name: 'Rustic Bridal Bouquet',
    image: getRandomImage(),
    category: 'pre-rolls',
    prices: generatePrices()
  },

  // Extracts
  {
    id: '12',
    name: 'Elegant Table Centerpiece',
    image: getRandomImage(),
    category: 'extracts',
    prices: generatePrices()
  },
  {
    id: '13',
    name: 'Romantic Centerpiece',
    image: getRandomImage(),
    category: 'extracts',
    prices: generatePrices()
  },

  // Edibles
  {
    id: '14',
    name: 'Peace Lily Plant',
    image: getRandomImage(),
    category: 'edibles',
    prices: generatePrices()
  },
  {
    id: '15',
    name: 'Snake Plant',
    image: getRandomImage(),
    category: 'edibles',
    prices: generatePrices()
  },

  // Vapes
  {
    id: '16',
    name: 'Succulent Garden',
    image: getRandomImage(),
    category: 'vapes',
    prices: generatePrices()
  },
  {
    id: '17',
    name: 'Mini Succulent Set',
    image: getRandomImage(),
    category: 'vapes',
    prices: generatePrices()
  },

  // Pre-Rolls
  {
    id: '18',
    name: 'Spring Flower Basket',
    image: getRandomImage(),
    category: 'pre-rolls',
    prices: generatePrices()
  },

  // Extracts
  {
    id: '19',
    name: 'Deluxe Gift Set',
    image: getRandomImage(),
    category: 'extracts',
    prices: generatePrices()
  },
  {
    id: '20',
    name: 'Classic Gift Set',
    image: getRandomImage(),
    category: 'extracts',
    prices: generatePrices()
  }
];




const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.slug as string;

  // Find category and products
  const category = useMemo(() => {
    return dummyCategoriesZ
  }, [categorySlug]);

  const products = useMemo(() => {
    return dummyProducts.filter(product => product.category === categorySlug);
  }, [categorySlug]);

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
    <DynamicProductShowCase
      products={products}
      category={category}
    />
  );
};

export default CategoryPage;