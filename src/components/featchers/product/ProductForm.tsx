"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
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

const imageOptions = [
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
  "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
  "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
  "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
  "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
  "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
  "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
  "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
  "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
];

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
    image: "",
    category: "",
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId && singleProduct) {
      setLoading(true);
      setProduct({
        ...singleProduct,
        image: singleProduct.image || "",
        category: singleProduct.category || "",
      });

      if (singleProduct.image?.startsWith("https://fakestoreapi.com")) {
        setSelectedImage(singleProduct.image);
      }
      setLoading(false);
    }
  }, [productId, singleProduct]);

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

  const handleSelectImage = (url: string) => {
    if (!url.startsWith("https://fakestoreapi.com")) return;
    setSelectedImage(url);
    setProduct((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productData = {
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        image: product.image || "",
        category: product.category || "electronics",
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

          <div className="grid grid-cols-7 gap-6 mb-3">
            {imageOptions.map((url, index) => (
              <div
                key={index}
                onClick={() => handleSelectImage(url)}
                className={`cursor-pointer border rounded-md p-1 hover:border-blue-500 ${
                  selectedImage === url
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={url}
                  alt={`Option ${index}`}
                  width={100}
                  height={100}
                  className="object-contain w-full h-24"
                />
              </div>
            ))}
          </div>

          <input
            type="text"
            name="image"
            value={selectedImage}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith("https://fakestoreapi.com")) {
                setSelectedImage(val);
                setProduct((prev) => ({ ...prev, image: val }));
              }
            }}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select an image above or paste URL"
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
