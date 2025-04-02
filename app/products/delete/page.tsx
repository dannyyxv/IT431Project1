"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
}

async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API response error:", await res.text());
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function deleteProductById(id: number): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete product with ID: ${id}`);
  }
}

const DeleteProductPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-purple-500">
        Delete a Product
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available to delete.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-700 via-purple-500 to-gray-500"
            >
              <div>
                <h2 className="text-xl text-white">{product.title}</h2>
                <p className="text-gray-100">${product.price}</p>
              </div>
              <Button
                className="bg-gradient-to-r from-red-500 via-red-500 to-red-500 text-white hover:from-blue-600 hover:to-purple-700"
                onClick={() => handleDelete(product.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Button
          onClick={() => router.push("/products")}
          className="bg-gradient-to-r from-silver-500 via-silver-500 to-purple-500 text-white hover:from-gray-600 hover:to-gray-700"
        >
          Back to Products
        </Button>
      </div>
    </div>
  );
};

export default DeleteProductPage;
