import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product"

export async function POST(request:NextRequest) {
    await dbConnect()

    const reqBody = await request.json()
    const {title, description, price} = reqBody

    const newProduct = new Product({
        title,
        description,
        price
    })

    const savedProduct = await newProduct.save()

    return NextResponse.json({
        message: "Product added successful",
        success: true,
        savedProduct
    })
}