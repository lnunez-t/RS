"use client";

import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {ChevronLeft, ChevronRight} from "lucide-react";
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
        name: "La printaniere",
        image: "/banane2.svg",
        alt: "Banane printaniere",
    },
    {
        id: 3,
        name: 'La "bon chic, bon genre"',
        image: "/banane3.svg",
        alt: "Banane chic",
    }
];

const BestsellerSection =  ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();
    const { selectProduct } = useProduct(); 

    const handleProductClick = (product: any) => {
        selectProduct(product);  // Met à jour le produit sélectionné dans le contexte
        router.push("/Product");  // Navigue vers la page du produit
    };
    return (
        <section className="w-full max-w-[1213px] mx-auto py-12 relative">
            <h2 className="text-2xl font-bold text-[#392e2c] text-center mb-12 [font-family:'Playfair_Display-Bold', Helvetica]">
                MEILLEURES VENTES
            </h2>

            <Carousel className="w-full">
                <CarouselContent>
                    {bestsellers.map((product) => (
                        <CarouselItem key={product.id} className="md:basis-1/3">
                            <Card className="border-none shadow-none bg-transparent">
                                <CardContent className="p-0 flex flex-col items-center">
                                    <div className="w-[246px] h-[246px] mb-4">
                                        <img
                                        src={product.image}
                                        alt={product.alt}
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="w-[246px] h-[43px] [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl text-center">
                                        {product.name}
                                    </h3>
                                </CardContent>
                                <CardFooter className="flex justify-center pt-0">
                                    <Button 
                                        variant="outline" 
                                        className="cursor-pointer w-[123px] h-10 rounded-[4px] bg-[#faf2ea] border-[#ffae9d] [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-[#392e2c] text-[15px] hover:bg-[#ffae9d] hover:text-white transition-colors"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        Decouvrir
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <Button
                    variant="ghost"
                    className="cursor-pointer absolute left-0 top-[150px] -translate-y-1/2 p-2 border border-[#ffae9d]"
                    aria-label="Previous products"
                >
                    <ChevronLeft className="h-8 w-8 text-[#392e2c]" />
                </Button>

                <Button
                    variant="ghost"
                    className="cursor-pointer absolute right-0 top-[150px] -translate-y-1/2 p-2 border border-[#ffae9d]"
                    aria-label="Next products"
                >
                    <ChevronRight className="h-8 w-8 text-[#392e2c]" />
                </Button>
            </Carousel>

            <main>{children}</main>
        </section>
    );
}

export default BestsellerSection;