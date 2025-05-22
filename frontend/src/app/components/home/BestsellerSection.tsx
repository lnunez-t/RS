"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/ProductContext";

const bestsellers = [
  {
    id: 1,
    name: "L'intemporelle",
    image: "/banane1.svg",
    alt: "Banane intemporelle",
  },
  {
    id: 2,
    name: "La printanière",
    image: "/banane2.svg",
    alt: "Banane printanière",
  },
  {
    id: 3,
    name: 'La "bon chic, bon genre"',
    image: "/banane3.svg",
    alt: "Banane chic",
  },
];

const BestsellerSection = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { selectProduct } = useProduct();

  const handleProductClick = (product: any) => {
    selectProduct(product);
    router.push("/Product");
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12 relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#392e2c] text-center mb-12 font-playfair">
        MEILLEURES VENTES
      </h2>

      <Carousel className="relative">
        <CarouselContent className="-ml-2 flex">
          {bestsellers.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-full max-w-[220px] h-[220px] sm:h-[246px] mb-4">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover rounded-md shadow"
                      onClick={() => handleProductClick(product)}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center text-[#392e2c] font-playfair">
                    {product.name}
                  </h3>
                </CardContent>
                <CardFooter className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    className="w-[123px] h-10 rounded bg-[#faf2ea] border-[#ffae9d] text-[#392e2c] text-sm font-semibold hover:bg-[#ffae9d] hover:text-white transition-colors"
                    onClick={() => handleProductClick(product)}
                  >
                    Découvrir
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flèches gauche / droite */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ffae9d] hover:bg-[#ffae9d] hover:text-white transition">
          <ChevronLeft className="w-6 h-6 text-[#392e2c]" />
        </CarouselPrevious>

        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ffae9d] hover:bg-[#ffae9d] hover:text-white transition">
          <ChevronRight className="w-6 h-6 text-[#392e2c]" />
        </CarouselNext>
      </Carousel>

      {children && <main>{children}</main>}
    </section>
  );
};

export default BestsellerSection;
