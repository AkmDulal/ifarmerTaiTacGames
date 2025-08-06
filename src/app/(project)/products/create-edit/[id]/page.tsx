import React from 'react';
import ProductForm from '@/components/featchers/product/ProductForm';
import { fetchProductById } from '@/lib/api/products';
import { notFound } from 'next/navigation';

export default async function ProductCreateEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  if (id === 'create-edit') {
    return (
      <div className="container mx-auto py-8">
        <ProductForm />
      </div>
    );
  }

  const productId = parseInt(id);
  if (isNaN(productId)) return notFound();

  try {
    const product = await fetchProductById(productId);
    return (
      <div className="container mx-auto py-8">
        <ProductForm productId={productId} singleProduct={product} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

