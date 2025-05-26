'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function UserDetailsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:4338/useradmin/users/${params.id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur serveur');
      setUser(data);
    } catch (err) {
      console.error('Erreur récupération utilisateur :', err);
      router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyAndFetch = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Token invalide');

        await fetchUser();
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyAndFetch();
  }, [params.id]);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!user) return <div className="p-6">Utilisateur introuvable.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold">Fiche client</h1>

      <div className="border rounded-lg p-4 space-y-2">
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Prénom :</strong> {user.infosPerso?.firstName || 'Non renseigné'}</p>
        <p><strong>Nom :</strong> {user.infosPerso?.lastName || 'Non renseigné'}</p>
        <p><strong>Téléphone :</strong> {user.infosPerso?.telephone || 'Non renseigné'}</p>
        <p><strong>Adresse :</strong> {user.infosPerso?.adresse || 'Non renseignée'}</p>
        <p><strong>Ville :</strong> {user.infosPerso?.ville || 'Non renseignée'}</p>
        <p><strong>Code postal :</strong> {user.infosPerso?.codePostal || 'Non renseigné'}</p>
        <p><strong>Pays :</strong> {user.infosPerso?.pays || 'Non renseigné'}</p>
        <p><strong>Points fidélité :</strong> {user.infosPerso?.point_fedeliter ?? 0}</p>
      </div>

      <button
        onClick={() => router.push(`/admin/users/${user._id}/edit`)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        ✏️ Modifier les informations
      </button>
    </div>
  );
}
