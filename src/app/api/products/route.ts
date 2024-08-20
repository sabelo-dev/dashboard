import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        
        const reqBody = await request.json();
        const { title, description, price } = reqBody;

        if (!title || !description || !price) {
            return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 });
        }

        const newProduct = new Product({
            title,
            description,
            price,
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
