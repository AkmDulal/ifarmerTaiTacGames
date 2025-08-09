'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/store/features/products/types';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { 
  deleteProduct as deleteProductAction, 
} from '@/store/features/products/slice';
import { deleteProduct } from '@/lib/api/products';

import { useAppDispatch } from '@/store/hooks';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDelete = async (id: number) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(id);
          dispatch(deleteProductAction(id));
          router.push(`/products/list`)
        } catch (error) {
          console.log(error);
          alert('Failed to delete product');
        }
      }
    };

  return (
    <div className="rounded-lg w-full h-screen overflow-auto scrollbar-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="relative h-96 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-gray-700 uppercase">{product.category}</span>
            <h1 className="text-3xl text-gray-700 font-bold mt-1">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 ml-2">
                {product.rating?.rate} ({product.rating?.count} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl text-gray-700 font-bold">${product.price}</div>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex space-x-4 pt-4">

             <Button
            onClick={() => {
                router.push(`/products/create-edit/${product.id}`)
            }}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-sm py-1 px-3 flex-1"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product.id)}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-sm py-1 px-3 flex-1"
          >
            Delete
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;