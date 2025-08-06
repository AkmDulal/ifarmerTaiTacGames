"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/store/features/products/types";
import { createProduct, updateProduct } from "@/lib/api/products";
import { useAppDispatch } from "@/store/hooks";
import {
  addProduct,
  updateProduct as updateReduxProduct,
} from "@/store/features/products/slice";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface ProductFormProps {
  productId?: number;
  singleProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productId,
  singleProduct,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Partial<Product>>({
    title: "",
    price: 0,
    description: "",
    image: "", // FakeStoreAPI only accepts a single image URL
    category: "", // FakeStoreAPI expects a category name string, not an object
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId) {
      const loadProduct = async () => {
        try {
          setLoading(true);
          if (singleProduct === undefined) return;
          setProduct({
            ...singleProduct,
            // Ensure we have the right structure for FakeStoreAPI
            image: singleProduct.image || "",
            category: singleProduct.category || "",
          });
        } catch (error) {
           console.log(error);
          setError("Failed to load product");
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare the product data for FakeStoreAPI
      const productData = {
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        image: product.image || "",
        category: product.category || "electronics", // Default category
      };

      if (productId) {
        const updatedProduct = await updateProduct(productId, productData);
        dispatch(updateReduxProduct(updatedProduct));
      } else {
        const newProduct = await createProduct(productData);
        dispatch(addProduct(newProduct));
      }
      router.push("/products/list");
    } catch (error) {
      console.log(error);
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && productId) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-gray-700 font-bold mb-6">
        {productId ? "Edit Product" : "Create New Product"}
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form className="product_form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Mens Clothing</option>
            <option value="women's clothing">Womens Clothing</option>
          </select>
        </div>

        <Input
          label="Title"
          name="title"
          value={product.title || ""}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={100}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          value={product.price?.toString() || "0"}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
            minLength={10}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => router.push("/products/list")}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
