"use server";

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces/product.interface";
import { Prisma } from "@prisma/client"; // Importa el espacio de nombres Prisma

// Define la función para obtener productos y el nombre de la sección
export const getProductsBySection = async (
  sectionSlug: string
): Promise<{ productos: Product[]; sectionName: string | null }> => {
  try {
    // Busca la sección correspondiente al slug
    const section = await prisma.section.findUnique({
      where: { slug: sectionSlug },
      include: {
        products: {
          include: {
            product: {
              include: {
                imagenes: true, // Incluye las imágenes relacionadas
                secciones: true, // Incluye las secciones relacionadas
              },
            },
          },
        },
      },
    });

    if (!section) {
      console.error(`Sección no encontrada para el slug: ${sectionSlug}`);
      return { productos: [], sectionName: null };
    }

    // Utilizamos el tipo correcto generado por Prisma
    type SectionWithProducts = Prisma.SectionGetPayload<{
      include: {
        products: {
          include: {
            product: {
              include: { imagenes: true; secciones: true };
            };
          };
        };
      };
    }>;

    const formattedProducts: Product[] = (section as SectionWithProducts).products.map(
      (productSection) => {
        const product = productSection.product;

        return {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagenes: product.imagenes.map((img) => img.url), // Extraer URLs de imágenes
          descripcion: product.descripcion,
          seccionIds: product.secciones.map((s) => s.sectionId), // Extraer IDs de secciones
          descripcionCorta: product.descripcionCorta || "",
          slug: product.slug,
          tags: product.tags,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          prioridad: product.prioridad ?? undefined,
          status: product.status as "available" | "out_of_stock" | "discontinued",
        };
      }
    );

    return { productos: formattedProducts, sectionName: section.nombre };
  } catch (error) {
    console.error("Error al obtener productos por sección:", error);
    return { productos: [], sectionName: null };
  }
};
