import React from 'react';
import Link from 'next/link';
import { SearchIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline'; // Si tu utilises Heroicons

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Partie gauche - Liens vers les pages */}
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-gray-300">Accueil</Link>
            <Link href="/about" className="hover:text-gray-300">À propos</Link>
            <Link href="/shop" className="hover:text-gray-300">Boutique</Link>
          </div>

          {/* Partie centrale - Logo */}
          <div className="flex-1 text-center">
            <Link href="/">
              <img src="/logo.svg" alt="Logo" className="mx-auto" />
            </Link>
          </div>

          {/* Partie droite - Icônes */}
          <div className="flex space-x-6">
            <div className="relative">
              <input type="text" placeholder="Recherche..." className="bg-gray-700 text-white px-4 py-2 rounded-md" />
              <SearchIcon className="absolute top-2 right-2 h-5 w-5 text-gray-400" />
            </div>

            <Link href="/cart">
              <ShoppingCartIcon className="h-6 w-6 text-gray-400 hover:text-white" />
            </Link>

            <Link href="/profile">
              <UserIcon className="h-6 w-6 text-gray-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;

