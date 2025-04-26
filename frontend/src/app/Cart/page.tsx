"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    X,
    Minus,
    Plus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useCartContext } from "@/lib/contexts/CartContext";

const mainProduct = {
    name: 'La "bon chic, bon genre"',
    price: "60 €",
    description: "Lorem ipsum dolor sit amet. Ea possimus iure ut quas dolorum aut repellat dolores ut provident galisum in omnis iste. Sit pariatur voluptas aut dolor delectus sit dolorem quia! Qui consectetur illo aut fugiat deleniti est minima rerum et repellat beatae ut dolorem nemo qui ipsum inventore ut voluptates eius.\n\nLorem ipsum dolor sit amet. Ea possimus iure ut quas dolorum aut repellat dolores ut provident galisum in omnis iste. Sit pariatur voluptas aut dolor delectus sit dolorem quia! Qui consectetur illo aut fugiat deleniti est minima rerum et repellat beatae ut dolorem nemo qui ipsum inventore ut voluptates eius.",
    size: "Taille unique",
};

export default function CartPage() {
    const { cartItems } = useCartContext();
    return (
        <Card className="md:w-1/3 bg-white border border-black md:ml-8 mt-8 md:mt-0">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl mr-2">
                            Panier
                        </h2>
                        <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-sm">
                            (1 produit(s))
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <X className="h-6 w-6 text-[#392e2c]" />
                    </Button>
                </div>

                <div className="flex mb-6">
                    <img
                        className="w-[100px] h-[100px] object-cover mr-4"
                        alt="Banane"
                        src="/banane3.svg"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                                {mainProduct.name}
                            </h3>
                            <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                            {mainProduct.price}
                            </span>
                        </div>
                        <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs mt-2">
                            Taille : taille unique
                        </p>
                        <div className="flex items-center mt-4">
                            <div className="flex items-center border border-[#ffae9d] rounded-[20px] h-[22px] w-[55px] mr-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 ml-2"
                                >
                                    <Minus className="h-2 w-2 text-[#392e2c]" />
                                </Button>
                                <span className="flex-1 text-center [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs">
                                    1
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 mr-2"
                                >
                                    <Minus className="h-2 w-2 text-[#392e2c]" />
                                </Button>
                            </div>
                            <Button
                                variant="link"
                                className="p-0 h-auto [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs underline"
                            >
                                Retirer
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>

            <Separator className="mx-auto w-[95%]" />

            <CardFooter className="flex flex-col p-6">
                <Button className="w-full bg-[#392e2c] rounded-[20px] h-10 [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-white text-base mb-2">
                    Payer - EUR 60 €
                </Button>
                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px] text-center">
                    Taxes et frais de livraison calcules lors du paiement
                </p>
            </CardFooter>
        </Card>
    );
}