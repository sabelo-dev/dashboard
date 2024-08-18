import dbConnect from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


export async function POST(request:NextRequest) {
    await dbConnect()

    try {
        const reqBody = await request.json()
        const {username, password} = reqBody

        const user = await User.findOne({username})
        const validPass = await bcryptjs.compare(password, user.password)

        if(!user || !validPass){
            return NextResponse.json({error: "Incorrect login details"},{status: 400})
        }

        const tokenData= {
            id: user._id,
            username: user.username,
            email: user.email   
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })

        response.cookies.set("token", token, {httpOnly:true})

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }

}