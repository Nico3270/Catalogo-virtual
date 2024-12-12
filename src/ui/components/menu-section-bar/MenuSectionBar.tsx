"use client";

import { titleFont } from "@/config/fonts";
import { getSectionsFromDB } from "@/seccion/actions/getSectionsFromDB";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Section } from "@/seccion/actions/getSectionsFromDB";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as IoIcons5 from "react-icons/io5";
import * as iconsTb from "react-icons/tb";

export const MenuSectionsBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const fetchedSections = await getSectionsFromDB();
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error al cargar las secciones:", error);
      }
    };
    fetchSections();
  }, []);

  // Combina todos los conjuntos de íconos
  const IconSets = { ...FaIcons, ...IoIcons, ...GiIcons, ...MdIcons, ...IoIcons5, ...iconsTb };

  return (
    <div className="relative w-full bg-[#f7ede2]">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 p-4 w-full bg-[#f8edeb] rounded-lg no-scrollbar justify-around md:justify-around"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {sections.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col items-center text-center min-w-[80px] max-w-[100px] md:min-w-0"
              >
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="mt-2 h-3 w-16 bg-gray-300 rounded"></div>
              </div>
            ))
          : sections.map((section) => {
              // Resuelve el ícono dinámicamente
              const IconComponent =
                IconSets[section.iconName as keyof typeof IconSets] || FaIcons.FaQuestion;

              return (
                
                <Link key={section.id} href={`/seccion/${section.href}`}>
                  <div className="flex flex-col items-center text-center min-w-[80px] max-w-[100px] md:min-w-0">
                    <IconComponent className="text-xl text-[#4a4e69] hover:text-[#b23a48]" />
                    <span
                      className={`text-sm mt-2 hover:text-[#b23a48] break-words text-[#4a4e69] ${titleFont.className}`}
                    >
                      {section.name}
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};
