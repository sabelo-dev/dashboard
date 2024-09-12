// lib/dataService.ts
import User from '@/models/User';
import Order from '@/models/Order';
import Product from '@/models/Product'; 
import Sale from '@/models/Sale'; 
import dbConnect from './mongodb';

// Function to get sales data
export async function getSalesData() {
  await dbConnect();
  try {
    const totalSales = await Sale.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$amount" } } },
    ]);

    return {
      totalSales: totalSales[0]?.totalSales || 0,
    };
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw new Error('Unable to fetch sales data');
  }
}

// Function to get order data
export async function getOrderData() {
  await dbConnect();
  try {
    const totalOrders = await Order.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10); // Adjust the query as needed

    return {
      totalOrders,
      recentOrders,
    };
  } catch (error) {
    console.error('Error fetching order data:', error);
    throw new Error('Unable to fetch order data');
  }
}

// Function to get customer data
export async function getCustomerData() {
  await dbConnect();
  try {
    const totalCustomers = await User.countDocuments();
    // You can add more complex customer queries if needed

    return {
      totalCustomers,
    };
  } catch (error) {
    console.error('Error fetching customer data:', error);
    throw new Error('Unable to fetch customer data');
  }
}

// Function to get inventory data
export async function getInventoryData() {
  await dbConnect();
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }); // Adjust stock threshold as needed

    return {
      totalProducts,
      lowStockProducts,
    };
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    throw new Error('Unable to fetch inventory data');
  }
}
