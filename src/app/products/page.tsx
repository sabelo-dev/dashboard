"use client";

import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout"
import axios from "axios";
import Link from "next/link"
import { useEffect } from "react"
import {
    ChevronLeft,
    ChevronRight,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
    Copy,
  } from "lucide-react";

export default function Products(){
    
    useEffect(()=>{
        axios.get('/products').then(response =>{
            console.log(response.data)  
        });
    },[])
    return(
        <Layout>
            <Link href={'/products/new'} className="w-1/6 flex items-center p-2 rounded-md hover:bg-green-600">
                <Package2 className="mr-2" /> Add Product
            </Link>
            <DataTable />
        </Layout>
    )
}