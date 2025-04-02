import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product"; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.price && !isNaN(Number(product.price)) ? Number(product.price).toFixed(2) : "N/A";

  return (
    <Card className="h-full flex flex-col bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 text-2xl font-bold">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {product.image && product.image.trim() !== "" && (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain rounded-lg mb-4"
          />
        )}
        <p className="text-black">{product.description}</p>
        <p className="mt-4 text-2xl font-bold text-center text-green-800">
          ${price}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}/edit`} className="w-full">
          <Button className="bg-gradient-to-r from-red-500 to-purple-700 hover:from-blue-600 hover:to-blue-800 w-full">
            Edit Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
