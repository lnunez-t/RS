"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "@/app/components/layout/CartDrawer";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";

import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NavbarSection = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems, isCartOpen, openCart, closeCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleProfileClick = () => {
    router.push(isLoggedIn ? "/Dashboard" : "/Profile");
  };

  return (
    <div>
      <nav className={`bg-white text-black p-4 border-b border-gray-200 ${className}`}>

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* MOBILE: Menu icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* DESKTOP: Full navbar line */}
          <div className="hidden md:flex flex-1 items-center justify-between w-full">
            {/* LEFT: Navigation links */}
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-[#ccaea4]">
                ACCUEIL
              </Link>
              <Link href="/About" className="hover:text-[#ccaea4]">
                A PROPOS
              </Link>
              <Link href="/Shop" className="hover:text-[#ccaea4]">
                BOUTIQUE
              </Link>
            </div>

            {/* CENTER: Logo */}
            <Link href="/" className="mx-4">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={140}
                height={50}
                className="object-contain"
              />
            </Link>

            {/* RIGHT: Search, Cart, Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Recherche..."
                  className="px-3 py-1.5 rounded-md border border-gray-300"
                />
                <MagnifyingGlassIcon className="absolute top-2 right-2 h-4 w-4 text-gray-500" />
              </div>

              <button onClick={openCart} aria-label="panier" className="relative">
                <ShoppingCartIcon className="w-5 h-5 text-[#392e2c] hover:text-[#ccaea4]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow">
                    {cartItems.length}
                  </span>
                )}
              </button>


              <button onClick={handleProfileClick} aria-label="profil">
                <UserIcon className="w-5 h-5 text-black hover:text-[#ccaea4]" />
              </button>
            </div>
          </div>

          {/* CENTER on mobile: Logo */}
          <div className="md:hidden flex-1 text-center">
            <Link href="/">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={100}
                height={40}
                className="mx-auto object-contain"
              />
            </Link>
          </div>

          {/* RIGHT on mobile: icons */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={openCart} aria-label="panier">
              <ShoppingCartIcon className="w-5 h-5 text-[#392e2c]" />
              { cartItems.length > 0 && (
              <span className="relative -top-3 -right-3 bg-[#000] text-white text-xs font-bold rounded-full h-4 w-4 flex justify-center shadow">
                {cartItems.length}
              </span>
            )}
            </button>
            
            <button onClick={handleProfileClick} aria-label="profil">
              <UserIcon className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* MOBILE: dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 px-2 pb-4 border-t pt-4 text-sm">
            <Link
              href="/"
              className="block hover:text-[#ccaea4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              ACCUEIL
            </Link>
            <Link
              href="/About"
              className="block hover:text-[#ccaea4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              A PROPOS
            </Link>
            <Link
              href="/Shop"
              className="block hover:text-[#ccaea4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              BOUTIQUE
            </Link>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Recherche..."
                className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ccaea4] text-sm"
              />
              <MagnifyingGlassIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>

          </div>
        )}
      </nav>

      {/* CART */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      {/* MAIN CONTENT */}
      <main>{children}</main>
    </div>
  );
};

export default NavbarSection;




