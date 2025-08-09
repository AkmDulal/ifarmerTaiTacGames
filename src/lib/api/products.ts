import { Product } from "@/store/features/products/types";

const FAKE_STORE_API = 'https://fakestoreapi.com';

export interface ProductData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${FAKE_STORE_API}/products`, {
    next: { revalidate: 3600 } 
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${FAKE_STORE_API}/products/${id}`, {
    next: { tags: [`product-${id}`] }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${FAKE_STORE_API}/products/categories`, {
    next: { revalidate: 86400 } 
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const createProduct = async (productData: Omit<ProductData, 'id'>): Promise<Product> => {
  const response = await fetch(`${FAKE_STORE_API}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
};

export const updateProduct = async (
  id: number,
  productData: Partial<ProductData>
): Promise<Product> => {
  const response = await fetch(`${FAKE_STORE_API}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await fetch(`${FAKE_STORE_API}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return true;
};