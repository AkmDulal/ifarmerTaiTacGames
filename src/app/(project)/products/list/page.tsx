import { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api/products';
import ProductsList from '@/components/featchers/product/ProductsList';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
    
    // Safely get the first product image if available
    const firstProductImage = products.length > 0 && products[0].image 
      ? { 
          url: products[0].image,
          width: 800,
          height: 600,
          alt: products[0].title || 'Product image',
        } 
      : undefined;

    return {
      title: 'Products | FakeStore',
      description: `Browse our ${products.length} products across ${categories.length} categories`,
      keywords: ['products', 'store', 'ecommerce', ...categories],
      openGraph: {
        title: 'Products | FakeStore',
        description: `Browse our collection of ${products.length} products`,
        images: firstProductImage ? [firstProductImage] : [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Products | FakeStore',
      description: 'Browse our product collection',
      keywords: ['products', 'store', 'ecommerce'],
    };
  }
}

export default async function ProductsPage() {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);

    return (
      <ProductsList 
        initialProducts={products}
        initialCategories={categories}
      />
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load products. Please try again later.</div>
      </div>
    );
  }
}