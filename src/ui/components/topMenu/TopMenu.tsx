"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { SideBar } from "../side-bar/SideBar";
import { MenuSectionsBar } from "../menu-section-bar/MenuSectionBar";
import {  Sour_Gummy_Font } from "@/config/fonts";
import { App_Nombre1, App_Nombre2, Color_Circulo_Numero_Iconos, Color_Fondo_Barra_Navegacion_Principal, Color_Iconos_Barra_Principal, Color_Letra_secciones, Color_Letras_Logo, ColorHoverLetrasSecciones, EnlacesNavegacionTopMenu, HeightLogo, Ruta_Logo, WidthLogo } from "@/config/config";


export const TopMenu = ({ totalItemsInCart = 0, totalFavorites = 0 }: { totalItemsInCart: number; totalFavorites: number }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <header className={`bg-[${Color_Fondo_Barra_Navegacion_Principal}] text-[${Color_Letra_secciones}] py-2 shadow-lg sticky top-0 z-50`}>

      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo de la empresa */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={Ruta_Logo}
              alt="Logo"
              width={WidthLogo}
              height={HeightLogo}
            />
          </Link>
          <div className="ml-4 text-left">
            <Link href="/">
              <span className={`block text-xl font-bold leading-tight ${Sour_Gummy_Font.className} text-[${Color_Letras_Logo}]`}>
                {App_Nombre1}
              </span>
              <span className={`block text-xl font-bold leading-tight ${Sour_Gummy_Font.className} text-[${Color_Letras_Logo}]`}>
                {App_Nombre2}
              </span>
            </Link>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <nav className="space-x-8 hidden md:flex">
          {EnlacesNavegacionTopMenu.map(
            (item) => (
              <Link
                key={item.section}
                href={`/${item.section.toLowerCase()}`}
                className={`hover:text-[${ColorHoverLetrasSecciones}] ${Sour_Gummy_Font.className} font-bold text-xl`}
              >
                {item.section}
              </Link>
            )
          )}
        </nav>

        

        {/* Iconos */}
        <div className="flex space-x-6 items-center">
          <Link
            href={totalItemsInCart === 0 ? "/empty" : "/cart"}
            className="relative hover:text-gray-400"
          >
            <FaShoppingCart className={`text-2xl text-[${Color_Iconos_Barra_Principal}]`} />
            {totalItemsInCart > 0 && (
              <span className={`absolute top-0 right-0 ${Color_Circulo_Numero_Iconos} font-bold rounded-full text-sm w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2`}>
                {totalItemsInCart}
              </span>
            )}
          </Link>
          <Link href="/favorites" className="relative hover:text-gray-400">
            <FaHeart className={`text-2xl text-[${Color_Iconos_Barra_Principal}]`} />
            {totalFavorites > 0 && (
              <span className={`absolute top-0 right-0 ${Color_Circulo_Numero_Iconos} font-bold rounded-full text-sm w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2`}>
                {totalFavorites}
              </span>
            )}
          </Link>
          <button onClick={() => toggleDrawer(true)} className={`text-2xl text-[${Color_Iconos_Barra_Principal}]`}>
            <FaUser className={`text-2xl text-[${Color_Iconos_Barra_Principal}]`} />
          </button>
        </div>
      </div>
      <SideBar open={isDrawerOpen} toggleDrawer={toggleDrawer} role="admin"/>
      <MenuSectionsBar />
    </header>
  );
};
