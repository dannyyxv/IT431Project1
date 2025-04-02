import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header"; 
import ProductCard from "@/components/ProductCard"; 

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
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

const ProductsPage: FC = async () => {
  const products = await getProducts();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-purple-500">
            Daniel's Picks
          </h1>
        </div>
        <div className="flex space-x-4 mb-8">
          <Link href="/products/add">
            <Button className="bg-gradient-to-r from-blue-500 to-gray-700 hover:from-green-600 hover:to-green-800">
              Add New Product
            </Button>
          </Link>
          <Link href="/products/delete">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Delete a Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
