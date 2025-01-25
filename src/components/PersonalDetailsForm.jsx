"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const PersonalDetailsForm = ({ data, onNext }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onNext(formData);
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
      <CardTitle className="text-2xl">Personal Details</CardTitle>
      <CardDescription>
        Become a member of TRIAD Corp. Enter your details below!
      </CardDescription>
      </CardHeader>
      <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2 py-2">
              <Input
                  id="username" 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  placeholder="Username" 
                  required
              />
              </div>
              <div className="grid gap-2 py-2">
              <Input 
                  id="contactNumber"
                  type="text" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  placeholder="Contact Number" 
              />
              </div>
              <div className="grid gap-2 py-2">
            <Input
                  id="email"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email" 
                  required
                />
              </div>
              <div className="grid gap-2 py-2">
            <Input 
                  id="password"
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password" 
                  required
                />
              </div>
              <div className="grid gap-2 py-2">
            <Input 
                id="confirmpassword"
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm Password" 
                required
              />
              </div>
              <Button type='submit' className='w-full border-green-600 focus:ring-0 transition duration-150 ease-in-out'>
                Next
              </Button>
            </div>
          </form>
      </CardContent>
    </Card>
    
  );
};

export default PersonalDetailsForm;
