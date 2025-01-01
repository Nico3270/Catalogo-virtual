"use client";

import { FaShoppingCart } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces/product.interface";
import { useState, useEffect } from "react";
import { Precio } from "./Precio";
import { AddFavorites } from "./AddFavorites";
import { descripcionCard, tituloCard } from "@/config/fonts";
import { InfoEmpresa as empresa } from "@/config/config";

interface ProductCardProps {
  product: Product;
}

const urlWebProduccion = empresa.linkWebProduccion

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.imagenes[0]);
  const [baseUrl, setBaseUrl] = useState(urlWebProduccion);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // Crear el mensaje para WhatsApp con formato adecuado
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Estoy interesado en el siguiente producto:\n\n` +
    `*${product.nombre}*\n` +
    `Precio: $${product.precio.toFixed(2)}\n\n` +
    `Puedes ver más detalles aquí: ${baseUrl}/producto/${product.slug}`
  );

  return (
    <div className="fondo tarjeta rounded-lg shadow-lg p-4 relative">
      {/* Imagen y enlace al producto */}
      <Link href={`/producto/${product.slug}`}>
        <div className="relative h-56 w-full cursor-pointer">
          <Image
            src={displayImage}
            alt={product.nombre + product.descripcion}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
            onMouseEnter={() => setDisplayImage(product.imagenes[0])}
            onMouseLeave={() => setDisplayImage(product.imagenes[1] || product.imagenes[0])}
          />
        </div>
      </Link>

      {/* Botón de favoritos fuera del Link */}
      <div className="absolute top-2 right-2 z-20">
        <AddFavorites
          id={product.id}
          title={product.nombre}
          price={product.precio}
          description={product.descripcion}
          slug={product.slug}
          images={[product.imagenes[0]]}
        />
      </div>

      {/* Información del producto */}
      <div className="mt-4">
        <Link href={`/producto/${product.slug}`}>
          <h3 className={`text-lg font-bold color-titulo-tarjeta ${tituloCard.className}`}>
            {product.nombre}
          </h3>
        </Link>
        <p className={`text-lg font-bold color-descripcion-tarjeta ${descripcionCard.className}`}>
          {product.descripcion.length > 80
            ? `${product.descripcion.substring(0, 80)}...`
            : product.descripcion}
          {product.descripcion.length > 80 && (
            <Link
              href={`/producto/${product.slug}`}
              className="text-red-500 hover:underline ml-1"
            >
              Ver más
            </Link>
          )}
        </p>
      </div>

      {/* Precio y botones de acciones */}
      <div className="mt-4 flex justify-between items-center gap-2">
        <Precio value={product.precio} />

        {/* Botón de agregar al carrito */}
        <Link href={`/producto/${product.slug}`}>
          <button
            className={`color-boton-agregar texto-boton px-4 py-2 rounded-full  flex items-center`}
          >
            <FaShoppingCart className="mr-2" />
            Agregar
          </button>
        </Link>

        {/* Botón de WhatsApp */}
        <a
          href={`https://wa.me/57${empresa.telefono}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-2 rounded-full hover:bg-green-600 flex items-center justify-center"
        >
          <BsWhatsapp className="text-white text-xl" />
        </a>
      </div>
    </div>
  );
};
