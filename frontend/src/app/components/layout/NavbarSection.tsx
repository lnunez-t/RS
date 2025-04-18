"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'; // Si tu utilises Heroicons


const NavbarSection = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/Dashboard"); // ou la route de ton profil connecté
    } else {
      router.push("/Profile"); // page de connexion
    }
  };
  
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white-800 text-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Partie gauche - Liens vers les pages */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-[#ccaea4]">ACCUEIL</Link>
            <Link href="/About" className="hover:text-[#ccaea4]">A PROPOS</Link>
            <Link href="/Shop" className="hover:text-[#ccaea4]">BOUTIQUE</Link>
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

            <Link href="/Cart">
              <ShoppingCartIcon className="h-9 w-6 text-black-400 hover:text-[#ccaea4]" />
            </Link>

            <button onClick={handleProfileClick}>
              <UserIcon className="cursor-pointer h-6 w-6 text-black-400 hover:text-[#ccaea4]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main>{children}</main>
    </div>
  );
}

export default NavbarSection;

