// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

/* import { Card, CardContent } from "@/components/ui/card";
import { RecycleIcon } from "./lucide-react"; */
import React from "react";

export default function Home() {
  const heroData = {
    quote: '"Donner une nouvelle vie, c\'est creer un futur plus durable"',
    images: [
      { id: 1, alt: "Pexels rdne sustainable clothing" },
    ],
    imagePath: "./src/assets/heroImage.jpeg",
  };

  return (
    <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
      <div className="bg-[#faf2ea] w-full max-w-[1440px] relative">
        {/* <NavbarSection /> */}

        <section className="w-full relative">
          {heroData.images.map((image) => (
            <div key={image.id} className="relative w-full h-[545px]">
              <div className="w-full h-full bg-[#d9d9d9]" />
              <img className="absolute w-full h-[553px] top-0 left-0 object-cover"
              alt={image.alt}
              src={heroData.imagePath}
              />
              <div className="absolute w-[910px] h-[104px] top-[212px] left-1/2 -translate-x-1/2 [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-white text-[32px] text-center tracking-[0] leading-normal">
                {heroData.quote}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}


