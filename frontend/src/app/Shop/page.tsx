"use client";

import { Button } from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    ChevronDown,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const products = [
    {
        id: 1,
        name: "La printaniere",
        price: "30 €",
        image: "/banane2.svg",
    },
    {
        id: 2,
        name: "Chouchous satines (x4)",
        price: "15 €",
        image: "/chouchous_soie.svg",
    },
    {
        id: 3,
        name: "Veste brodee motif fleuri",
        price: "80 €",
        image: "/veste_fleurie.svg",
    },
];

const filterOptions = [
    { id: 1, name: "TYPE" },
    { id: 2, name: "TAILLE" },
    { id: 3, name: "MARQUE" },
]


export default function ShopPage() {
    const router = useRouter();
    return (
        <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
            <div className="bg-[#faf2ea] overflow-hidden w-full max-w-[1440px] relative">
                <div className="flex items-center mt-20 px-12">
                    <div className="flex space-x-4">
                        {filterOptions.map((filter) => (
                            <Button
                                key={filter.id}
                                variant="outline"
                                className="w-[123px] h-10 bg-[#faf2ea] border-2 border-[#ffae9d] rounded-none [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-[#392e2c] text-[15px]"
                            >
                                {filter.name}
                            </Button>
                        ))}
                    </div>

                    <div className="ml-auto flex items-center">
                        <span className="[font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-[#392e2c] text-[15px] mr-2">
                            TRIER PAR :
                        </span>
                        <ChevronDown className="w-6 h-6" />
                    </div>
                </div>

                <div className="mt-16 px-12 grid grid-cols-3 gap-x-16 gap-y-20">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="cursor-pointer flex flex-col"
                            onClick={() => router.push("/Product")}
                        >
                            <Card className="w-[401px] rounded-none border-none shadow-none bg-transparent relative overflow-hidden">
                                <CardContent className="p-0">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt={product.name}
                                        src={product.image}
                                    />
                                </CardContent>
                            </Card>
                            <div className="mt-4 flex flex-col">
                                <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-lg">
                                    {product.name}
                                </h3>
                                <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-lg mt-2">
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination className="mt-16 flex justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink
                                className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl"
                                isActive
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl">
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl">
                                ...
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl">
                                7
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}