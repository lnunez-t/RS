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
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/ProductContext";
import { useCartContext } from "@/lib/contexts/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    const { addToCart } = useCartContext();
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        if (selectedProduct) {
            selectProduct({ ...selectedProduct, quantity });
        }
    }, [quantity]);

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity,
                image: selectedProduct.image,
            });
            alert("Produit ajouté au panier");
        }
    };

    const handleProductClick = (product: any) => {
        selectProduct(product);
        router.push("/Product");
    };

    if (!selectedProduct) return <div>Produit non trouvé</div>;

    return (
        <div className="bg-[#faf2ea] min-h-screen">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* RETOUR */}
                <div className="flex items-center mb-8">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 rounded-[5px] border-2 border-[#392e2c] h-7 w-7 p-0"
                    >
                        <ArrowLeft className="h-5 w-5 text-[#392e2c]" />
                    </Button>
                    <span className="ml-2 font-bold text-[#392e2c] text-xs">
                        Revenir en arrière
                    </span>
                </div>

                {/* PRODUIT */}
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    {/* Image */}
                    <div className="flex justify-center md:w-1/2">
                        <img
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover"
                            alt={selectedProduct.name}
                            src={selectedProduct.image}
                        />
                    </div>

                    {/* Infos */}
                    <div className="md:w-1/2">
                        <h1 className="font-bold text-[#392e2c] text-2xl mb-2">
                            {selectedProduct.name}
                        </h1>
                        <p className="font-bold text-[#ffae9d] text-xl mb-4">
                            {selectedProduct.price}
                        </p>

                        <div className="text-center mb-6 font-bold text-[#392e2c] text-xs underline">
                            Description du produit
                        </div>

                        <div className="text-justify mb-8 text-sm text-[#392e2c]">
                            <p>{selectedProduct.description}</p>
                        </div>

                        {/* Taille */}
                        <div className="mb-6">
                            <p className="font-bold text-[#392e2c] text-xs mb-2">Choisis ta taille :</p>
                            <Button
                                variant="outline"
                                className="h-7 rounded-full border border-[#ffae9d] bg-[#faf2ea] font-semibold text-[#392e2c] text-xs px-4"
                            >
                                Taille unique
                            </Button>
                        </div>

                        {/* Quantité */}
                        <div className="mb-6">
                            <p className="font-bold text-[#392e2c] text-xs mb-2">Quantité</p>
                            <div className="flex items-center w-[70px] h-[30px] rounded-full border border-[#ffae9d]">
                                <Button variant="ghost" className="h-6 w-6 p-0" onClick={decreaseQuantity}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="flex-1 text-center font-bold text-[#392e2c] text-sm">
                                    {quantity}
                                </span>
                                <Button variant="ghost" className="h-6 w-6 p-0" onClick={increaseQuantity}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={handleAddToCart}
                                className="w-[140px] h-[35px] rounded-full bg-[#ffae9d] border border-[#ccaea4] shadow-md font-semibold text-white text-sm"
                            >
                                Ajouter au panier
                            </Button>
                        </div>
                    </div>
                </div>

                {/* PRODUITS SIMILAIRES */}
                <div className="mb-16">
                    <h2 className="font-bold text-[#392e2c] text-xl text-center mb-8">
                        Vous aimerez peut-être ...
                    </h2>

                    <Carousel className="relative">
                        <CarouselContent className="flex justify-center gap-x-2">
                        {relatedProducts.map((product) => (
                            
                            <CarouselItem
                                key={product.id}
                                className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
                            >
                                <Card className="border-none shadow-none bg-transparent">
                                <CardContent className="p-0 flex flex-col items-center">
                                    <div className="w-full max-w-[220px] h-[220px] sm:h-[246px] mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded-md shadow"
                                        onClick={() => handleProductClick(product)}
                                    />
                                    </div>
                                    <h3 className="text-sm font-bold text-center text-[#392e2c] font-playfair">
                                        {product.name}
                                    </h3>
                                    <p className="font-bold text-[#392e2c] text-sm">
                                    {product.price}
                                    </p>
                                </CardContent>
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
                </div>
            </main>
        </div>
    );
}
