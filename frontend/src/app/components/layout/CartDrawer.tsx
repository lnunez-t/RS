// components/CartDrawer.tsx
"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/hooks/useCart";
import { Minus, Plus } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart } = useCart(); // adapte selon ta logique

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
              (1 produit(s))
          </span>
          <button onClick={onClose}>
            <XMarkIcon className="cursor-pointer h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Liste des articles */}
        {cartItems && cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item: any, index: number) => (
              <li key={index} className="flex justify-between">
                <img
                    className="w-[100px] h-[100px] object-cover mr-4"
                    alt={item.name}
                    src={item.image}
                />
                <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                  {item.name}
                </span>
                <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                  {item.price}
                </span>
                <div className="flex items-center border border-[#ffae9d] rounded-[20px] h-[22px] w-[55px] mr-4">
                    <button
                        className="h-4 w-4 p-0 ml-2"
                    >
                        <Minus className="cursor-pointer h-2 w-2 text-[#392e2c]" />
                    </button>
                    <span className="flex-1 text-center [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xs">
                        1
                    </span>
                    <button
                        className="h-4 w-4 p-0 mr-2"
                    >
                        <Plus className="cursor-pointer h-2 w-2 text-[#392e2c]" />
                    </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;


