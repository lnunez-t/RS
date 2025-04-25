"use client";

import React, { createContext, useContext, useState } from "react";

// Créer un Contexte pour le produit
const ProductContext = createContext<any>(null);

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const selectProduct = (product: any) => {
        setSelectedProduct(product);
    };

    return (
        <ProductContext.Provider value={{ selectedProduct, selectProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
