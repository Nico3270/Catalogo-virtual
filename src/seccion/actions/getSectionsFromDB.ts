"use server";

import prisma from "@/lib/prisma";

// Interfaz para el formato de la sección en el frontend
export interface Section {
  id: string;
  name: string;
  iconName: string; // Solo el nombre del ícono
  href: string;
}

// Interfaz para las secciones de Prisma
export interface PrismaSection {
  id: string;
  nombre: string;
  slug: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export const getSectionsFromDB = async (): Promise<Section[]> => {
  try {
    // Consulta a la base de datos para obtener secciones activas y ordenadas
    const sections: PrismaSection[] = await prisma.section.findMany({
      where: { isActive: true }, // Solo secciones activas
      orderBy: { order: "asc" }, // Ordenar por el campo `order` ascendentemente
    });

    // Mapeo para transformar los datos según el formato requerido
    return sections.map((section) => ({
      id: section.id,
      name: section.nombre,
      href: section.slug,
      iconName: section.iconName, // Pasar solo el nombre del ícono como cadena
    }));
  } catch (error) {
    console.error("Error al obtener secciones:", error);
    return [];
  }
};
