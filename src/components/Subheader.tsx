"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Calendar } from "lucide-react";

const Subheader: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  // Update current date and time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between mb-6 border-b border-white pb-4">
      {/* Triad Logo */}
      <div className="flex items-center space-x-4">
        <Image src="/heart.png" alt="Logo" width={25} height={25} />
        <span className="font-extrabold">TRIAD</span>
      </div>
      
      {/* Current Date and Time */}
      <div className="flex items-center space-x-2">
        <Calendar />
        <span>{currentDateTime}</span>
      </div>
    </header>
  );
};

export default Subheader;