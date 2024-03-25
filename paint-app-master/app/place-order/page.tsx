
"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import HeaderComponent from "@/components/ui/header";
import { useState } from "react";
import paintsData from '@/public/paints.json';
import { AlertCircleIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
export default function PlaceOrder() {
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
        <p className="text-sm font-medium">You are not signed in. Please sign in to place an order.</p>
      </div>
      <div className="w-[200px]">
       
          <Button onClick={() => router.push('/login')} className="h-8 w-full">Sign In</Button>
        
      </div>
    </div>:<Card>
      <div className="grid grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex flex-col gap-2">
            <div className="flex h-[250px] items-center px-6">

            <CardHeader>
            <CardTitle>How to Order</CardTitle>
            <CardDescription><ul className="pl-4">
                <li>Step 1: Place Order</li>
                <li>Step 2: Get Delivery</li>
                
              </ul></CardDescription>
          </CardHeader>
              
              
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle>Bulk Order</CardTitle>
            <CardDescription>Enter the quantity of each color you want to order</CardDescription>
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
            <Button className="ml-auto">Place Order</Button>
          </CardFooter>
        </div>
      </div>
    </Card>}
        
        
        </main></div>
    
  )
}

