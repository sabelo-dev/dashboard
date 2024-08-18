"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Dashboard(){
    
    const router = useRouter()
    const logout = async () =>{
        try {
            await axios.get("/api/users/logout")
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)   
        }
    }
    return(
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}