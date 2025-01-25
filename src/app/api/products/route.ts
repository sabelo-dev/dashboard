import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { uploadFile } from "@/lib/aws-config";
import { url } from "inspector";

let waitingClients: Array<(response: NextResponse) => void> = [];

/**
 * Notify all waiting clients when a new product is added
 * @param newProduct - The newly added product
 */
function notifyClients(newProduct: any) {
  while (waitingClients.length > 0) {
    const resolve = waitingClients.shift();
    if (resolve) {
      resolve(NextResponse.json({ newProduct }));
    }
  }
}

/**
 * Handle CORS headers for responses
 * @param response - The NextResponse object
 */

interface url{
  corsUrl: string
}

function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  return response;
}

/**
 * Convert a Blob to Buffer
 * @param blob - The Blob object
 */
async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const myBuffer = Buffer.from(await blob.arrayBuffer());
  console.log(myBuffer);
  return myBuffer;
}

/**
 * POST: Add a new product
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const imageFile = formData.get("image") as Blob | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    if (!title || !description || !price || !imageFile) {
      return NextResponse.json({ message: "All fields are required", success: false }, { status: 400 });
    }

    const imageBuffer = await blobToBuffer(imageFile);
    const result = await uploadFile(imageBuffer, "products/" + imageFile);
    const imageUrl = result.Location;

    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    // Notify waiting clients
    notifyClients(savedProduct);

    return setCorsHeaders(
      NextResponse.json({ message: "Product added successfully", success: true, savedProduct }, { status: 201 })
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return setCorsHeaders(
      NextResponse.json({ message: "Failed to add product", success: false }, { status: 500 })
    );
  }
}

/**
 * GET: Retrieve all products
 */
export async function GET(request: NextRequest) {
  // Check if this is a polling request (e.g., through query param or URL)
  const isPolling = request.nextUrl.searchParams.get("poll") === "true";

  if (isPolling) {
    // Long Polling Logic
    return new Promise<NextResponse>((resolve) => {
      waitingClients.push(resolve);

      // Timeout after 30 seconds
      const timeout = setTimeout(() => {
        resolve(
          setCorsHeaders(NextResponse.json({ message: "No new products" }, { status: 204 }))
        );

        const index = waitingClients.indexOf(resolve);
        if (index !== -1) waitingClients.splice(index, 1);
      }, 30000);

      // Cleanup logic
      const cleanup = () => clearTimeout(timeout);
      Promise.resolve().finally(cleanup);
    });
  }

  // Regular GET request to retrieve all products
  try {
    await dbConnect();
    const products = await Product.find({});
    return setCorsHeaders(NextResponse.json(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return setCorsHeaders(
      NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
    );
  }
}