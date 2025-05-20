"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        const emailFromUrl = searchParams.get("email");
        if (tokenFromUrl) setToken(tokenFromUrl);
        if (emailFromUrl) setEmail(emailFromUrl);
    }, [searchParams]);

    const handleReset = async () => {
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const res = await fetch("http://localhost:4338/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, email, newPassword: password }),
            });

            if (res.ok) {
                setMessage("Mot de passe réinitialisé avec succès.");
                setError("");
                setTimeout(() => router.push("/Profile"), 3000);
            } else {
                setError("Lien invalide ou expiré.");
                setMessage("");
            }
        } catch (err) {
            setError("Erreur lors de la réinitialisation.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf2ea] px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#392e2c] mb-6 text-center">
                Nouveau mot de passe
            </h2>
            <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-md">
                <Input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 h-[42px] rounded-[20px] border border-solid border-[#ffae9d]"
                />
                <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-4 h-[42px] rounded-[20px] border border-solid border-[#ffae9d]"
                />
                <Button
                    onClick={handleReset}
                    className="cursor-pointer w-full bg-[#ccaea4] text-white rounded-[20px]"
                >
                    Réinitialiser
                </Button>
                {message && <p className="mt-4 text-green-600 text-sm sm:text-base">{message}</p>}
                {error && <p className="mt-4 text-red-500 text-sm sm:text-base">{error}</p>}
            </div>
        </div>
    );
};

const ResetPasswordWrapper = () => (
    <Suspense fallback={<div className="text-center mt-20">Chargement...</div>}>
        <ResetPasswordPage />
    </Suspense>
);

export default ResetPasswordWrapper;



