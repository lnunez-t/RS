import React from "react";
import {Card, CardContent} from "@/components/ui/card";

const HeroSection =  ({ children }: { children?: React.ReactNode }) => {
    return (
        <section className='w-full relative'>
        <Card className='border-0 rounded-none'>
          <CardContent className='p-0'>
            <div className='relative w-full h-full'>
              <img className='w-full h-full object-cover' alt='sustainable fashion' src='/heroImg.svg'></img>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className="w-[910px] [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-[32px] text-center">
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