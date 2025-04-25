// components/CartDrawer.tsx
"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/hooks/useCart";

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
          <h2 className="text-xl font-semibold">Votre panier</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Liste des articles */}
        {cartItems && cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item: any, index: number) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity} × {item.price}€</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
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


