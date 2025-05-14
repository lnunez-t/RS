"use client";

import { Package } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const profileNavItems = ["Mes commandes", "Mes informations", "Deconnexion"];

export default function DashboardPage() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("IsLoggedIn");
        if (isLoggedIn !== "true") {
            router.push("/Profile");
        } else {
            setIsChecking(false);
        }
    }, [router]);

    if (isChecking) {
        return (
            <div className="h-screen flex items-center justify-center">
                Chargement...
            </div>
        );
    }

    return (
        <div className="bg-[#faf2ea] w-full min-h-screen flex flex-col items-center px-4">
            {/* Navigation */}
            <div className="w-full bg-[#ccaea4] py-4">
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {profileNavItems.map((item, index) => (
                        <div
                            key={index}
                            className="cursor-pointer hover:border-b-2 hover:border-[#ffae9d] pb-1 text-white text-base font-bold"
                            onClick={() => {
                                if (item === "Deconnexion") {
                                    localStorage.setItem("IsLoggedIn", "false");
                                    router.push("/Profile");
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Contenu principal */}
            <main className="flex flex-col items-center justify-center w-full max-w-[600px] text-center py-10">
                <div className="relative mb-10">
                    <Package className="w-20 h-20 mx-auto text-[#392e2c]" />
                    <div className="absolute w-6 h-6 top-0 right-0 bg-[#392e2c] rounded-full border flex items-center justify-center">
                        <span className="text-white text-sm font-bold">0</span>
                    </div>
                </div>

                <h1 className="text-[#392e2c] text-lg sm:text-xl font-bold mb-10">
                    Vous n&apos;avez effectué aucune commande.
                </h1>

                <Button
                    onClick={() => router.push("/Shop")}
                    className="bg-[#ffae9d] hover:bg-[#ffae9d]/90 rounded-[20px] h-[42px] px-6 text-white font-bold text-base"
                >
                    Explorer nos produits
                </Button>
            </main>
        </div>
    );
}

