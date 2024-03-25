"use client"
import React, { useState, useEffect } from 'react';
import HeaderComponent from '@/components/ui/header';

// Import the function to fetch paints data

export default function Products() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [paintsData, setPaintsData] = useState([]);

  useEffect(() => {
    fetchPaintsData();
  }, []);

  const fetchPaintsData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/paint_inventory/view_paint_inventory/`, {
        method: "GET",
        
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch paints data');
      }

      const json = await response.json();
      setPaintsData(json);
    } catch (error) {
      console.error('Error fetching paints data:', error);
    }
  };
console.log(paintsData,"akjj")
  return (
    <div>
      <HeaderComponent isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Paints Available</h2>
          <p className="mt-2 text-lg text-gray-500">Curated and Updated daily.</p>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {paintsData.map((paint) => (
              <div key={paint.pk} className="group relative">
                <div className={`w-full min-h-80 -600 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none`} style={{ backgroundColor: paint.color_name.toLowerCase() }}/>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{paint.color_name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Quantity: {paint.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
