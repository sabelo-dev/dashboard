"use client";

import React, { ReactNode } from 'react';
import Nav from "@/components/Nav"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {  
  return (
    <div className="bg-blue-600 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-4 mr-4 rounded-lg p-4 mb-4">
        {children}
      </div>
    </div>
  );
}
