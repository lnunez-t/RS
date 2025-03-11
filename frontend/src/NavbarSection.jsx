import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Search, ShoppingCart, User } from "lucide-react";
import React from "react";

export default function NavbarSection() {
    const navItems = [
        { label: "ACCUEIL", href: "#"},
        { label: "A PROPOS", href: "#"},
        { label: "BOUTIQUE", href: "#"},
    ];

    return (
        <header className="w-full h-[135px] bg-white border-b">
            <div className="container h-full mx-auto flex items-center justify-between px-12">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-8">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuLink
                                href={item.href}
                                className="font-bold text-[#392e2c] text-2xl tracking-[0] [font-family:'Playfair_Display-Bold',Helvetica]"
                                >
                                    {item.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <img
                    className="w-[343px] h-[113px]"
                    alt="Retrospective Studio Logo"
                    src="./src/assets/logoRS.png"
                    />
                </div>
            </div>
        </header>
    )
}