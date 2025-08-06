'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  setInitialProducts,
  setCategories,
  setSearchQuery, 
  setSelectedCategory, 
  setCurrentPage,
} from '@/store/features/products/slice';
import ProductCard from '@/components/featchers/product/ProductCard';
import SidebarFilter from '@/components/featchers/product/SidebarFilter';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/common/Pagination';
import { Product } from '@/store/features/products/types';

interface ProductsListClientProps {
  initialProducts: Product[];
  initialCategories: string[];
}

const ProductsList = ({ 
  initialProducts, 
  initialCategories 
}: ProductsListClientProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
    currentPage,
    itemsPerPage,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  // Initialize with server-side data
  useEffect(() => {
    dispatch(setInitialProducts(initialProducts));
    dispatch(setCategories(initialCategories));
  }, [dispatch, initialProducts, initialCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };



  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading && !filteredProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-gray-700 font-bold">Products</h1>
          <Button
            onClick={() => router.push('/products/create-edit')}
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Product
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full placeholder:!text-[#222] !text-[#333] !text-[20px]"
              />
            </div>
            
            {paginatedProducts.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                No products found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
          
          <div className="md:w-1/4">
            <SidebarFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;