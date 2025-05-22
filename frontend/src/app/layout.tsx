// app/layout.tsx
import './globals.css'
import React from 'react'
import NavbarSection from './components/layout/NavbarSection'
import NewsletterSection from './components/layout/NewsletterSection'
import FooterSection from './components/layout/FooterSection'

import { CartProvider } from "@/lib/contexts/CartContext";
import { ProductProvider } from "@/lib/contexts/ProductContext";

export const metadata = {
  title: 'Restrospective Studio',
  description: 'Upcycling et créations responsables',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <ProductProvider>
            <NavbarSection className="print:hidden" />

              {children}
            <NewsletterSection className="print:hidden" />
            <FooterSection className="print:hidden" />
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
