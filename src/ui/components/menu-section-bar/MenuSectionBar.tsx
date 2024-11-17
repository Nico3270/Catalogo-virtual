"use client";


import { titleFont,} from "@/config/fonts";
import { sectionsMenuSectionsBar } from "@/seed/seed";
import Link from "next/link";
import React, { useRef } from "react";



export const MenuSectionsBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full bg-[#f7ede2]">
      {/* Contenedor con padding-left en pantallas pequeñas y distribución en pantallas grandes */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 p-4 w-full bg-[#f8edeb] rounded-lg no-scrollbar justify-around md:justify-around"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {sectionsMenuSectionsBar.map((section, index) => (
          <Link key={index} href={`/section/${section.href}`}>
            <div className="flex flex-col items-center text-center min-w-[80px] max-w-[100px] md:min-w-0">
              <section.icon className={`text-xl  text-[#4a4e69] hover:text-[#b23a48] `}/>
              <span
                className={`text-sm mt-2 hover:text-[#b23a48] break-words text-[#4a4e69] ${titleFont.className}`}
              >
                {section.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
