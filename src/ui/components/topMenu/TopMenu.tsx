"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import Image from "next/image";
import { SideBar } from "../side-bar/SideBar";
import { MenuSectionsBar } from "../menu-section-bar/MenuSectionBar";
import { Sour_Gummy_Font } from "@/config/fonts";
import {
  App_Nombre1,
  App_Nombre2,
  Color_Fondo_Barra_Navegacion_Principal,
  Color_Iconos_Barra_Principal,
  Color_Letra_secciones,
  Color_Letras_Logo,
  EnlacesNavegacionTopMenu,
  HeightLogo,
  Ruta_Logo,
  WidthLogo,
} from "@/config/config";
import { useCartCatalogoStore } from "@/store/carro/carro-store";
import { useFavoritesCatalogoStore } from "@/store/favoritos/favoritos-store";

export const TopMenu = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const totalItemsInCart = useCartCatalogoStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesCatalogoStore((state) => state.getTotalItems());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  // Renderizar un fallback si no está hidratado
  if (!hydrated) {
    return null;
  }

  return (
    <header
      style={{
        backgroundColor: Color_Fondo_Barra_Navegacion_Principal,
        color: Color_Letra_secciones,
      }}
      className="py-2 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo de la empresa */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={Ruta_Logo || "/default-logo.png"}
              alt="Logo"
              width={WidthLogo}
              height={HeightLogo}
            />
          </Link>
          <div className="ml-4 text-left">
            <Link href="/">
              <span
                style={{ color: Color_Letras_Logo }}
                className={`block text-xl font-bold leading-tight ${Sour_Gummy_Font.className}`}
              >
                {App_Nombre1}
              </span>
              <span
                style={{ color: Color_Letras_Logo }}
                className={`block text-xl font-bold leading-tight ${Sour_Gummy_Font.className}`}
              >
                {App_Nombre2}
              </span>
            </Link>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <nav className="space-x-8 hidden md:flex">
          {EnlacesNavegacionTopMenu.map((item) => (
            <Link
              key={item.section}
              href={item.ruta}
              className={`hover:text-current ${Sour_Gummy_Font.className} font-bold text-xl`}
            >
              {item.section}
            </Link>
          ))}
        </nav>

        {/* Iconos */}
        <div className="flex space-x-6 items-center">
          <Link
            href={totalItemsInCart === 0 ? "/empty" : "/carro"}
            className="relative hover:text-gray-400"
          >
            <FaShoppingCart
              style={{ color: Color_Iconos_Barra_Principal }}
              className="text-2xl"
            />
            {totalItemsInCart > 0 && (
              <span
                className="absolute top-0 right-0 bg-white text-[#f07167] font-bold rounded-full text-xs w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
              >
                {totalItemsInCart}
              </span>
            )}
          </Link>
          <Link href="/favoritos" className="relative hover:text-gray-400">
            <FaHeart
              style={{ color: Color_Iconos_Barra_Principal }}
              className="text-2xl"
            />
            {totalFavorites > 0 && (
              <span
                className="absolute top-0 right-0 bg-white text-[#f07167] font-bold rounded-full text-xs w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
              >
                {totalFavorites}
              </span>
            )}
          </Link>
          <button onClick={() => toggleDrawer(true)}>
            <FaUser
              style={{ color: Color_Iconos_Barra_Principal }}
              className="text-2xl"
            />
          </button>
        </div>
      </div>
      <SideBar open={isDrawerOpen} toggleDrawer={toggleDrawer} role="admin" />
      <MenuSectionsBar />
    </header>
  );
};
