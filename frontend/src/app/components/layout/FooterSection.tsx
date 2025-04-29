import { Button } from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {InstagramIcon, Mail as MailIcon} from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from 'next/image';

const centerLinks = [
    {text: "Nous contacter", href: "/Contact"},
    {text: "FAQ", href: "/FAQ"},
    {text: "Conditions d'Utilisation", href: "/CondUtil"},
];

const rightLinks = [
    {text: "Politique de Livraison", href: "DelivPolicy"},
    {text: "Politique Echanges & Retours", href: "Returns"},
    {text: "Politique de Confidentialite", href: "ConfidPolicy"},
];

const FooterSection =  ({ children }: { children?: React.ReactNode }) => {
    return (
        <footer className="w-full py-12 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col mb-8 md:mb-0">
                        <div className="relative w-12 h-[58px] mb-4">
                        <Link href="/">
                            <span>
                                <Image src="/logo_short.png" alt="Logo" className="mx-auto" width={120} height={60} />
                            </span>
                        </Link>
                        </div>

                        <div className="[font-family:'Playfair_Display-Italic', Helvetica] font-normal italic text-[#392e2c] text-sm text-center md:text-left tracking-[0] leading-[normal] mb-2">
                            Chaque piece a une histoire ...
                        </div>

                        <div className="[font-family:'Playfair_Display-Italic', Helvetica] font-normal italic text-[#392e2c] text-sm text-center md:text-left tracking-[0] leading-[normal] mb-6">
                            ... Nous leur offrons un nouveau chapitre
                        </div>

                        <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer p-0 h-[34px] w-[34px]"
                                aria-label="Email"
                                asChild
                            >
                                <a href="mailto:retrospectivestudio.shop@gmail.com">
                                    <MailIcon className="h-[34px] w-[34px] text-[#b39188]" />
                                </a>
                                
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer p-0 h-[34px] w-[34px]"
                                aria-label="Instagram"
                                asChild
                            >
                                <a
                                    href="https://www.instagram.com/retrospective.studio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <InstagramIcon className="h-[34px] w-[34px] text-[#b39188]" />
                                </a>
                                    
                            </Button>

                        </div>
                    </div>

                    <div className="flex flex-col mb-8 md:mb-0">
                        {centerLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="cursor-pointer [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#b39188] text-xs text-center md:text-left tracking-[0] leading-[normal] h-[26px] p-0 mb-2"
                                asChild
                            >
                                <Link href={link.href}>
                                    {link.text}
                                </Link>
                                
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        {rightLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="cursor-pointer [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#b39188] text-xs text-center md:text-left tracking-[0] leading-[normal] h-[26px] p-0 mb-2"
                                asChild
                            >
                                <Link href={link.href}>
                                    {link.text}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator className="my-6 bg-[#b39188]" />

                <div className="flex items-center">
                    <div className="flex items-center [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#b39188] text-[10px] tracking-[0] leading-[normal]">
                        <span className="mr-1.5">@</span>
                        Retrospective Studio, Paris, FR
                    </div>
                </div>
            </div>
        <main>{children}</main>
        </footer>
    );
}

export default FooterSection;