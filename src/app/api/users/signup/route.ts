import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request:NextRequest) {
    await dbConnect()

    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exist"},{status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User registration successful",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}