import { Metadata, ResolvingMetadata } from 'next';
import { fetchProductById } from '@/lib/api/products';
import ProductDetails from '@/components/featchers/product/ProductDetails';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await fetchProductById(Number(id));
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${product.title} | FakeStore`,
      description: product.description,
      keywords: [product.category, product.title],
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.title,
          },
          ...previousImages,
        ],
      }
    };
  } catch {
    return {
      title: 'Product Details | FakeStore',
      description: 'View product details',
    };
  }
}


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;

}) {
  const { id } = await params; 
  const product = await fetchProductById(Number(id));

  return (
    <div className="w-full h-screen flex !scrollbar-hidden bg-gray-50 ">
      <div className="container mx-auto px-4">
        <ProductDetails product={product} />
      </div>
    </div>
  );
}



