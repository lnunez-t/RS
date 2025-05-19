'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const allSizes = ['TU' ,'XS', 'S', 'M', 'L', 'XL', 'XXL'];


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [variants, setVariants] = useState([
    { size: '', color: '', stock: '' }
  ]);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariants(prev => {
      const updated = [...prev];
      updated[index][name as keyof typeof updated[number]] = value;
      return updated;
    });
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { size: '', color: '', stock: '' }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);

    form.append(
      'variants',
      JSON.stringify(
        variants.map(v => ({
          size: v.size,
          color: v.color,
          stock: parseInt(v.stock),
        }))
      )
    );

    images.forEach(image => {
      form.append('images', image);
    });

    try {
      const res = await fetch('http://localhost:4338/clothing', {
        method: 'POST',
        body: form,
        credentials: 'include',
      });

      if (res.ok) {
        alert('Produit ajouté avec succès !');
        router.push('/admin/products');
      } else {
        alert('Erreur lors de l’ajout du produit');
      }
    } catch (err) {
      alert('Erreur réseau');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4 py-10 gap-10">
      {/* Prévisualisation des images */}
      <div className="flex flex-col gap-4">
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-32 h-32 object-cover rounded border"
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Ajouter un produit</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Prix (€)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        <div className="space-y-2">
          <label className="font-semibold">Variantes :</label>
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <select
                name="size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                className="border rounded px-2 py-1"
                required
              >
                <option value="">Taille</option>
                {allSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="color"
                placeholder="Couleur"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, e)}
                className="border rounded px-2 py-1"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, e)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="text-blue-600 hover:underline text-sm mt-2"
          >
            ➕ Ajouter une variante
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
