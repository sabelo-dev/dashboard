"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AddProductButton() {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push("/products/new");
  };

  return (
    <Button size="sm" className="h-8 gap-1" onClick={handleAddProduct}>
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Product
      </span>
    </Button>
  );
}
