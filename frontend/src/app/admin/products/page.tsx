'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
};

export default function ProductAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Charger les produits existants
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:4338/clothing/all_clothing');
      const data = await res.json();
      console.log(data.results);
      setProducts(data.results);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce produit ?')) {
      await fetch(`http://localhost:4338/clothing/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
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
          <div key={product._id} className="border p-4 rounded shadow">
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
            <div className="mt-2 flex gap-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
