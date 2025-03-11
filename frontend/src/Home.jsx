// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

/* import { Card, CardContent } from "@/components/ui/card";
import { RecycleIcon } from "./lucide-react"; */
import React from "react";
import NavbarSection from './NavbarSection.jsx'

export default function Home() {
  const heroData = {
    quote: '"Donner une nouvelle vie, c\'est creer un futur plus durable"',
    images: [
      { src: "./src/assets/heroImage.jpeg", alt: "Pexels rdne sustainable clothing" },
    ],
  };

  return (
    <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
      <div className="bg-[#faf2ea] w-full max-w-[1440px] relative">
        <NavbarSection />

        <section className="relative w-full h-[545px] flex items-center justify-center overflow-hidden">
          {heroData.images.map((image, index) => (
            <div key={index} className="relative w-full h-full">
                
                  <img className="w-full h-full object-cover"
                  alt={image.alt}
                  src={image.src}
                  />
                
              </div>
              ))}
              <div className="absolute w-[910px] h-[104px] top-[212px] left-1/2 -translate-x-1/2 [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-white text-[32px] text-center tracking-[0] leading-normal">
                {heroData.quote}
              </div>
            
          
        </section>

      </div>
    </div>
  );
}


