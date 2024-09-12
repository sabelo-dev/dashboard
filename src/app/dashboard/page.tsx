// app/dashboard/page.tsx
import Image from "next/image";
import Link from "next/link";
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">TRAID Admin</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-700">
            <Home className="mr-2" /> Home
          </Link>
          <Link href="/orders" className="flex items-center p-2 rounded-md hover:bg-gray-700">
            <ShoppingCart className="mr-2" /> Orders
          </Link>
          <Link href="/products" className="flex items-center p-2 rounded-md hover:bg-gray-700">
            <Package className="mr-2" /> Products
          </Link>
          <Link href="/customers" className="flex items-center p-2 rounded-md hover:bg-gray-700">
            <Users2 className="mr-2" /> Customers
          </Link>
          <Link href="/settings" className="flex items-center p-2 rounded-md hover:bg-gray-700">
            <Settings className="mr-2" /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
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

        {/* Main Content */}
        <main>
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="w-full h-40" />
                <CardDescription>$12,345</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>1,234</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>567</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>89</CardDescription>
              </CardContent>
              <CardFooter>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Orders Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add rows dynamically here */}
              <TableRow>
                <TableCell>ORD12345</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>$123.45</TableCell>
                <TableCell>2024-09-10</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Pagination */}
          {/*
            <Pagination>
            <PaginationContent>
              <PaginationItem>1</PaginationItem>
              <PaginationItem>2</PaginationItem>
              <PaginationItem>3</PaginationItem>
            </PaginationContent>
          </Pagination>
          */}
          
        </main>
      </div>
    </div>
  );
}