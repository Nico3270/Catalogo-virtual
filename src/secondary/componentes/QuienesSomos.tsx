"use client";

import { DeliusFont, FunelSansFont, OldenburgFont, RubikFont } from "@/config/fonts";
import React from "react";


export interface Tarjeta {
  icono: React.ReactNode; // Icono de react-icons
  titulo: string; // Título de la tarjeta
  descripcion: string; // Descripción breve
}

interface Props {
  tarjetas: Tarjeta[];
}

const QuienesSomos: React.FC<Props> = ({ tarjetas }) => {
  return (
    <section className="w-full bg-gradient-to-b from-[#eef2f3] to-[#d9e6ea] py-6 px-6 ">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h2 className={`text-4xl font-extrabold text-[#D91656] ${RubikFont.className}`}>Conoce Nuestra Historia</h2> 
      </div>

      {/* Carrusel de Tarjetas */}
      <div className="flex overflow-x-auto gap-6 px-4">
        {tarjetas.map((tarjeta, index) => (
          <div
          key={index}
          className="flex flex-col items-center text-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow min-w-[380px] md:min-w-[300px] h-[250px] mb-24 sm:mb-0"
        >
          {/* Icono */}
          <div className="text-3xl text-[#640D5F] mb-2">{tarjeta.icono}</div>
        
          {/* Título */}
          <h3 className={`text-xl font-bold text-[#640D5F] ${DeliusFont.className}`}>{tarjeta.titulo}</h3>
        
          {/* Descripción */}
          <p className={`text-sm font-bold text-gray-600 mt-1 ${OldenburgFont.className}`}>{tarjeta.descripcion}</p>
        </div>
        
        
        ))}
      </div>
    </section>
  );
};

export default QuienesSomos;
