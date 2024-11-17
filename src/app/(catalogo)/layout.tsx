"use client";

import { TopMenu, TopMenuMobile } from "@/ui";
import React, { useState, useEffect } from "react";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
   
      <main className="bg-white min-h-screen">
        {/* Renderiza TopMenu o TopMenuMobile dependiendo del tamaño de la pantalla */}
        {isMobile ? (
          <TopMenuMobile />
        ) : (
          <TopMenu totalItemsInCart={5} totalFavorites={3} />
        )}


        {/* Contenido principal */}
        <div className="mt-0">{children}</div>
      </main>
 
  );
}
