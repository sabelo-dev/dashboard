import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    console.log("Parsing form data...");
    const formData = await request.formData();

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const brandName = formData.get("brandName") as string;
    const brandAddress = formData.get("brandAddress") as string;
    const estDate = formData.get("estDate") as string;

    console.log("Checking if user exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    console.log("Hashing password...");
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log("Creating new user...");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      contactNumber,
      brandDetails: {
        brandName,
        brandAddress,
        estDate,
      },
    });

    console.log("Saving user...");
    const savedUser = await newUser.save();

    console.log("User registration successful:", savedUser);
    return NextResponse.json({
      message: "User registration successful",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
