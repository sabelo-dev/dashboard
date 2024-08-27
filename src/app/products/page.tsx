"use client";

import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout"
import axios from "axios";
import Link from "next/link"
import { useEffect } from "react"

export default function Products(){
    
    useEffect(()=>{
        axios.get('/products').then(response =>{
            console.log(response.data)  
        });
    },[])
    return(
        <Layout>
            <Link className="bg-green-600 text-white rounded-md py1 px-2"  href={'/products/new'}>Add New Product</Link>
            <DataTable />
        </Layout>
    )
}