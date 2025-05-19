'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const allSizes = ['TU' ,'XS', 'S', 'M', 'L', 'XL', 'XXL'];

type Variant = {
  size: string;
  color: string;
  stock: number;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [variants, setVariants] = useState<Variant[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:4338/clothing/${productId}`);
      if (!res.ok) {
        alert('Produit non trouvé');
        router.push('/admin/products');
        return;
      }
      const data = await res.json();

      setFormData({
        name: data.name,
        price: data.price.toString(),
        description: data.description || '',
      });
      setVariants(data.variants || []);
      setExistingImages(data.images || []);
      setLoading(false);
    };

    fetchProduct();
  }, [productId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVariants(prev => {
      const updated = [...prev];
      switch (name) {
        case 'size':
        case 'color':
          updated[index] = { ...updated[index], [name]: value };
          break;
        case 'stock':
          updated[index] = { ...updated[index], stock: parseInt(value) || 0 };
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { size: '', color: '', stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files);
      setNewImagePreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const getPublicIdFromUrl = (url: string): string => {
    // Ex: https://res.cloudinary.com/.../upload/v1234567/folder/image-name.jpg
    const base = url.split('/upload/')[1];
    return base ? base.split('.')[0] : '';
  };


  const handleDeleteImage = async (url: string) => {
    const confirmed = confirm('Supprimer cette image ?');
    if (!confirmed) return;

    const publicId = getPublicIdFromUrl(url);
    if (!publicId) {
      alert('Impossible de récupérer le publicId.');
      return;
    }

    try {
        const res = await fetch(`http://localhost:4338/clothing/image?publicId=${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        credentials: 'include',
        });


      if (res.ok) {
        setExistingImages(prev => prev.filter(img => img !== url));
      } else {
        alert('Erreur lors de la suppression de l’image');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);
    form.append('variants', JSON.stringify(variants));
    form.append('images', JSON.stringify(existingImages));

    newImages.forEach(image => {
      form.append('newImages', image);
    });

    const res = await fetch(`http://localhost:4338/clothing/${productId}`, {
      method: 'PUT',
      body: form,
      credentials: 'include',
    });

    if (res.ok) {
      alert('Produit mis à jour avec succès');
      router.push('/admin/products');
    } else {
      alert('Erreur lors de la mise à jour du produit');
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-2xl mb-4">
        <button
          onClick={() => router.push('/admin/products')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Retour à la liste des produits
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Modifier un produit</h2>

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
            <div key={index} className="grid grid-cols-3 gap-2 items-center">
              <select
                name="size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e as React.ChangeEvent<HTMLSelectElement>)}
                className="border rounded px-2 py-1"
                required
              >
                <option value="">Taille</option>
                {allSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
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
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, e)}
                  className="border rounded px-2 py-1 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 hover:text-red-800 text-xl"
                  title="Supprimer cette variante"
                >
                  ×
                </button>
              </div>
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

        <div className="space-y-2">
          <label className="font-semibold">Images existantes :</label>
          <div className="flex flex-wrap gap-4">
            {existingImages.map((img, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={img}
                  alt={`Image ${i}`}
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img)}
                  className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Ajouter des nouvelles images :</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded px-4 py-2"
          />

          <div className="flex gap-2 flex-wrap">
            {newImagePreviews.map((src, i) => (
              <img key={i} src={src} alt={`Prévisualisation ${i}`} className="w-24 h-24 object-cover rounded border" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
