"use client";

import { RubikFont } from "@/config/fonts";
import React from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const RedesSocialesContact: React.FC = () => {
  const direccion = "Carrera 9A # 7-03 Sur, Tunja"; // Cambia esto por tu dirección
  const googleMapsIframeSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.394594074716!2d-73.37225322535299!3d5.508293434128291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7de1c1eac06f%3A0xcbfdc6875cf68173!2sCra.%209A%20%237-14%2C%20Tunja%2C%20Boyac%C3%A1!5e0!3m2!1sen!2sco!4v1732853148670!5m2!1sen!2sco";

  return (
    <section
      className="w-full h-full bg-gradient-to-b from-[#FBFBFB] to-[#FBFBFB] p-2 flex flex-col justify-between items-center text-center rounded-xl shadow-xl"
      aria-label="Contacto y Redes Sociales"
    >
      {/* Título */}
      <div className="text-center mb-4">
        <h2 className={`text-4xl font-extrabold text-[#D91656] ${RubikFont.className}`}>
          Encuéntranos en
        </h2>
      </div>

      {/* Iconos de redes sociales */}
      <div className="flex justify-center gap-6 mb-2" aria-label="Síguenos en redes sociales">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          title="Contáctanos por WhatsApp"
          className="bg-[#25D366] text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
        <a
          href="https://facebook.com/tu-pagina"
          target="_blank"
          rel="noopener noreferrer"
          title="Visita nuestra página de Facebook"
          className="bg-[#1877F2] text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md"
        >
          <FaFacebookF className="text-3xl" />
        </a>
        <a
          href="https://instagram.com/tu-perfil"
          target="_blank"
          rel="noopener noreferrer"
          title="Síguenos en Instagram"
          className="bg-gradient-to-r from-[#E1306C] via-[#F77737] to-[#833AB4] text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://tiktok.com/@tu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          title="Encuéntranos en TikTok"
          className="bg-[#000000] text-white p-3 rounded-full hover:scale-110 transition-transform shadow-md"
        >
          <FaTiktok className="text-3xl" />
        </a>
      </div>

      {/* Dirección y Google Maps */}
      <div className="flex flex-col items-center gap-1  w-full" aria-label="Nuestra ubicación">
        <p className="text-lg text-[#2d3748] font-medium">{direccion}</p>
        {/* Mapa embebido */}
        <iframe
          src={googleMapsIframeSrc}
          className="w-full  rounded-lg border-0 shadow-lg"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default RedesSocialesContact;
