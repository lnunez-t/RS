// lib/hooks/useCart.ts
"use client"; // S'assurer que ce code s'exécute côté client uniquement

import { useState } from "react";

export function useCart() {
  // Déclare un état pour savoir si le panier est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour ouvrir le panier
  const openCart = () => setIsOpen(true);

  // Fonction pour fermer le panier
  const closeCart = () => setIsOpen(false);

  return {
    isOpen,
    openCart,
    closeCart,
  };
}
