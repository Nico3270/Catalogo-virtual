"use client";

import { titleFont } from "@/config/fonts";
import { getSectionsFromDB } from "@/seccion/actions/getSectionsFromDB";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Section } from "@/seccion/actions/getSectionsFromDB";
import * as FaIcons from "react-icons/fa";   // Font Awesome
import * as IoIcons from "react-icons/io";   // Ionicons 4
import * as IoIcons5 from "react-icons/io5"; // Ionicons 5
import * as GiIcons from "react-icons/gi";   // Game Icons
import * as MdIcons from "react-icons/md";   // Material Design Icons
import * as iconsTb from "react-icons/tb";
import * as TbIcons from "react-icons/tb";   // Tabler Icons
import * as FiIcons from "react-icons/fi";   // Feather Icons
import * as RiIcons from "react-icons/ri";   // Remix Icons
import * as BiIcons from "react-icons/bi";   // BoxIcons
import * as AiIcons from "react-icons/ai";   // Ant Design Icons
import * as BsIcons from "react-icons/bs";   // Bootstrap Icons
import * as CgIcons from "react-icons/cg";   // CSS.gg Icons
import * as HiIcons from "react-icons/hi";   // Heroicons 4
import * as HiIcons2 from "react-icons/hi2"; // Heroicons 5
import * as Fa6Icons from "react-icons/fa6"; // Font Awesome 6 (Regular, Solid, Brands)


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
  const IconSets = { ...FaIcons, ...IoIcons, ...GiIcons, ...MdIcons, ...IoIcons5, ...iconsTb, ...TbIcons, ...FiIcons, ...RiIcons, ...BiIcons, ...AiIcons, ...BsIcons, 
    ...CgIcons, ...HiIcons, ...HiIcons2, ...Fa6Icons
   };

  return (
    <div className="relative w-full color-fondo-principal">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 p-4 w-full  rounded-lg no-scrollbar justify-around md:justify-around color-principal"
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
                    <IconComponent className="text-xl color-iconos" />
                    <span
                      className={`text-sm mt-2  break-words ${titleFont.className} color-iconos`}
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
