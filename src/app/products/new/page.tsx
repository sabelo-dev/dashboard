"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewProduct(){
    const router = useRouter();
    const [product, setProduct] = React.useState({
        title:"",
        description:"",
        price:0.0,
    })
    const [loading, setLoading] = React.useState(false)
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const createProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/products", product);
            console.log(product);
            console.log(response);
            router.push("/products");
          } catch (error:any) {
            toast.error(error.message)
            console.log(error.message)
          }finally{
            setLoading(false);
          }
        }

    useEffect(()=>{
        if(product.title.length > 0 && product.description.length > 0){
          setButtonDisabled(false);
        }else{
          setButtonDisabled(true);
        }
      },[product]);

    return(
        <Layout>
            <CardHeader>
                <CardTitle className="text-2xl">{loading ? "Processing" : "New Product"}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-left w-1/2">
                <div className="grid gap-4">
                    <div className="grid gap-2 py-2">
                        <Label>Product Name</Label>
                        <Input
                            className="p-2 rounded-lg mb-4 focus:outline-none"
                            id="productname"
                            type="text"
                            value={product.title}
                            onChange={(e) => setProduct({...product, title: e.target.value})}
                            placeholder="product name"
                        />
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Description"
                            value={product.description}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                        />
                        <Label>Price</Label>
                        <Input
                            className="p-2 rounded-lg mb-4 focus:outline-none"
                            id="price"
                            type="number"
                            value={product.price}
                            onChange={(e) => setProduct({...product, price: e.target.valueAsNumber})}
                            placeholder="price"
                        />
                    </div>
                </div>
                <div className="flex items-end">
                    <Button type="submit" onSubmit={createProduct} className='border-green-600 focus:ring-0 transition duration-150 ease-in-out'>
                    {buttonDisabled ? <span className="w-full h-max rounded-md font-extrabold">All feilds are required!!!</span> : "Add"}
                    </Button>
                </div>
            </CardContent>
        </Layout>
    )
}