"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/ProductContext";

const filterOptions = [
  { id: 1, name: "TYPE" },
  { id: 2, name: "TAILLE" },
  { id: 3, name: "MARQUE" },
];

export default function ShopPage() {
  const router = useRouter();
  const { selectProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `http://localhost:4338/clothing/all_clothing?page=${pageNumber}&limit=9`
      );
      const data = await res.json();
      console.log(data.results);
      setProducts(data.results);
      setPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product: any) => {
    selectProduct(product);
    console.log(product.image);
    router.push("/Product");
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchProducts(newPage);
  };

 

  return (
    <div className="bg-[#faf2ea] w-full px-4 sm:px-6 lg:px-12 py-8">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant="outline"
                className="h-10 bg-[#faf2ea] border-2 border-[#ffae9d] rounded-none font-semibold text-[#392e2c] text-[15px]"
              >
                {filter.name}
              </Button>
            ))}
          </div>
          <div className="sm:ml-auto flex items-center mt-2 sm:mt-0">
            <span className="font-semibold text-[#392e2c] text-[15px] mr-2">
              TRIER PAR :
            </span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>

        {/* Produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="cursor-pointer flex flex-col"
              onClick={() => handleProductClick(product)}
            >
              <Card className="rounded-none border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <img
                    className="w-full h-auto object-cover"
                    alt={product.name}
                    src={product.images?.[0]}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <h3 className="font-bold text-[#392e2c] text-lg">
                  {product.name}
                </h3>
                <span className="font-bold text-[#392e2c] text-lg mt-2 block">
                  {product.price} €
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dynamique */}
        <Pagination className="mt-16 flex justify-center">
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  isActive={num === page}
                  onClick={() => handlePageChange(num)}
                  className="cursor-pointer font-bold text-[#392e2c] text-xl sm:text-2xl"
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
