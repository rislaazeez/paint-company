
"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import HeaderComponent from "@/components/ui/header";
import { useState } from "react";
import paintsData from '@/public/paints.json';
import { AlertCircleIcon, CircleIcon, DollarSignIcon, PaletteIcon } from "lucide-react"
import salesData from '@/public/orders.json';
import { useRouter } from 'next/navigation'
export default function AdminDashboard() {
    const [isSignedIn, setIsSignedIn] = useState(false); 
    const router = useRouter()
    const handleSignIn = () => {
        // Update isSignedIn state to true when sign-in button is clicked
        setIsSignedIn(true);
      };
  return (
    <div>
      <HeaderComponent isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      <main>
        {!isSignedIn? <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-4">
        <AlertCircleIcon className="w-4 h-4 text-blue-500" />
        <p className="text-sm font-medium">You are not signed in. Please sign in  to view dashboard.</p>
      </div>
      <div className="w-[200px]">
       
          <Button onClick={() => router.push('/login')} className="h-8 w-full">Sign In</Button>
        
      </div>
    </div>: <><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-10 py-10">
    <CardHeader>
            <CardTitle>Recent Order</CardTitle>
            <CardDescription>View all recent orders</CardDescription>
          </CardHeader>
      {salesData.map((sale, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Invoice: {sale.inv}</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">${sale.bill}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Customer: {sale.customerName}</p>
            <div className="mt-4">
              {sale.colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded-full bg-${color.name} border`} />
                  <span className="text-sm font-medium">{color.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Quantity: {color.quantity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      

      
    </div>
    <div className="flex flex-col px-10">
                            <CardHeader>
                                <CardTitle>Refill Paint</CardTitle>
                                <CardDescription>Enter the quantity of each color you want to refill.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {paintsData.map((paint, index) => (
                                    <div key={index} className="grid gap-2 md:grid-cols-[100px_1fr_200px] lg:grid-cols-[100px_1fr_200px_200px] items-center">
                                        <div className={`h-6 w-6 rounded bg-${paint.color}`} />
                                        <div className="font-medium">{paint.name}</div>
                                        <div className="text-sm">Available: {paint['available-quantity']}</div>
                                        <div className="max-w-[200px]">
                                            <Input placeholder="Quantity" type="number" />
                                        </div>
                                    </div>
                                ))}

                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto">Refill Stock</Button>
                            </CardFooter>
                        </div>
    
    </>
    }
        
        
        </main></div>
    
  )
}

