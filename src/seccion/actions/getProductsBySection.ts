"use server";

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces/product.interface";

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

    // Formatea los productos para que coincidan con la interfaz Product
    const formattedProducts: Product[] = section.products.map((productSection: { product: any }) => {
      const product = productSection.product;

      return {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagenes: product.imagenes.map((img: { url: string }) => img.url), // Mapea las URLs de las imágenes
        descripcion: product.descripcion,
        seccionIds: product.secciones.map((s: { sectionId: string }) => s.sectionId), // Mapea los IDs de las secciones
        descripcionCorta: product.descripcionCorta || "",
        slug: product.slug,
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        prioridad: product.prioridad ?? undefined,
        status: product.status as "available" | "out_of_stock" | "discontinued",
      };
    });

    return { productos: formattedProducts, sectionName: section.nombre };
  } catch (error) {
    console.error("Error al obtener productos por sección:", error);
    return { productos: [], sectionName: null };
  }
};
