"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import {
    Home,
    Package,
    Settings,
    ShoppingCart,
    Users2,
  } from "lucide-react";
  


export default function Nav() {
    const router = useRouter();
    const pathname = usePathname();
    const logout = async () =>{
        try {
            await axios.get("/api/users/logout")
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)   
        }
    }

    const inActiveLink = 'flex gap-2 p-1';
    const activeLink = inActiveLink+' bg-white text-blue-900 rounded-md';

    return(
        <aside className="w-1/6 bg-gray-800 text-white p-6 flex flex-col">
            <div className="mb-8">
            <Link href={''} className="flex gap-1 mb-4">
                <div className="heart flex flex-col items-center">
                    <Image
                        src="/heart.png"
                        alt="Picture of the author"
                        width={25}
                        height={25}
                    />
                </div>
                <span className="font-extrabold pt-1">TRIAD</span>
            </Link>
            </div>
            <nav className="flex flex-col space-y-2">
                <div className={pathname === '/dashboard' ? activeLink : inActiveLink}>
                    <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                      <Home className="mr-2" /> Home
                    </Link>
                </div>
                <div  className={pathname === '/orders' ? activeLink : inActiveLink}>
                    <Link href="/orders" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                        <ShoppingCart className="mr-2" /> Orders
                    </Link>
                </div>
                <div className={pathname === '/products' ? activeLink : inActiveLink}>
                    <Link href="/products" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                      <Package className="mr-2" /> Products
                    </Link>
                </div>
                <div className={pathname === '/customers' ? activeLink : inActiveLink}>
                    <Link href="/customers" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                        <Users2 className="mr-2" /> Customers
                    </Link>
                </div>
                <div className={pathname === '/settings' ? activeLink : inActiveLink}>
                <Link href="/settings" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <Settings className="mr-2" /> Settings
              </Link>
                </div>
            </nav>
        </aside>     
    )
}