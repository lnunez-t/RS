'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SendEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Vérifie que l'utilisateur admin est connecté
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Invalid token');
        setLoading(false);
      } catch (error) {
        router.push('/admin/login');
      }
    };

    verifyToken();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Envoi...');

    try {
      const res = await fetch('http://localhost:4338/useradmin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('E-mail envoyé avec succès !');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus(data.error || 'Erreur lors de l’envoi.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Erreur réseau.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">Vérification de l’accès...</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <button
        onClick={() => router.push('/admin')}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Retour au admin
      </button>

      <h1 className="text-xl font-bold mb-4">Envoyer un e-mail</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Objet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}
