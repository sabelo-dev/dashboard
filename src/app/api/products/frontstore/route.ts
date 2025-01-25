import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const waitingClients: Array<(response: NextResponse) => void> = [];

// Notify waiting clients when a new product is added
function notifyClients(newProduct: any) {
  while (waitingClients.length > 0) {
    const resolve = waitingClients.shift();
    if (resolve) {
      resolve(NextResponse.json({ newProduct }));
    }
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return new Promise((resolve) => {
    // Add the current request to the waiting list
    waitingClients.push(resolve);

    // Timeout after 30 seconds if no new product is added
    const timeout = setTimeout(() => {
      resolve(
        NextResponse.json(
          { error: "No new products available." },
          { status: 204 }
        )
      );

      // Remove the resolve function from the waitingClients array
      const index = waitingClients.indexOf(resolve);
      if (index !== -1) waitingClients.splice(index, 1);
    }, 30000);

    // Ensure the timeout is cleared if the promise resolves
    const cleanup = () => clearTimeout(timeout);
    // Call cleanup immediately after resolving
    waitingClients[waitingClients.length - 1] = (response) => {
      cleanup();
      resolve(response);
    };
  });
}

export async function POST(request: NextRequest) {
  await dbConnect(); // Ensure the database connection

  try {
    const body = await request.json(); // Parse JSON payload

    // Extract product details
    const { title, description, price, imageUrl } = body;

    // Validate required fields
    if (!title || !price) {
      return NextResponse.json(
        { error: "Title and price are required fields." },
        { status: 400 }
      );
    }

    // Save the new product in the database
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    // Notify waiting clients
    notifyClients(savedProduct);

    return NextResponse.json({
      message: "Product created and clients notified.",
      product: savedProduct,
    });
  } catch (error: any) {
    console.error("Error creating product:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
