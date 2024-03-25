"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router'; 
import Products from "../products/page"


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/paint_inventory/api/token/', {
        username,
        password
      });
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        Router.replace(Products);
        // Redirect or handle successful login
      } else {
        console.log("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      console.log("Login failed. Please try again.");
    }
  };
  
  return (
    <div className="flex justify-center items-center" style={{ width: "100vw", height: "100vh"}}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Button className="w-full" type="submit">Sign in</Button>
            </div>
          </CardContent>
        </form>
    
        <div className="text-2l text-center grid gap-2 mb-5" >
          <Link href="/signup" >New User?</Link>
        </div>
        {error && <p>{error}</p>}
      </Card>
    </div>
  )
}