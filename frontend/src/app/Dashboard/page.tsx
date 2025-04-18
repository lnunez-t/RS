"use client";

import { Package } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const profileNavItems = ["Mes commandes", "Mes informations", "Deconnexion"];

export default function DashboardPage() {
    const router = useRouter();
    return (
        <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
            <div className="bg-[#faf2ea] overflow-hidden w-[1440px] relative">
                <div className="w-full h-[59px] bg-[#ccaea4]">
                    <div className="flex justify-center items-center h-full">
                        {profileNavItems.map((item, index) => (
                            <div key={index} className="relative mx-10">
                                <div className={`[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-base text-center ${index === 0 ? "underline decoration-white decoration-2 underline-offset-4" : ""}`}>
                                    {item}
                                </div>
                                {index === 0 && (
                                    <Separator className="w-[124px] h-[3px] absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <main className="flex flex-col items-center justify-center mt-20">
                    <div className="relative mb-16">
                        <Package className="w-[87px] h-[87px]" />
                        <div className="absolute w-6 h-6 top-2.5 right-0 bg-[#392e2c] rounded-xl border border-solid flex items-center justify-center">
                            <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-base">
                                0
                            </span>
                        </div>
                    </div>

                    <div className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl text-center mb-16">
                        Vous n&apos;avez effectue aucune commande.
                    </div>

                    <Button 
                        onClick={() => router.push("/Shop")}
                        className="bg-[#ffae9d] hover:bg-[#ffae9d]/90 rounded-[20px] h-[37px] px-6">
                        <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-base">
                            Explorer nos produits
                        </span>
                    </Button>
                </main>

            </div>
        </div>
    );
}