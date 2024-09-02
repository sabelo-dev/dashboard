import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0.0,
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const createProduct = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      if (product.image) {
        formData.append("image", product.image);
      }

      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      router.push("/products");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product.title && product.description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [product]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct();
      }}
    >
      <input
        type="text"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        placeholder="Product Name"
      />
      <textarea
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.valueAsNumber })}
        placeholder="Price"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProduct({ ...product, image: e.target.files?.[0] || null })}
      />
      <button type="submit" disabled={buttonDisabled}>
        {loading ? "Processing..." : "Add Product"}
      </button>
    </form>
  );
}