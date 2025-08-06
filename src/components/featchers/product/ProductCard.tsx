import React from "react";
import { Product } from "@/store/features/products/types";
import Image from "next/image";
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div  className="relative ank-product-thumb h-48 md:h-[350px] w-full overflow-hidden">
        <Link href={`/products/details/${product.id}`}>
          <Image
            src={product.image || "/placeholder-product.jpg"}
            alt={product.title || "Product image"}
            fill
            className="object-cover transform transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-110 origin-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>

      <div className=" mt-[15px] ml-[10px] relative h-6 overflow-hidden">
        <h3
          className="absolute top-0 left-0 w-full text-lg text-gray-700 font-semibold mb-1 line-clamp-1 
                 transition-all duration-300 ease-[cubic-bezier(.25,.46,.45,.94)] 
                 group-hover:-translate-y-full group-hover:opacity-0"
        >
          {product.title}
        </h3>

        <Link href={`/products/details/${product.id}`}
          className="absolute top-full left-0 w-full text-lg  font-semibold mb-1 line-clamp-1 
                 opacity-0 transition-all duration-300 ease-[cubic-bezier(.25,.46,.45,.94)] 
                 group-hover:top-0 group-hover:opacity-100 text-[#f00]"
        >
          Read More
        </Link>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-600">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
