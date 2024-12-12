"use server";

import prisma from "@/lib/prisma";
import { Product } from "@/interfaces/product.interface";

// Define la función para obtener un producto por su slug
export const getProductBySlug = async (slug: string): Promise<{
  product: Product | null;
  similarProducts: Product[];
}> => {
  try {
    // Buscar el producto por el slug
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        imagenes: true, // Incluir imágenes relacionadas
        secciones: true, // Incluir secciones relacionadas
      },
    });

    if (!product) {
      return { product: null, similarProducts: [] };
    }

    // Formatear el producto para que coincida con la interfaz `Product`
    const formattedProduct: Product = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagenes: product.imagenes.map((img: { url: string }) => img.url), // Especifica el tipo de `img`
      descripcion: product.descripcion,
      seccionIds: product.secciones.map((s: { sectionId: string }) => s.sectionId), // Especifica el tipo de `s`
      descripcionCorta: product.descripcionCorta || "",
      slug: product.slug,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      prioridad: product.prioridad ?? undefined,
      status: product.status as "available" | "out_of_stock" | "discontinued",
    };

    // Buscar productos similares basados en la primera sección del producto
    const similarProductsData = await prisma.product.findMany({
      where: {
        secciones: {
          some: {
            sectionId: product.secciones[0]?.sectionId, // Basado en la primera sección asociada
          },
        },
        NOT: { id: product.id }, // Excluir el producto actual
      },
      include: {
        imagenes: true, // Incluir imágenes de los productos similares
        secciones: true, // Incluir secciones relacionadas
      },
      take: 8, // Limitar a 8 productos similares
    });

    // Formatear productos similares
    const similarProducts: Product[] = similarProductsData.map((simProd: any) => ({
      id: simProd.id,
      nombre: simProd.nombre,
      precio: simProd.precio,
      imagenes: simProd.imagenes.map((img: { url: string }) => img.url), // Especifica el tipo de `img`
      descripcion: simProd.descripcion,
      seccionIds: simProd.secciones?.map((s: { sectionId: string }) => s.sectionId) || [], // Especifica el tipo de `s`
      descripcionCorta: simProd.descripcionCorta || "",
      slug: simProd.slug,
      tags: simProd.tags,
      createdAt: simProd.createdAt,
      updatedAt: simProd.updatedAt,
      prioridad: simProd.prioridad ?? undefined,
      status: simProd.status as "available" | "out_of_stock" | "discontinued",
    }));

    return { product: formattedProduct, similarProducts };
  } catch (error) {
    console.error("Error al obtener el producto por slug:", error);
    return { product: null, similarProducts: [] };
  }
};
