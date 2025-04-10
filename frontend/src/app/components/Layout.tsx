import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {Card, CardContent} from "@/components/ui/card";
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'; // Si tu utilises Heroicons


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white-800 text-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Partie gauche - Liens vers les pages */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-gray-300">ACCUEIL</Link>
            <Link href="/about" className="hover:text-gray-300">A PROPOS</Link>
            <Link href="/shop" className="hover:text-gray-300">BOUTIQUE</Link>
          </div>

          {/* Partie centrale - Logo */}
          <div className="flex-1 text-center">
            <Link href="/">
              <span>
                <Image src="/logo.svg" alt="Logo" className="mx-auto" width={120} height={60} />
              </span>
            </Link>
          </div>

          {/* Partie droite - Icônes */}
          <div className="flex space-x-6">
            <div className="relative">
              <input type="text" placeholder="Recherche..." className="bg-black-700 text-black px-4 py-2 rounded-md" />
              <MagnifyingGlassIcon className="absolute top-2 right-2 h-5 w-5 text-black-400" />
            </div>

            <Link href="/cart">
              <ShoppingCartIcon className="h-6 w-6 text-black-400 hover:text-white" />
            </Link>

            <Link href="/profile">
              <UserIcon className="h-6 w-6 text-black-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </nav>

      <section className='w-full relative'>
        <Card className='border-0 rounded-none'>
          <CardContent className='p-0'>
            <div className='relative w-full h-[545px]'>
              <img className='w-full h-full object-cover' alt='sustainable fashion' src='/heroImg.svg'></img>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className="w-[910px] [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-[32px] text-center">
                  &quot;Donner une nouvelle vie, c&apos;est creer un futur plus durable&quot;
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contenu principal */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;

