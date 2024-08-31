import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import multer from 'multer';
import nextConnect from 'next-connect';
import { uploadFile } from "@/lib/aws-config";

const upload = multer();

const handler = nextConnect()
  .use(upload.single('image')) // Handle single image upload
  .post(async (req: any, res: any) => {
    try {
      await dbConnect();
      
      // Upload image to S3
      const result = await uploadFile(req.file);

      // Save product with image URL in MongoDB
      const { title, description, price } = req.body;

      if (!title || !description || !price) {
        return res.status(400).json({ message: "All fields are required", success: false });
      }

      const newProduct = new Product({
        title,
        description,
        price,
        imageUrl: result.Location,
      });

      const savedProduct = await newProduct.save();

      return res.status(201).json({
        message: "Product added successfully",
        success: true,
        savedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to add product",
        success: false,
      });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;