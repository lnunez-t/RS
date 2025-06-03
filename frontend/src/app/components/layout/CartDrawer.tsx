"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/hooks/useCart";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart(); // adapte selon ta logique
  const router = useRouter();
  const totalUniqueItems = cartItems.length;

  console.log(cartItems);


  const totalPrice = cartItems.reduce((total, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    const quantity = item.quantity ?? 1; // valeur par défaut si non défini
    return total + price * quantity;
  }, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl mr-2">
            Votre panier
          </h2>
          <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-sm">
            ({totalUniqueItems} produit{totalUniqueItems > 1 ? "s" : ""})
          </span>
          <button onClick={onClose}>
            <XMarkIcon className="cursor-pointer h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Liste des articles */}
        {cartItems && cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item: any, index: number) => (
              <li key={item.uuid} className="flex items-start space-x-4">
                <img
                    className="w-[100px] h-[100px] object-cover"
                    alt={item.name}
                    src={item.image}
                />
                <div className="flex flex-col flex-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                      {item.name}
                    </span>
                    <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                      {item.price} €
                    </span>
                  </div>

                  <div>
                    <span className="[font-family:'Playfair_Display-Regular', Helvetica] text-[#392e2c] text-sm">
                      Taille : {item.size || "Unique"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-[#ffae9d] rounded-[20px] h-[22px] w-[55px] mr-4">
                      <Button 
                        variant="ghost" 
                        className="cursor-pointer h-4 w-4 p-0" 
                        onClick={() =>
                          updateCartItemQuantity(item.uuid, item.quantity > 1 ? item.quantity - 1 : 1)}
                      >
                          <Minus className=" h-2 w-2" />
                      </Button>
                      <span className="flex-1 text-center [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs">
                          {item.quantity}
                      </span>
                      <Button 
                        variant="ghost" 
                        className="cursor-pointer h-4 w-4 p-0" 
                        onClick={() => updateCartItemQuantity(item.uuid, item.quantity + 1)}
                      >
                          <Plus className=" h-2 w-2" />
                      </Button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.uuid)}
                      className="cursor-pointer text-red-500 hover:text-red-700 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-xs"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <Separator className="mx-auto w-[95%]" />

            <CardFooter className="flex flex-col p-6">
                <Button 
                  onClick={() => router.push("/Payment")}
                  className="cursor-pointer w-full bg-[#392e2c] rounded-[20px] h-10 [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-white text-base mb-2">
                    Payer - EUR {totalPrice.toFixed(2)} €
                </Button>
                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px] text-center">
                    Taxes et frais de livraison calcules lors du paiement
                </p>
            </CardFooter>
          </ul>
          
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;


