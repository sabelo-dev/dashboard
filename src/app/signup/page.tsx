"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onSignup = async () =>{
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("signup successful", response.data);
        router.push("/login");
      } catch (error:any) {

        toast.error(error.message)
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user]);

    return(
        <Card className="flex flex-col mx-auto max-w-lg my-10">
          <div className="heart flex flex-col items-center py-6">
              <Image
                src="/heart.png"
                alt="Picture of the author"
                width={50}
                height={50}
              />
          </div>
            <CardHeader>
            <CardTitle className="text-2xl">{loading ? "Processing" : "Signup"}</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2 py-2">
                <Input
                    className="p-2 rounded-lg mb-4 focus:outline-none"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2 py-2">
                <Input
                    className="p-2 rounded-lg mb-4 focus:outline-none"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2 py-2">
                <Input
                    className="p-2 rounded-lg mb-4 focus:outline-offset-2"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2 py-2">
                <Button type='submit' onClick={onSignup} className='w-full border-green-600 focus:ring-0 transition duration-150 ease-in-out'>
                  {buttonDisabled ? <span className="w-full h-max rounded-md font-extrabold">All feilds are required!!!</span> : "Register"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="grid gap-1 py-2">
                <Link href="/login">Already have an account? <Button className="bg-amber-500 focus:ring-0 transition duration-150 ease-in-out">Login</Button></Link>
              </div>
            </div>
            </CardContent>
        </Card>
    )
}