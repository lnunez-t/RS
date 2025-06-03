"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";


type CartItem = {
  uuid?: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Cherche un item similaire (même id + même taille)
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size
      );
  
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
  
      // Ajoute un nouvel item avec un uuid unique
      return [...prev, { ...item, uuid: uuidv4() }];
    });
  };
  

  const removeFromCart = (uuid: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.uuid !== uuid)
    );
  };

  const clearCart = () => setCartItems([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const updateCartItemQuantity = (uuid: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uuid === uuid ? { ...item, quantity } : item
      )
    );
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        updateCartItemQuantity,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
