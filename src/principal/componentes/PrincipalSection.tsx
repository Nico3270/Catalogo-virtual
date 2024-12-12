"use client";

import { RubikFont } from "@/config/fonts";
import { CarruselSections } from "./CarruselSections";
import RedesSocialesContact from "./RedesSocialesContact";
import Testimonials from "./Testimonials";

const secciones = [
  {
    titulo: "Detalles Florales",
    descripcion: "Detalles florales para diferentes ocasiones, como fiestas de grado, de cumpleaños, de 15 años y mucho más.",
    imagen: "imgs/detalles_florales.webp",
    url: "detalles_florales",
  },
  {
    titulo: "Desayunos Sorpresa",
    descripcion: "Descubre la magia de los desayunos sorpresa: la mejor manera de empezar el día con una sonrisa.",
    imagen: "imgs/desayunos_sorpresa.webp",
    url: "desayunos_sorpresa",
  },
];

const testimonios = [
  {
    imagen: "/imgs/persona1.webp",
    titulo: "Ana Gómez",
    descripcion: "¡El mejor desayuno sorpresa que he recibido! El detalle y la presentación fueron increíbles.",
  },
  {
    imagen: "/imgs/persona2.webp",
    titulo: "Carlos Méndez",
    descripcion: "Gracias por los detalles florales. Mi mamá quedó encantada con el regalo.",
  },
  {
    imagen: "/imgs/persona3.webp",
    titulo: "Laura Fernández",
    descripcion: "Recomendadísimos. El servicio y la calidad son de primera.",
  },
];

const PrincipalSection = () => {
  return (
    <section className="container mx-auto px-1">
      <h1 className={`text-4xl font-bold text-center text-[#D91656] mb-4 mt-2 ${RubikFont.className}`}>
        Somos Detalles Sorpresas y Regalos
      </h1>
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Carrusel */}
        <div className="lg:col-span-2 bg-gradient-to-b from-[#FBFBFB] to-[#FBFBFB] p-1 mt-5">
          
          <CarruselSections secciones={secciones} />
        </div>

        {/* Columnas para redes sociales y testimonios */}
        <div className="flex flex-col gap-4">
          {/* Caja superior: Redes Sociales e Información de Contacto */}
          <div className="flex-1 bg-gradient-to-b from-[#FBFBFB] to-[#FBFBFB] flex items-center justify-center p-1">
            
            <RedesSocialesContact />
          </div>

          {/* Caja inferior: Testimonios */}
          <div className="flex-1 bg-gradient-to-b from-[#FBFBFB] to-[#FBFBFB] flex items-center justify-center p-1">
            
            <Testimonials testimonios={testimonios} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalSection;
