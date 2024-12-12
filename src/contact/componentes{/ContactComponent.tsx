import { RubikFont, Sour_Gummy_Font } from '@/config/fonts';
import React from 'react';
import {
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from 'react-icons/fa';

const ContactComponent = () => {
  return (
    <div className="w-full h-auto flex flex-col relative">
      {/* Imagen de fondo */}
      <div
        className="w-full h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/imgs/tienda_contacto.webp')" }}
      >
        {/* Título de la tienda */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold bg-black bg-opacity-50 px-6 py-3 rounded-lg">
            Detalles, Sorpresas y Regalos
          </h1>
        </div> */}
      </div>

      {/* Contenedor blanco con título principal y tarjetas */}
      <div className="w-full bg-white flex flex-col py-8 px-4 md:px-16 relative z-20 -mt-16">
        {/* Título principal */}
        <div className="mb-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-[#D91656] ${RubikFont.className} `}>
            ¡Somos Detalles Sorpresas y Regalos!
          </h2>
        </div>

        {/* Contenedor de las tarjetas */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Card Izquierda */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full md:w-3/5 flex flex-col justify-between">
            {/* Horarios y Contacto en una fila */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
              {/* Horarios de apertura */}
              <div className="mb-6 md:mb-0 md:w-1/2">
                <h3 className={`text-xl font-semibold text-[#640D5F] mb-4 text-center md:text-center ${Sour_Gummy_Font.className}`}>
                  Horarios de apertura
                </h3>
                <div className="flex items-start gap-4">
                  <FaClock className=" text-5xl text-[#EB5B00]" />
                  <div className="flex flex-col">
                    <p>Lunes a viernes: 8:00 - 20:00</p>
                    <p>Sábados: 10:00 - 18:00</p>
                    <p>Domingos: 12:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="md:w-1/2">
                <h3 className={`text-xl font-semibold mb-4 text-[#640D5F] text-center md:text-center ${Sour_Gummy_Font.className}`}>
                  Contacto
                </h3>
                <div className="flex items-start gap-4">
                  <FaPhone className=" text-5xl text-[#EB5B00]" />
                  <div className="flex flex-col">
                    <p>Teléfono: 3182293083</p>
                    <p>Correo: detalles@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección y mapa */}
            <div>
              <h3 className={`text-xl font-semibold text-center flex items-center justify-center mb-4 text-[#640D5F] ${Sour_Gummy_Font.className}`}>
                <FaMapMarkerAlt className={`text-2xl mr-2 text-[#EB5B00]`} /> Dirección de la tienda
              </h3>
              <p className="text-center">Carrera 9A # 7-03 Sur, Tunja</p>
              <div className="mt-4">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.394594074716!2d-73.37225322535299!3d5.508293434128291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7de1c1eac06f%3A0xcbfdc6875cf68173!2sCra.%209A%20%237-14%2C%20Tunja%2C%20Boyac%C3%A1!5e0!3m2!1sen!2sco!4v1732853148670!5m2!1sen!2sco"
                  className="w-full h-40 rounded-lg border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Card Derecha (Redes Sociales) */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full md:w-2/5 flex flex-col items-center">
            <h2 className={`text-xl font-bold mb-4 text-[#640D5F] ${Sour_Gummy_Font.className}`}>Síguenos en redes</h2>
            <p className="text-center mb-6">
              Conéctate con nosotros en nuestras redes sociales para conocer más sobre nuestras
              promociones.
            </p>
            {/* Grid de redes sociales */}
            <div className="grid grid-cols-2 gap-4 w-full h-60">
              {/* WhatsApp */}
              <div className="bg-green-500 flex justify-center items-center rounded-lg hover:scale-105 transition-transform">
                <FaWhatsapp className="text-white text-4xl" />
              </div>
              {/* Instagram */}
              <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center rounded-lg hover:scale-105 transition-transform">
                <FaInstagram className="text-white text-4xl" />
              </div>
              {/* Facebook */}
              <div className="bg-blue-600 flex justify-center items-center rounded-lg hover:scale-105 transition-transform">
                <FaFacebook className="text-white text-4xl" />
              </div>
              {/* TikTok */}
              <div className="bg-black flex justify-center items-center rounded-lg hover:scale-105 transition-transform">
                <FaTiktok className="text-white text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
