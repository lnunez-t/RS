"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const reviews = [
  {
    name: "Sandra",
    headline: "Super qualité !",
    rating: 4.5,
    content: "Lorem ipsum",
  },
  {
    name: "Maxime",
    headline: "Très content",
    rating: 4,
    content: "Lorem ipsum",
  },
  {
    name: "Laura",
    headline: "Livraison rapide",
    rating: 4.5,
    content: "Lorem ipsum",
  },
  {
    name: "Émilie",
    headline: "Très bon produit",
    rating: 5,
    content: "Lorem ipsum",
  },
  // Ajoute d'autres avis pour tester le défilement
];

const renderStars = (rating: number) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-[15px] h-3.5 mr-1"
          viewBox="0 0 15 14"
          fill={star <= Math.floor(rating) ? "#FFD700" : "#E0E0E0"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" />
        </svg>
      ))}
    </div>
  );
};

const FeedbackSection = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-[#392e2c] text-center mb-12 [font-family:'Playfair_Display-Bold', Helvetica]">
          VOS RETOURS
        </h2>

        {/* Section 42 produits upcyclés au-dessus des avis */}
        <div className="w-[286px] h-[286px] bg-[#faf2ea] rounded-full flex flex-col items-center justify-center mx-auto mb-22">
          <p className="text-8xl font-bold text-[#ffae9d] text-center [font-family:'Playfair_Display-Bold', Helvetica]">
            42
          </p>
          <p className="text-xl font-bold text-[#392e2c] text-center mt-2 [font-family:'Playfair_Display-Bold', Helvetica]">
            produits upcyclés
          </p>
        </div>

        {/* Carousel des avis */}
        <Carousel className="relative">
          <CarouselContent className="-ml-2 flex">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
              >
                <Card
                key={index}
                className="bg-white rounded-[15px] border-2 border-[#ffae9d] shadow-none w-40 items-center"
                >
                <CardContent className="p-5">
                    <div className="mb-4">{renderStars(review.rating)}</div>
                    <div className="flex items-center mt-6">
                    <div className="w-9 h-9 bg-[#ffae9d] rounded-[18px] flex items-center justify-center">
                        <span className="text-white text-sm">{review.name[0]}</span>
                      </div>
                    <span className="ml-2 font-bold text-sm text-[#392e2c] [font-family:'Playfair_Display-Bold', Helvetica]">
                        {review.name}
                    </span>
                    </div>

                    <p className="mt-4 font-bold text-[11px] text-[#ffae9d] [font-family:'Playfair_Display-Bold', Helvetica]">
                    {review.headline}
                    </p>

                    <p className="mt-2 font-bold text-[10px] text-[#392e2c] [font-family:'Playfair_Display-Bold', Helvetica]">
                    {review.content}
                    </p>
                </CardContent>
                </Card>

              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Flèches gauche / droite */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ffae9d] hover:bg-[#ffae9d] hover:text-white transition">
            <ChevronLeft className="w-6 h-6 text-[#392e2c]" />
        </CarouselPrevious>

            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ffae9d] hover:bg-[#ffae9d] hover:text-white transition">
            <ChevronRight className="w-6 h-6 text-[#392e2c]" />
            </CarouselNext>

        </Carousel>
      </div>

      <main>{children}</main>
    </section>
  );
};

export default FeedbackSection;



