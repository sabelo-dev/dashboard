"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Search } from "lucide-react";
import axios from "axios";
import Modal from "@/components/Modal"; // Custom modal component to handle pop-up forms
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Nav from "@/components/Nav"; // Import the Nav component

interface Store {
  _id: string;
  name: string;
  email: string;
  contact: string;
  logo?: string; // Optional field
}

export default function Header() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false); // To handle add store modal
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeContact, setStoreContact] = useState("");
  const [storeLogo, setStoreLogo] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null); // Replace `any` with a user type if you have one
  const router = useRouter();

  // Fetch all stores for the current user
  useEffect(() => {
    async function fetchStores() {
      try {
        const { data } = await axios.get<{ stores: Store[] }>("/api/stores");
        setStores(data.stores);
        if (data.stores.length > 0) {
          setSelectedStore(data.stores[0]); // Set first store as default
        } else {
          setSelectedStore(null);
        }
      } catch (error) {
        toast.error("Error fetching stores");
      }
    }
    fetchStores();
  }, []);

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get<{ user: any }>("/api/users/me"); // Replace `any` with a user type if you have one
        setUser(data.user);
      } catch (error) {
        toast.error("Error fetching user");
      }
    }
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handle add store form submit
  const handleAddStoreSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", storeName);
    formData.append("email", storeEmail);
    formData.append("contact", storeContact);
    formData.append("logo", storeLogo || '');

    try {
      const { data } = await axios.post<{ store: Store }>("/api/stores", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStores([...stores, data.store]); // Add new store to the list
      setSelectedStore(data.store);
      toast.success("Store added successfully");
      setIsAddStoreOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handle cancel for adding store
  const handleCancelAddStore = () => {
    setIsAddStoreOpen(false);
    setStoreName("");
    setStoreEmail("");
    setStoreContact("");
    setStoreLogo(null);
  };

  return (
    <header className="w-full bg-gray-800 text-white p-2 flex flex-col">
        <div className="flex justify-between items-center mb-1">
            
      {/* Store Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <span className="mr-2">
              {selectedStore ? selectedStore.name : "Select Store"}
            </span>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {stores.length > 0 ? (
            stores.map((store: Store) => (
              <DropdownMenuItem
                key={store._id}
                onSelect={() => setSelectedStore(store)}
              >
                {store.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No stores available</DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsAddStoreOpen(true)}>
            + Add Store
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Navigation Bar */}
      <Nav />
      {/* Search */}
      <div className="flex items-center space-x-4">
          <Input placeholder="Search..." className="w-64" />
          <Button>
            <Search />
          </Button>
        </div>
      {/* Profile Dropdown */}
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              {user && (
                <>
                  <Image
                    src={user.profileImage || "/profile-placeholder.png"}
                    alt="Profile"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <span className="mr-1">{user.username}</span>
                </>
              )}
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      {/* Add Store Modal */}
      {isAddStoreOpen && (
        <Modal onClose={handleCancelAddStore}>
          <form onSubmit={handleAddStoreSubmit} className="space-y-4">
  <h2 className="text-xl font-bold">Add New Store</h2>

  {/* Store Name */}
  <label htmlFor="storeName">Store Name</label>
  <Input
    id="storeName"
    value={storeName}
    onChange={(e) => setStoreName(e.target.value)}
    required
  />

  {/* Store Email */}
  <label htmlFor="storeEmail">Store Email</label>
  <Input
    id="storeEmail"
    value={storeEmail}
    onChange={(e) => setStoreEmail(e.target.value)}
    required
  />

  {/* Store Contact */}
  <label htmlFor="storeContact">Store Contact</label>
  <Input
    id="storeContact"
    value={storeContact}
    onChange={(e) => setStoreContact(e.target.value)}
    required
  />

  {/* Store Logo */}
  <label htmlFor="storeLogo">Store Logo</label>
  <Input
    type="file"
    id="storeLogo"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoreLogo(e.target.files ? e.target.files[0] : null)}
  />

  <div className="flex justify-end space-x-2">
    <Button type="button" onClick={handleCancelAddStore}>
      Cancel
    </Button>
    <Button type="submit">Save</Button>
  </div>
</form>
        </Modal>
      )}
    </header>
  );
}
