"use client";

import { LatoFont, RubikFont, Sour_Gummy_Font } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export interface Articulo {
  id: string; // Identificador único
  slug: string; // Identificador para la ruta dinámica
  titulo: string; // Título del artículo
  descripcion: string; // Breve descripción del artículo
  imagen: string; // Imagen destacada para el carrusel
  imagenes: string[]; // Array de URLs para imágenes adicionales
  parrafos: string[]; // Contenido dividido en varios párrafos
  subtitulos: string[]; // Subtítulos para dividir secciones
  fechaPublicacion: Date; // Fecha de publicación
  autor: string; // Nombre del autor
}
export interface ArticuloCarrusel {
  titulo: string; // Título del artículo
  imagen: string; // URL de la imagen destacada
  descripcion: string; // Breve descripción del artículo
  slug: string; // Identificador para la ruta dinámica
}

interface Props {
  articulos: ArticuloCarrusel[];
}

const BlogArticulos: React.FC<Props> = ({ articulos }) => {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#eef2f3] to-[#d9e6ea] py-4 px-6 pb-0">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h2 className={`text-4xl font-extrabold text-[#D91656] ${RubikFont.className}`}>
          Explora Nuestros Artículos
        </h2>
        <p className="text-gray-700 text-lg mt-2">
          Consejos, ideas y tendencias sobre regalos personalizados y detalles
          únicos.
        </p>
      </div>

      {/* Carrusel de Artículos */}
      <div className="flex overflow-x-auto gap-2 px-4">
        {articulos.map((articulo, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow min-w-[280px] md:min-w-[300px] h-[400px] mb-6 sm:mb-0"
          >
            <Link href={`/blog/${articulo.slug}`}>
              {/* Imagen */}
              <div className="relative w-full h-40 mb-4">
                <img
                  src={articulo.imagen}
                  alt={articulo.titulo}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              {/* Título */}
              <h3 className={`text-lg font-bold text-[#D91656] mb-2 ${Sour_Gummy_Font.className}`}>
                {articulo.titulo}
              </h3>

              {/* Descripción truncada */}
              <p className={`text-md text-[#640D5F] mb-4 ${LatoFont.className}`}>
                {truncateText(articulo.descripcion, 100)}{" "}
                <span className="text-[#D91656] font-semibold hover:underline">
                  Ver más
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogArticulos;