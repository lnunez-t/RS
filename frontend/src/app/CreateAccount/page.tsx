"use client";

import { Button } from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

const formFields = [
    {id: "nom", label: "Nom", type: "text"},
    {id: "prenom", label: "Prenom", type: "text"},
    {id: "email", label: "Email", type: "email"},
    {id: "password", label: "Mot de passe", type: "password"},
    {id: "confirmPassword", label: "Confirmer mot de passe", type: "password"},
];

export default function CreateAccount() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
      };

    const handleClick = async () => {
        if (!isValidEmail(email)) {
            setError("Veuillez entrer une adresse email valide.");
            return;
        }
        
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4338/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            if (response.status === 201) {
                setError("Un email de vérification a été envoyé.");
                router.push("/Profile");
            } else {
                setError("L'utilisateur existe deja.");
            }
        } catch (error) {
            setError("Une erreur est survenue. Veuillez reessayer.");
            console.error("Erreur de connexion :", error);
        }
        
    };

    return (
        <div className="bg-[#faf2ea] flex flex-row justify-center w-full">
            <div className="bg-[#faf2ea] overflow-hidden w-full max-w-[1440px] relative">
                <main className="px-4 py-12">
                    <h1 className="w-full mb-12 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl text-center tracking-[0] leading-normal">
                        INFORMATIONS PERSONNELLES
                    </h1>

                    <div className="max-w-md mx-auto space-y-6">
                        {formFields.map((field, index) => (
                            <div key={index} className="space-y-2">
                                <label
                                    htmlFor={field.id}
                                    className="block [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base text-center tracking-[0] leading-normal"
                                >
                                    {field.label}
                                </label>
                                <Input
                                    id={field.id}
                                    type={field.type}
                                    className="h-[42px] bg-white rounded-[10px] border border-solid border-[#ffae9d]"
                                    value={
                                    field.id === "email"
                                        ? email
                                        : field.id === "password"
                                        ? password
                                        : field.id === "confirmPassword"
                                        ? confirmPassword
                                        : undefined
                                    }
                                    onChange={(e) => {
                                        if (field.id === "email") setEmail(e.target.value);
                                        if (field.id === "password") setPassword(e.target.value);
                                        if (field.id === "confirmPassword") setConfirmPassword(e.target.value);
                                    }}
                                />
                            </div>
                        ))}

                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}

                        <div className="flex items-start space-x-2 pt-4">
                            <Checkbox
                                id="newsletter"
                                className="rounded-[5px] border border-solid border-[#ffae9d] bg-white"
                            />
                            <label
                                htmlFor="newsletter"
                                className="[font-family:'Playfair_Display-Medium', Helvetica] font-medium text-[#392e2c] text-[11px] text-justify tracking-[0] leading-[normal]"
                            >
                                Recevoir des promotions, nouveautes et contenus personnalises
                            </label>
                        </div>

                        <Button 
                            onClick={handleClick}
                            className="cursor-pointer w-full h-[38px] bg-[#ccaea4] rounded-[20px] border border-solid [font-family:'Playfair_Display-SemiBold', Helvetica] font-semibold text-white text-base">
                            Creer un compte
                        </Button>

                        <div className="flex justify-center items-center pt-4">
                            <span className="[font-family:'Playfair_Display-Medium', Helvetica] font-medium text-[#392e2c] tracking-[0] leading-[normal]">
                                Vous avez deja un compte ?
                            </span>
                            <a
                                href="#"
                                onClick={() => router.push("/Profile")}
                                className="ml-1 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] tracking-[0] leading-[normal] underline"
                            >
                                Connectez-vous
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}