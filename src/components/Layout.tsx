"use client";

import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Subheader from "@/components/Subheader"; // Import the Subheader component

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header on top */}
      <Header />
      {/* Subheader */}
      {/*<Subheader />*/}
      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Page content */}
        {children}
      </div>
    </div>
  );
}