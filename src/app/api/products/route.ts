import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const reqBody = await request.json();
        const { title, description, price, imageUrl } = reqBody;

        if (!title || !description || !price) {
            return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 });
        }

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
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to add product",
            success: false,
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest){
    try {
        await dbConnect();
        
        const products = await Product.find({});
        
        return NextResponse.json({
            message: "Products retrieved successfully",
            success: true,
            products,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to retrieve products",
            success: false,
        }, { status: 500 });
    }
}

