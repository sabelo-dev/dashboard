"use client";

import React, { ReactNode } from 'react';
import Nav from "@/components/Nav"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
  Copy,
} from "lucide-react";
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {  
  return (
    <div className="flex h-screen">
      <Nav />
      
      <div className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 border-b border-gray-300 pb-4">
          <div className="flex items-center space-x-4">
            <Input placeholder="Search..." className="w-64" />
            <Button>
              <Search />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Copy /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <File /> Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings /> Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
