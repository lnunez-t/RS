import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
} from "lucide-react";
import React from "react";

const mainProduct = {
    name: 'La "bon chic, bon genre"',
    price: "60 €",
    description: "Lorem ipsum dolor sit amet. Ea possimus iure ut quas dolorum aut repellat dolores ut provident galisum in omnis iste. Sit pariatur voluptas aut dolor delectus sit dolorem quia! Qui consectetur illo aut fugiat deleniti est minima rerum et repellat beatae ut dolorem nemo qui ipsum inventore ut voluptates eius.\n\nLorem ipsum dolor sit amet. Ea possimus iure ut quas dolorum aut repellat dolores ut provident galisum in omnis iste. Sit pariatur voluptas aut dolor delectus sit dolorem quia! Qui consectetur illo aut fugiat deleniti est minima rerum et repellat beatae ut dolorem nemo qui ipsum inventore ut voluptates eius."
};

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
    return (
        <div className="bg-[#faf2ea] min-h-screen">
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 rounded-[5px] border-2 border-[#392e2c] h-7 w-7 p-0"
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
                                    className="w-[90px] h-[90px] object-cover"
                                    alt="Banane main"
                                    src="/banane3.svg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <h1 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl text-center mb-2">
                            {mainProduct.name}
                        </h1>
                        <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#ffae9d] text-xl text-center mb-4">
                            {mainProduct.price}
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
                            {mainProduct.description.split("\n\n").map((paragraph, index) => (
                                <p key={index} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
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