"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BrandDetailsForm = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState(data);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.brandEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }

      const result = await response.json();
      if (result.success) {
        onNext(formData);
      } else {
        setErrorMessage(result.message || 'Failed to send verification email');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card>
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
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                required
              />
            </div>
            <div className="grid gap-2 py-2">
              <Input
                type="text" 
                name="brandContact" 
                value={formData.brandContact} 
                onChange={handleChange} 
                placeholder="Brand Contact" 
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                required
              />
            </div>
            <div className="grid gap-2 py-2">
              <Input
                type="email" 
                name="brandEmail" 
                value={formData.brandEmail} 
                onChange={handleChange} 
                placeholder="Brand Email" 
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
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
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
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
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
                required
              />
            </div>
            <div className="grid gap-2 py-2">
              <Input
                type="file" 
                name="logo" 
                onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })} 
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none"              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm py-2">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-between items-center space-x-4">
              <Button 
                type="button"
                onClick={onPrevious} 
                className='border-green-600 focus:ring-0 transition duration-150 ease-in-out'
              >
                Previous
              </Button>
              <Button 
                type="submit"
                className='border-green-600 focus:ring-0 transition duration-150 ease-in-out'
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandDetailsForm;
