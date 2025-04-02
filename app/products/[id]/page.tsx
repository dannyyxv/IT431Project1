import { FC } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DeleteProductButton from "@/components/DeleteProductButton"; 
import { Product } from "@/types/product"; 

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const id = (await params).id;
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    notFound();
  }
  

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  
  try {
    const response = await fetch(`${baseUrl}/api/products/${productId}`, { next: { revalidate: 0 } });
    
    if (!response.ok) {
      notFound();
    }
    
    const product: Product = await response.json();
    
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button asChild variant="outline" className="mb-4">
                <Link href="/">← Back to Products</Link>
              </Button>
              
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="space-x-2">
                  <Button asChild variant="outline">
                    <Link href={`/products/${product.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteProductButton productId={product.id} /> 
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Product Description</h2>
              <p className="mb-4">{product.description}</p>
              
              <h2 className="text-xl font-semibold mb-2">Price</h2>
              <p>{product.price}</p> 
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
};

export default ProductPage;
