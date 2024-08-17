"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';

const VerificationForm = ({ data, onPrevious }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/register', { // Replace with your actual verification endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          verificationCode: verificationCode,
        }),
      });

      if (response.ok) {
        console.log('Verification successful');
        router.push('/dashboard'); // Redirect to dashboard upon successful verification
      } else {
        const result = await response.json();
        setError(result.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while verifying the code');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center items-center text-2xl">Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2 py-2">
              <Input 
                type="text" 
                value={verificationCode} 
                onChange={handleChange} 
                placeholder="Verification Code" 
                className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none'
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-between items-center space-x-4">
              <Button 
                type='button'
                onClick={onPrevious} 
                className='border-green-600 focus:ring-0 transition duration-150 ease-in-out'
              >
                Previous
              </Button>
              <Button 
                type="submit" 
                className='border-green-600 focus:ring-0 transition duration-150 ease-in-out'
              >
                Verify
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;