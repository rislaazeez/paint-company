"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
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
// import  { signup } from '../../services/authService'; 

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await signup(username, password);
      if (success) {
        // Handle successful signup
        localStorage.setItem('token', success.access);
      } else {
        console.log("already exist");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ width: "100vw", height: "100vh"}}>
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle  className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to Sign Up to your account.
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Sign Up</Button>
          </CardFooter>
        </form>
        {error && <p>{error}</p>}
      </Card>
    </div>
  )
}