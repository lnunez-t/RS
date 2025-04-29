'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const VerifyEmailContent = () => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
      const verifyEmail = async () => {
        const email = searchParams.get('email');
        const token = searchParams.get('token');

        if (!email || !token) {
          setStatus("Lien de vérification invalide.");
          return;
        }
        try {
          // Envoyer le token au backend pour vérifier l'email
          const response = await fetch(`http://localhost:4338/api/auth/verify-email?email=${email}&token=${token}`, {
            method: "GET",
          });
          const result = await response.json();

          if (response.ok) {
            setStatus("Votre email a été vérifié avec succès !");
            // Redirige l'utilisateur vers la page de connexion ou le tableau de bord
            setTimeout(() => router.push("/Profile"), 2000);
          } else {
            setStatus(result.message || "Erreur de vérification.");
          }
        } catch (error) {
          setStatus("Une erreur est survenue. Veuillez réessayer.");
        }
      };
      
      verifyEmail();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#392e2c]">Vérification de l'email</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

const VerifyEmail = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <VerifyEmailContent />
  </Suspense>
);

export default VerifyEmail;
