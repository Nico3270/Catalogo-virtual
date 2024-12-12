import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { Ruta_Logo } from "@/config/config";
import { Sour_Gummy_Font } from "@/config/fonts";

export const Footer = () => {
  return (
    <footer className="bg-[#f8edeb] text-[#ba5b4f] py-6 pb-20 md:pb-6">

      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-6 md:space-y-0">
        {/* Columna izquierda: Logo y nombre */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={Ruta_Logo} // Cambia a la ruta de tu logo
              alt="Parrilla Internacional Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Link>
          <div>
            <Link href="/">
              <h2 className="text-2xl font-bold text-[#4a4e69]">Detalles Sorpresas y Regalos</h2>
            </Link>
            <p className="text-sm text-[#4a4e69]">Detalles para todo tipo de ocasión en Tunja.</p>
          </div>
        </div>

        {/* Columna central: Redes Sociales */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-bold text-[#4a4e69]">Síguenos</h3>
          <div className="flex space-x-4">
            <Link
              href="https://wa.me/123456789"
              target="_blank"
              className="text-[#ba5b4f] hover:text-green-500 transition-colors"
            >
              <FaWhatsapp size={28} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-[#ba5b4f] hover:text-blue-500 transition-colors"
            >
              <FaFacebookF size={28} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-[#ba5b4f] hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={28} />
            </Link>
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="text-[#ba5b4f] hover:text-black transition-colors"
            >
              <FaTiktok size={28} />
            </Link>
          </div>
        </div>

        {/* Columna derecha: Secciones en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-[#4a4e69]">Secciones</h3>
            <Link href="/contact" className={`hover:text-[#FFB200] transition-colors ${Sour_Gummy_Font.className}`}>
              Contacto
            </Link>
            <Link href="/services" className={`hover:text-[#FFB200] transition-colors ${Sour_Gummy_Font.className}`}>
              Servicios
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-[#4a4e69]">Más</h3>
            <Link href="/products" className={`hover:text-[#FFB200] transition-colors ${Sour_Gummy_Font.className}`}>
              Productos
            </Link>
            <Link href="/gallery" className={`hover:text-[#FFB200] transition-colors ${Sour_Gummy_Font.className}`}>
              Galería
            </Link>
          </div>
        </div>
      </div>

      {/* Línea inferior: Derechos Reservados */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <p className="text-sm text-[#4a4e69]">
          © {new Date().getFullYear()} Detalles Sorpresas y Regalos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
