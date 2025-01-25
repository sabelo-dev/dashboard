"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

interface ExtendedSelectProps extends SelectProps {
  id?: string;
}


export default function NewProduct() {
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0.0,
    image: null,
    size: "",
    color: "",
    category: "Fashion",
    model: "",
    productType: "simple",
  });

  const [newOption, setNewOption] = useState({ type: "", value: "" });
  const [loading, setLoading] = useState(false);

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Purple",
    "Pink",
    "Orange",
    "Gray",
    "Brown",
    "Teal",
  ];
  const categories = [
    { name: "Fashion", subcategories: ["Men", "Women", "Kids", "Accessories"] },
    {
      name: "Electronics",
      subcategories: ["Laptops", "Phones", "Accessories"],
    },
    { name: "Furniture", subcategories: [] },
    { name: "Beauty & Health", subcategories: [] },
    { name: "Toys & Games", subcategories: [] },
    { name: "Auto Mobiles", subcategories: [] },
  ];

  const isFormValid =
    product.title.trim() &&
    product.description.trim() &&
    product.productType &&
    product.category &&
    (product.productType === "simple" ? product.size && product.color : true);

  const handleInputChange = async (
    field: string,
    value: string | File | null
  ) => {
    if (field === "image" && value instanceof File) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", value);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          setProduct({ ...product, [field]: data });
          console.log('imageUrl',product.image)
        } else {
          console.error("File upload failed", data.error);
        }
      } catch (error) {
        console.error("Error uploading file", error);
      } finally {
        setLoading(false);
      }
    } else {
      setProduct({ ...product, [field]: value });
    }
  };

  const handleNumberChange = (field: string, value: number | null) => {
    setProduct({ ...product, [field]: value });
  };

  const createProduct = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (value) {
        formData.append(key, typeof value === "object" ? JSON.stringify(value) : value.toString());
      }
    });

    try {
      const response = await axios.post("/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      router.push("/products");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderSelect = (
    id: any,
    label: any,
    value: any,
    onChange: any,
    options: any
  ) => (
    <div id={id} className="py-2">
      <label htmlFor={id}>{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="max-h-[150px] overflow-y-auto">
          {options.map((option: any) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) createProduct();
      }}
    >
      <Card className="flex flex-col mx-auto max-w-lg my-10">
        <CardHeader>
          <CardTitle className="text-2xl">New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {renderSelect(
                "product-type",
                "Product Type",
                product.productType,
                (value: any) => handleInputChange("productType", value),
                ["simple", "variable"]
              )}
              {renderSelect(
                "product-category",
                "Category",
                product.category,
                (value: any) => handleInputChange("category", value),
                categories.map((c) => c.name)
              )}
            </div>
            <div className="py-2">
              <label htmlFor="product-title">Product Name</label>
              <Input
                id="product-title"
                type="text"
                value={product.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="py-2">
              <label htmlFor="product-description">Description</label>
              <Textarea
                id="product-description"
                value={product.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter product description"
              />
            </div>
            <div className="py-2">
              <label htmlFor="product-price">Price</label>
              <Input
                id="product-price"
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleNumberChange("price", e.target.valueAsNumber)
                }
                placeholder="Enter product price"
              />
            </div>
            <div className="py-2">
              <label htmlFor="product-image">Image</label>
              <Input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleInputChange("image", e.target.files?.[0] || null)
                }
              />
            </div>
            <div className="py-2">
              {renderSelect(
                "product-color",
                "Color",
                product.color,
                (value: any) => handleInputChange("color", value),
                colors
              )}
            </div>

            {product.category !== "Beauty & Health" &&
              ![
                "Auto Mobiles",
                "Toys & Games",
                "Electronics",
                "Furniture",
              ].includes(product.category) &&
              renderSelect(
                "product-size",
                "Size",
                product.size,
                (value: any) => handleInputChange("size", value),
                sizes
              )}
            {/*
            {product.productType === "variable" && (
              renderSelect("product-color", "Color", product.color, (value: any) => handleInputChange("color", value), colors)
            )}
            */}
            {[
              "Auto Mobiles",
              "Toys & Games",
              "Electronics",
              "Furniture",
            ].includes(product.category) && (
              <div className="py-2">
                <label htmlFor="product-model">Model</label>
                <Input
                  id="product-model"
                  type="text"
                  value={product.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Enter product model"
                />
              </div>
            )}
            <Button type="submit" disabled={!isFormValid || loading}>
              {loading ? "Processing..." : "Add Product"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
