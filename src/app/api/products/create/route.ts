import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.formData();
    const productType = body.get("productType");
    const productCategory = body.get("category");
    const title = body.get("title");
    const description = body.get("description");
    const price = body.get("price");
    const imageUrl = body.get("image");
    let color = body.get("color");
    let size = body.get("size");
    let model = body.get("model");

    // Validate required fields
    if (!title || !price || !productCategory || !productType) {
      return NextResponse.json(
        { error: "Title, price, productType, and productCategory are required fields." },
        { status: 400 }
      );
    }

    // Adjust types for optional fields
    color = color || null;
    size = size || null;
    model = model || null;

    // Create a new product
    const newProduct = new Product({
      productType,
      productCategory,
      title,
      description,
      price,
      imageUrl,
      color,
      size,
      model,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return the newly created product
    return NextResponse.json({
      message: "Product created successfully.",
      product: savedProduct,
    });
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}