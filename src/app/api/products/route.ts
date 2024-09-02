import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { uploadFile } from "@/lib/aws-config";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);

    if (!title || !description || !price || !imageFile) {
      return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 });
    }

    // Convert file to buffer if necessary
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Upload image to S3
    const result = await uploadFile(imageBuffer, imageFile.name);
    const imageUrl = result.Location;

    // Save product with image URL in MongoDB
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json({
      message: "Product added successfully",
      success: true,
      savedProduct,
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({
      message: "Failed to add product",
      success: false,
    }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products); // Should return a 200 status with the data
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}