import { NextRequest, NextResponse } from "next/server";

// Simulated database of products (replace with actual database logic)
const products: Array<{ name: string; id: number }> = [];
const waitingClients: Array<(response: NextResponse) => void> = [];

// Function to handle new product addition
function notifyClients(newProduct: { name: string; id: number }) {
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
    waitingClients.push((response) => {
      clearTimeout(timeout); // Clear the timeout when resolving the promise
      resolve(response);
    });

    // Timeout after 30 seconds if no new product is added
    const timeout = setTimeout(() => {
      resolve(NextResponse.json({ error: "No new products" }, { status: 204 }));
    }, 30000);
  });
}

// Simulated new product addition (replace this with actual DB logic or API integration)
setInterval(() => {
  const newProduct = { name: `Product ${products.length + 1}`, id: products.length + 1 };
  products.push(newProduct);
  notifyClients(newProduct);
}, 5000); // Simulate a new product every 5 seconds
