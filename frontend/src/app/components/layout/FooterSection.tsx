import { Button } from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {InstagramIcon, Mail as MailIcon} from "lucide-react";
import React from "react";

const centerLinks = [
    {text: "Nous contacter", href: "#"},
    {text: "FAQ", href: "#"},
    {text: "Conditions d'Utilisation", href: "#"},
];

const rightLinks = [
    {text: "Politique de Livraison", href: "#"},
    {text: "Politique Echanges & Retours", href: "#"},
    {text: "Politique de Confidentialite", href: "#"},
];

const FooterSection =  ({ children }: { children?: React.ReactNode }) => {
    return (
        <footer className="w-full py-12 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col mb-8 md:mb-0">
                        <div className="relative w-12 h-[58px] mb-4">
                            <div className="absolute top-0 left-0 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] w-[38px] h-[43px] text-[40px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                R
                            </div>
                            <div className="absolute top-[15px] left-2.5 [font-family:'Meow_Script-Regular', Helvetica] font-normal text-[#ffae9de0] w-[38px] h-[43px] text-[40px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                S
                            </div>
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
                            >
                                <MailIcon className="h-[34px] w-[34px] text-[#b39188]" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer p-0 h-[34px] w-[34px]"
                                aria-label="Instagram">
                                    <InstagramIcon className="h-[34px] w-[34px] text-[#b39188]" />
                            </Button>

                        </div>
                    </div>

                    <div className="flex flex-col mb-8 md:mb-0">
                        {centerLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="cursor-pointer [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#b39188] text-xs text-center md:text-left tracking-[0] leading-[normal] h-[26px] p-0 mb-2"
                            >
                                {link.text}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        {rightLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="cursor-pointer [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#b39188] text-xs text-center md:text-left tracking-[0] leading-[normal] h-[26px] p-0 mb-2"
                            >
                                {link.text}
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