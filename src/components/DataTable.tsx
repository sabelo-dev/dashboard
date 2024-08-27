import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import Image from 'next/image';

type Product = {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;  
};

const DataTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch (error:any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Image</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                {product.imageUrl ? (
                                    <Image src={product.imageUrl} alt={product.title} style={{ width: '100px' }} />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4}>No products available</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
    
};

export default DataTable;