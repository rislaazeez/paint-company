"use client"
import HeroComponent from "@/components/ui/hero";
import HeaderComponent from "@/components/ui/header";
import { useState } from "react"; // Import useState hook


export default function Home() {
  // Use the `useAuth` hook to access authentication state and methods
  const [isSignedIn, setIsSignedIn] = useState(false); 

  return (
    <div>
      <HeaderComponent isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>
      <main>
        <HeroComponent />
      </main>
    </div>
  );
}