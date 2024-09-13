"use client";

import React from "react";
import { Home, Package, ShoppingCart, Users2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const inActiveLink = "flex p-1";
  const activeLink = inActiveLink + " bg-white text-blue-900 rounded-md";

  return (
    <aside className="w-full bg-gray-800 text-white p-1 flex justify-between items-center">
        {/* Navigation Links */}
        <nav className="flex space-x-1">
            <div className={pathname === "/dashboard" ? activeLink : inActiveLink}>
              <Link href="/dashboard" className="flex items-center p-1 rounded-md">
                <Home className="mr-1" /> Home
              </Link>
            </div>
            <div className={pathname === "/orders" ? activeLink : inActiveLink}>
              <Link href="/orders" className="flex items-center p-1 rounded-md">
                <ShoppingCart className="mr-1" /> Orders
              </Link>
            </div>
            <div className={pathname === "/products" ? activeLink : inActiveLink}>
              <Link href="/products" className="flex items-center p-1 rounded-md">
                <Package className="mr-1" /> Products
              </Link>
            </div>
            <div className={pathname === "/customers" ? activeLink : inActiveLink}>
              <Link href="/customers" className="flex items-center p-1 rounded-md">
                <Users2 className="mr-1" /> Customers
              </Link>
            </div>
            <div className={pathname === "/settings" ? activeLink : inActiveLink}>
              <Link href="/settings" className="flex items-center p-1 rounded-md">
                <Settings className="mr-1" /> Settings
              </Link>
            </div>
        </nav>
    </aside>
  );
}