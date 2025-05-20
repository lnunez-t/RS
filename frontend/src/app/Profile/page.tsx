"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:4338/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                localStorage.setItem("IsLoggedIn", "true");
                router.push("/Dashboard");
            } else {
                setError("passe incorrect.");
            }
        } catch (error) {
            setError("Une erreur est survenue. Veuillez réessayer.");
            console.error("Erreur de connexion :", error);
        }
    };

    return (
        <div className="bg-[#faf2ea] flex justify-center w-full px-4">
            <div className="bg-[#faf2ea] w-full max-w-[1440px] py-12">
                <section className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-[#392e2c] text-center font-['Playfair_Display'] mb-8">
                        CONNEXION
                    </h2>

                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                        <div className="mb-6">
                            <label className="block mb-2 text-[#392e2c] text-base font-bold font-['Playfair_Display']">
                                Email
                            </label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-[42px] rounded-[20px] border border-[#ffae9d]"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-[#392e2c] text-base font-bold font-['Playfair_Display']">
                                Mot de passe
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-[42px] rounded-[20px] border border-[#ffae9d]"
                            />
                            <div
                                onClick={() => router.push("/ForgotPassword")}
                                className="mt-1 text-[#ffae9d] text-[11px] font-bold font-['Playfair_Display'] cursor-pointer"
                            >
                                Mot de passe oublié ?
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
                                className="w-20 h-[35px] bg-[#ccaea4] rounded-[20px] font-semibold text-white text-base font-['Playfair_Display']"
                            >
                                OK
                            </Button>
                        </div>
                    </div>

                    <Separator className="w-full max-w-md my-10" />

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <span className="text-[#392e2c] text-sm font-bold font-['Playfair_Display']">
                            Nouveau ?
                        </span>
                        <Button
                            onClick={() => router.push("/CreateAccount")}
                            variant="outline"
                            className="h-[38px] rounded-[10px] border-2 border-[#ccaea4] text-[#392e2c] text-sm font-bold font-['Playfair_Display']"
                        >
                            Créer un compte
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
