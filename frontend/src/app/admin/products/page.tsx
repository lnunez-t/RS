'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

type Variant = {
  size: string;
  color: string;
  stock: number;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images: string[];
  variants: Variant[];
  visible?: boolean;
};

export default function ProductAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('http://localhost:4338/useradmin/verify-token', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Token invalide');
        setLoading(false);

        const productsRes = await fetch('http://localhost:4338/clothing/all_clothing/admin', {
          credentials: 'include',
        });
        const data = await productsRes.json();

        if (!productsRes.ok) {
          console.error('Erreur lors du chargement des produits', data);
          return;
        }

        setProducts(data.results);
      } catch (error) {
        console.error('Erreur dans useEffect :', error);
        router.push('/admin/login');
      }
    };

    init();
  }, []);

  const toggleVisibility = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`http://localhost:4338/clothing/${id}/visibility`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ visible: !current }),
      });

      if (res.ok) {
        setProducts(products.map(p => (p._id === id ? { ...p, visible: !current } : p)));
      } else {
        alert("Erreur lors du changement de visibilité");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce produit ?')) {
      try {
        const res = await fetch(`http://localhost:4338/clothing/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const contentType = res.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        if (!res.ok) {
          const error = isJson ? await res.json() : { error: 'Erreur inconnue' };
          alert(error.error || 'Erreur');
          return;
        }

        alert('Produit supprimé avec succès');
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error('Erreur de suppression:', err);
        alert('Erreur réseau');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des vêtements</h1>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.push('/admin/addProduct')}
      >
        + Ajouter un produit
      </button>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className={`border p-4 rounded shadow relative ${product.visible === false ? 'grayscale opacity-60' : ''}`}
          >
            {product.images?.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-700">{product.description}</p>
            <p className="font-medium">Prix : {product.price} €</p>
            <div className="text-sm text-gray-600">
              {product.variants.map((v, i) => (
                <span key={i}>
                  {v.size} - {v.color} : {v.stock} en stock
                  {i < product.variants.length - 1 && ', '}
                </span>
              ))}
            </div>

            <div className="mt-2 flex gap-2 items-center">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => router.push(`/admin/products/${product._id}/edit`)}
              >
                Modifier
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(product._id)}
              >
                Supprimer
              </button>
              <button
                className={`ml-auto px-3 py-1 rounded ${product.visible ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                onClick={() => toggleVisibility(product._id, product.visible ?? true)}
              >
                {product.visible ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
