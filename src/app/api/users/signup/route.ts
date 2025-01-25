import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    console.log("Parsing JSON data...");
    const body = await request.json();

    const { username, email, password, contactNumber, brandName, brandAddress, estDate } = body;

    if (!username || !email || !password || !contactNumber || !brandName || !brandAddress || !estDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //console.log("Hashing password...");
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //console.log("Creating new user...");
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

    //console.log("Saving user...");
    const savedUser = await newUser.save();

    //console.log("User registration successful:", savedUser);
    return NextResponse.json({
      message: "User registration successful",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
