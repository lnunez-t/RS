'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formFields = [
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Mot de passe", type: "password" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Vérifie si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await fetch('http://localhost:4338/api/auth/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          router.push('/Dashboard');
        }
      } catch (err) {
        console.log("Utilisateur non connecté");
      }
    };

    checkIfLoggedIn();
  }, [router]);

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:4338/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        router.push("/Dashboard");
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="bg-[#faf2ea] min-h-screen flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md bg-[#faf2ea]">
        <h2 className="font-bold text-[#392e2c] text-2xl text-center mb-12">
          CONNEXION
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
          className="space-y-6"
        >
          {formFields.map((field, index) => (
            <div key={index} className="space-y-2">
              <label
                htmlFor={field.id}
                className="block font-bold text-[#392e2c] text-base"
              >
                {field.label}
              </label>
              <Input
                id={field.id}
                type={field.type}
                className="h-[42px] bg-white rounded-[10px] border border-[#ffae9d]"
                value={field.id === "email" ? email : password}
                onChange={(e) => {
                  if (field.id === "email") setEmail(e.target.value);
                  if (field.id === "password") setPassword(e.target.value);
                }}
              />
            </div>
          ))}

          <div
            onClick={() => router.push("/ForgotPassword")}
            className="cursor-pointer text-[#ffae9d] text-xs font-bold hover:underline"
          >
            Mot de passe oublié ?
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="w-24 h-10 bg-[#ccaea4] rounded-[20px] text-white font-semibold text-base"
            >
              OK
            </Button>
          </div>
        </form>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <span className="font-bold text-[#392e2c] text-sm">
            Nouveau ?
          </span>
          <Button
            onClick={() => router.push("/CreateAccount")}
            variant="outline"
            className="h-[38px] px-4 rounded-[10px] border-2 border-[#ccaea4] font-bold text-[#392e2c] text-sm"
          >
            Créer un compte
          </Button>
        </div>
      </section>
    </div>
  );
}
