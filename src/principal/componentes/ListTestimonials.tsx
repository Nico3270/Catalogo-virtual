"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

export interface Testimonial {
  id: string;
  imagen: string;
  titulo: string;
  descripcion: string;
}

interface ListTestimonialsProps {
  testimonios: Testimonial[];
}

const ListTestimonials: React.FC<ListTestimonialsProps> = ({ testimonios }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#D91656] text-white">
          <tr>
            <th className="p-3 text-left">Imagen</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Descripción</th>
            <th className="p-3 text-center">Editar</th>
          </tr>
        </thead>
        <tbody>
          {testimonios.map((testimonio) => (
            <tr
              key={testimonio.id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              {/* Columna Imagen */}
              <td className="p-3">
                <div className="w-20 h-20 relative rounded-md overflow-hidden border border-gray-300">
                  <Image
                    src={testimonio.imagen || "/imgs/image_not_found.webp"}
                    alt={testimonio.titulo}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </td>

              {/* Columna Titulo */}
              <td className="p-3">
                <Link
                  href={`/dashboard/testimonials/${testimonio.id}`}
                  className="text-[#D91656] font-semibold hover:underline"
                >
                  {testimonio.titulo}
                </Link>
              </td>

              {/* Columna Descripción */}
              <td className="p-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {testimonio.descripcion}
              </td>

              {/* Columna Editar */}
              <td className="p-3 text-center">
                <Link href={`/dashboard/testimonials/${testimonio.id}`}>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                    title="Editar Testimonio"
                  >
                    <FaEdit />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {testimonios.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          No hay testimonios disponibles.
        </div>
      )}
    </div>
  );
};

export default ListTestimonials;