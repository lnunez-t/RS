"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:4338/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.status === 200) {
                localStorage.setItem("isLoggedIn", "true");
                router.push("/Dashboard");
            } else {
                setError("Email ou mot de passe incorrect.");
            }
        } catch (error) {
            setError("Une erreur est survenue. Veuillez reessayer.");
            console.error("Erreur de connexion :", error);
        }
        
    };

    return (
        <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
            <div className="bg-[#faf2ea] overflow-hidden w-[1440px] relative">
                <section className="mt-16 flex flex-col tems-center">
                    <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl text-center tracking-[0] leading-normal mb-12">
                        CONNEXION
                    </h2>

                    <div className="w-[449px]">
                        <div className="mb-6">
                            <label className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base mb-2 block">
                                Email
                            </label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[42px] rounded-[20px] border border-solid border-[#ffae9d]" />
                        </div>

                        <div className="mb-6">
                            <label className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base mb-2 block">
                                Mot de passe
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-[42px] rounded-[20px] border border-solid border-[#ffae9d]" />
                            <div className="mt-1 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#ffae9d] text-[11px]">
                                Mot de passe oublie ?
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center mt-10">
                            <Button
                                onClick={handleClick}
                                className="w-[49px] h-[25px] bg-[#ccaea4] rounded-[20px] [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-white text-base">
                                OK
                            </Button>
                        </div>
                    </div>

                    <Separator className="w-[500px] my-10" />

                    <div className="flex items-center gap-2 mb-16">
                        <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl">
                            Nouveau ?
                        </span>
                        <Button
                            onClick={() => router.push("/CreateAccount")}
                            variant="outline"
                            className="cursor-pointer h-[38px] rounded-[10px] border-2 border-solid border-[#ccaea4] [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base"
                        >
                            Creer un compte
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}