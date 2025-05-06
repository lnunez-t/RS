"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:4338/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setMessage("Un email de réinitialisation a été envoyé.");
                setError("");
            } else {
                setMessage("");
                setError("Une erreur est survenue. Veuillez vérifier l'email.");
            }
        } catch (err) {
            setMessage("");
            setError("Erreur de connexion. Réessayez plus tard.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#faf2ea]">
            <h2 className="text-2xl font-bold text-[#392e2c] mb-6">Mot de passe oublié</h2>
            <div className="w-[400px]">
                <label className="block mb-2 text-[#392e2c] font-bold">Entrez votre email</label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 h-[42px] rounded-[20px] border border-solid border-[#ffae9d]"
                />
                <Button
                    onClick={handleSubmit}
                    className="cursor-pointer w-full bg-[#ccaea4] text-white rounded-[20px]"
                >
                    Envoyer
                </Button>
                {message && <p className="mt-4 text-green-600">{message}</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
}
