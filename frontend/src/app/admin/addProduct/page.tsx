'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    size: '',
    color: '',
    stock: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      images: [],
      variants: [
        {
          size: formData.size,
          color: formData.color,
          stock: parseInt(formData.stock),
        },
      ],
    };

    const res = await fetch('http://localhost:4338/clothing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      alert('Produit ajouté avec succès !');
      router.push('/admin/products');
    } else {
      alert('Erreur lors de l’ajout du produit');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Ajouter un produit</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Prix (€)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="size"
          placeholder="Taille"
          value={formData.size}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="color"
          placeholder="Couleur"
          value={formData.color}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.push('/admin/products')}
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
