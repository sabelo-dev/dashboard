"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BrandDetailsForm = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: form, // Send the form data
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      const result = await response.json();
      if (result.success) {
        onNext(formData);
      } else {
        setErrorMessage(result.message || "Failed to create account");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Brand Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2 py-2">
              <Input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Brand Name"
                required
              />
            </div>
            <div className="grid gap-2 py-2">
              <Input
                type="text"
                name="brandAddress"
                value={formData.brandAddress}
                onChange={handleChange}
                placeholder="Brand Address"
                required
              />
            </div>
            <div className="grid gap-2 py-2">
              <Input
                type="date"
                name="estDate"
                value={formData.estDate}
                onChange={handleChange}
                placeholder="Establishment Date"
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm py-2">{errorMessage}</div>
            )}
            <div className="grid gap-2 justify-between items-center space-x-4">
              <Button type="button" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandDetailsForm;
