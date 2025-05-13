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

const NavbarSection = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isCartOpen, openCart, closeCart } = useCart();
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
      <nav className="bg-white text-black p-4 border-b border-gray-200">
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

              <button onClick={openCart} aria-label="panier">
                <ShoppingCartIcon className="w-5 h-5 text-[#392e2c] hover:text-[#ccaea4]" />
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
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
            <button onClick={openCart} aria-label="panier">
              <ShoppingCartIcon className="w-5 h-5 text-[#392e2c]" />
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




