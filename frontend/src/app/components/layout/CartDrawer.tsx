// components/layout/CartDrawer.tsx
"use client";

import { useCart } from "@/lib/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function CartDrawer() {
  const { isOpen, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50"
        >
          {/* contenu du panier ici */}
          <button onClick={closeCart} className="absolute top-4 right-4">Fermer</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

