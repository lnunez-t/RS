
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function InfosClient() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    
    const [message, setMessage] = useState("");

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const verifyToken = async () => {
    //     try {
    //         const res = await fetch('http://localhost:4338/useradmin/verify-token', {
    //         method: 'GET',
    //         credentials: 'include', // Indispensable si tu utilises les cookies HTTP-only
    //         });

    //         if (!res.ok) {
    //         throw new Error('Invalid token');
    //         }

    //         // Token valide → continuer
    //         console.log("test");
    //         setLoading(false);
    //     } catch (error) {
    //         router.push('/Profile');
    //     }
    //     };

    //     verifyToken();
    // }, [router]);

    // if (loading) {
    //     return <div className="text-center mt-10">Chargement...</div>;
    // }

    useEffect(() => {
        // Appel pour récupérer les données utilisateur
        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:4338/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                console.log(data);
                console.log(data.infosPerso);
                setUserData({
                    email: data.email,
                    lastName: data.infosPerso?.lastName || "",
                    firstName: data.infosPerso?.firstName || ""
                });
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération du profil :", err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch("http://localhost:4338/api/auth/update-infos", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                setMessage("Modifications enregistrées !");
            } else {
                setMessage("Erreur lors de la sauvegarde.");
            }
        } catch (err) {
            console.error("Erreur de mise à jour :", err);
            setMessage("Erreur de communication avec le serveur.");
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Chargement...</div>;
    }

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-xl space-y-4">
            <div>
                <label className="block text-sm font-medium text-[#392e2c]">Nom</label>
                <Input
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full border border-[#ffae9d] rounded-xl px-4 py-2 mt-1"
            />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#392e2c]">Prenom</label>
                 <Input
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full border border-[#ffae9d] rounded-xl px-4 py-2 mt-1"
            />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#392e2c]">Email</label>
                <Input
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full border border-[#ffae9d] rounded-xl px-4 py-2 mt-1"
            />
            </div>

            <Button
                onClick={handleSave}
                className="bg-[#ccaea4] text-white w-full rounded-xl mt-4"
            >
                Enregistrer
            </Button>

            {message && <p className="mt-4 text-sm text-center">{message}</p>}
            
        </div>
    );
};
