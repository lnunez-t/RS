'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LeaveReviewClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<number | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:4338/notes/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment, email, token }),
      });

      const data = await res.json();
      if (res.ok) {
      setMessage(data.message || 'Merci pour votre avis !');
        } else {
          if (data.message?.includes('déjà été laissé')) {
            setError("Vous avez déjà laissé un avis pour cette commande.");
          } else {
            setError(data.message || 'Erreur lors de l’envoi de votre avis.');
          }
        }

    } catch (err) {
      console.error(err);
      setError('Erreur réseau.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token || !email) {
    return <div className="p-6 text-red-600">Lien invalide ou expiré.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Laisser un avis</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="text-3xl transition-transform hover:scale-110"
                >
                <span style={{ color: (hover ?? rating) >= star ? '#facc15' : '#d1d5db' }}>★</span>
                </button>
            ))}
        </div>

        <textarea
          placeholder="Votre commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {submitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
        </button>
      </form>
    </div>
  );
}
