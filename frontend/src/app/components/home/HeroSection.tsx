import React from "react";
import {Card, CardContent} from "@/components/ui/card";

const HeroSection =  ({ children }: { children?: React.ReactNode }) => {
    return (
        <section className='w-full relative'>
        <Card className='border-0 rounded-none'>
          <CardContent className='p-0'>
            <div className='relative w-full h-[60vh] sm:h-[75vh] md:h-[90vh]'>
              <img 
                className='w-full h-full object-cover' 
                alt='sustainable fashion' 
                src='/heroImg.svg'>
              </img>
              <div className='absolute inset-0 flex items-center justify-center p-4'>
                <div className="max-w-[910px] w-full text-center text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug font-playfair">
                  &quot;Donner une nouvelle vie, c&apos;est creer un futur plus durable&quot;
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <main>{children}</main>
        </section>
    );
};

export default HeroSection;