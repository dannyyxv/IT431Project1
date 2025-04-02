import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/product"; 


const dataFilePath = path.join(process.cwd(), "data", "products.json"); 

// Helper function to read products from the JSON file
const readProducts = (): Product[] => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(jsonData) as Product[];
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
};

// Helper function to write products to the JSON file
const writeProducts = (products: Product[]) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to products file:", error);
  }
};

// GET: Retrieve a product by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params; 
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    const products = readProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      { error: "Failed to retrieve product." },
      { status: 500 }
    );
  }
}

// PUT: Update a product by ID
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params; 
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    const updatedProduct: Partial<Product> = await request.json();
    const products = readProducts();
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    products[index] = { ...products[index], ...updatedProduct, id: productId };

    writeProducts(products);

    return NextResponse.json(products[index], { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a product by ID
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params; 
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID." },
        { status: 400 }
      );
    }

    let products = readProducts();
    const initialLength = products.length;
    products = products.filter((p) => p.id !== productId);

    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    writeProducts(products);

    return NextResponse.json(
      { message: `Product with ID ${productId} deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
