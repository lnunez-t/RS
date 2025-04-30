'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '', price: '', size: '', stock: '', image: '', description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('http://localhost:4338/clothing', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Nom du produit" />
      <input name="price" onChange={handleChange} placeholder="Prix" />
      <input name="size" onChange={handleChange} placeholder="Taille" />
      <input name="stock" onChange={handleChange} placeholder="Stock" />
      <input name="image" onChange={handleChange} placeholder="URL de l’image" />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <button type="submit">Ajouter le produit</button>
    </form>
  );
}