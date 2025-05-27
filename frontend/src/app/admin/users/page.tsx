'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:4338/useradmin/users', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log('Utilisateurs reçus:', data);
      setUsers(data);
    } catch (err) {
      console.error('Erreur récupération utilisateurs :', err);
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

        await fetchUsers();
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyAndFetch();
  }, []);

  const handleDelete = async (userId: string) => {
    if (!confirm('Supprimer ce compte utilisateur ?')) return;
    try {
      const res = await fetch(`http://localhost:4338/useradmin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Utilisateur supprimé.');
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        const data = await res.json();
        alert(data.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur suppression utilisateur :', err);
      alert('Erreur réseau');
    }
  };

  if (loading) return <div className="p-6">Chargement des utilisateurs...</div>;

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => router.push('/admin')}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Retour au admin
      </button>

      <h1 className="text-2xl font-bold mb-4">Liste des clients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(users) && users.map((user) => (
          <div
            key={user._id}
            className="relative border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <button
              onClick={() => handleDelete(user._id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              title="Supprimer le compte"
            >
              ✕
            </button>
            <div onClick={() => router.push(`/admin/users/${user._id}`)} className="cursor-pointer">
              <p className="font-semibold text-lg">{user.infosPerso?.firstName || 'Prénom'} {user.infosPerso?.lastName || 'Nom'}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm" style={{ color: user.infosPerso?.point_fedeliter > 0 ? 'green' : 'gray' }}>
                Points fidélité : {user.infosPerso?.point_fedeliter ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
