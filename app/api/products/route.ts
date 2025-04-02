import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/product"; 

// Define the path to the JSON file for products
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

// GET: Retrieve all products
export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { error: "Failed to retrieve products." },
      { status: 500 }
    );
  }
}

// POST: Add a new product
export async function POST(request: Request) {
  try {
    const newProduct: Product = await request.json();
    const products = readProducts();

    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1; 
    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product." },
      { status: 500 }
    );
  }
}
