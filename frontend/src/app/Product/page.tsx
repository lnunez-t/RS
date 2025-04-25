"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/ProductContext";

const relatedProducts = [
    {
        id: 1,
        name: "La printaniere",
        price: "60 €",
        image: "/banane2.svg",
    },
    {
        id: 2,
        name: "L'intemporelle",
        price: "60 €",
        image: "/banane1.svg",
    },
    {
        id: 3,
        name: "La rock'n roll",
        price: "60 €",
        image: "/banane_rock.svg",
    },
    {
        id: 4,
        name: "La swaggy",
        price: "60 €",
        image: "/bananes.svg",
    }
];

export default function ProductPage() {
    const { selectProduct, selectedProduct } = useProduct();
    const router = useRouter();
     
    const handleProductClick = (product: any) => {
        selectProduct(product);  // Met à jour le produit sélectionné dans le contexte
        router.push("/Product");  // Navigue vers la page du produit
    };

    if (!selectedProduct) return <div>Produit non trouvé</div>;

    return (
        <div className="bg-[#faf2ea] min-h-screen">
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer flex items-center gap-2 rounded-[5px] border-2 border-[#392e2c] h-7 w-7 p-0"
                    >
                        <ArrowLeft className="h-5 w-5 text-[#392e2c]" />
                    </Button>
                    <span className="ml-2 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[11px]">
                        Revenir en arriere
                    </span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    <div className="flex flex-col md:w-1/2">
                        <div className="flex gap-4 mb-4">
                            <div className="flex flex-col gap-4">
                                <img
                                    className="w-[350px] h-[350px] object-cover ml-12"
                                    alt={selectedProduct.name}
                                    src={selectedProduct.image}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <h1 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl text-center mb-2">
                            {selectedProduct.name}
                        </h1>
                        <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#ffae9d] text-xl text-center mb-4">
                            {selectedProduct.price}
                        </p>

                        <div className="text-center mb-6">
                            <Button
                                variant="link"
                                className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs underline"
                            >
                                Description du produit
                            </Button>
                        </div>

                        <div className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[10px] text-justify mb-8">
                            <p>{selectedProduct.description}</p>
                        </div>

                        <div className="mb-6">
                            <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs mb-2">
                                Choisis ta taille :
                            </p>
                            <Button
                                variant="outline"
                                className="h-[25px] rounded-[20px] border border-[#ffae9d] bg-[#faf2ea] [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-[#392e2c] text-[10px]"
                            >
                                Taille unique
                            </Button>
                        </div>

                        <div className="mb-6">
                            <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[392e2c] text-xs mb-2">
                                Quantite
                            </p>
                            <div className="flex items-center w-[55px] h-[22px] rounded-[20px] border border-[#ffae9d]">
                                <Button variant="ghost" className="h-4 w-4 p-0">
                                    <Minus className="h-2 w-2" />
                                </Button>
                                <span className="flex-1 text-center [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs">
                                    1
                                </span>
                                <Button variant="ghost" className="h-4 w-4 p-0">
                                    <Plus className="h-2 w-2" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button className="w-[99px] h-[25px] rounded-[20px] bg-[#ffae9d] border border-[#ccaea4] shadow-[0px_0px_4px_2px_#b39188] [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-white text-[10px]">
                                Ajouter au panier
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl text-center mb-8">
                        Vous aimerez peut-etre ...
                    </h2>

                    <div className="relative">
                        <div className="flex justify-center gap-4">
                            {relatedProducts.map((product) => (
                                <div
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="cursor-pointer w-full"
                                >
                                    <Card
                                        key={product.id}
                                        className="w-[200px] bg-transparent border-none"
                                    >
                                        <CardContent className="p-0">
                                            <img
                                                className="w-[200px] h-[200px] object-cover"
                                                alt={product.name}
                                                src={product.image}
                                            />
                                        </CardContent>
                                        <CardFooter className="flex flex-col items-center p-0 pt-2">
                                            <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-sm text-center">
                                                {product.name}
                                            </h3>
                                            <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-sm">
                                                {product.price}
                                            </p>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
                            aria-label="Previous products"
                        >
                            <ChevronLeft className="h-8 w-8 text-[#392e2c]" />
                        </Button>

                        <Button
                            variant="ghost"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                            aria-label="Next products"
                        >
                            <ChevronRight className="h-8 w-8 text-[#392e2c]" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}