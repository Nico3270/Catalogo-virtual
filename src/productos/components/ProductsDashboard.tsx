"use client";

import { Product } from "@/interfaces/product.interface";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Image from "next/image";

interface ProductsDashboardProps {
  initialData: {
    products: Product[];
    totalPages: number;
  };
  fetchProducts: (page: number) => Promise<{ products: Product[] }>;
}

export const ProductsDashboard = ({ initialData, fetchProducts }: ProductsDashboardProps) => {
  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (_: React.ChangeEvent<unknown>, page: number) => {
    setIsLoading(true);

    // Obtén los datos de la página de manera asíncrona
    const data = await fetchProducts(page);

    // Actualiza el estado con startTransition para no bloquear la UI
    React.startTransition(() => {
      setProducts(data.products);
      setCurrentPage(page);
      setIsLoading(false);
    });
  };

  return (
    <div className="relative">
      <table className="min-w-full border-collapse table-auto text-left">
        <thead>
          <tr className="border-b">
            <th className="p-4">Imagen</th>
            <th className="p-4">Título</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Editar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <Image
                  src={product.imagenes[0] || "/imgs/imagen-prueba.webp"} // Imagen predeterminada
                  alt={product.nombre}
                  width={64}  // Ancho fijo
                  height={64} // Alto fijo
                  className="rounded-md object-cover"
                />

              </td>
              <td className="p-4">{product.nombre}</td>
              <td className="p-4">${product.precio.toFixed(2)}</td>
              <td className="p-4">
                <a
                  href={`/dashboard/productos/${product.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4 sm:pb-8 pb-8">
        <Stack spacing={2} className="flex justify-center">
          <Pagination
            count={initialData.totalPages}
            color="secondary"
            page={currentPage}
            onChange={handlePageChange}
            disabled={isLoading}
          />
        </Stack>
      </div>
    </div>
  );
};
