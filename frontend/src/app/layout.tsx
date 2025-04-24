// app/layout.tsx
import './globals.css'
import React from 'react'
import NavbarSection from './components/layout/NavbarSection'
import NewsletterSection from './components/layout/NewsletterSection'
import FooterSection from './components/layout/FooterSection'
import CartDrawer from './components/layout/CartDrawer';

export const metadata = {
  title: 'Restrospective Studio',
  description: 'Upcycling et créations responsables',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <NavbarSection />
        <CartDrawer />
        {children}
        <NewsletterSection />
        <FooterSection />
      </body>
    </html>
  );
}
