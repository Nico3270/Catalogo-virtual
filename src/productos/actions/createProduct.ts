"use server";

import prisma from "@/lib/prisma";

interface CreateProductInput {
  nombre: string;
  precio: number;
  descripcion: string;
  descripcionCorta?: string;
  slug: string;
  prioridad?: number;
  status: "available" | "out_of_stock" | "discontinued";
  tags: string[];
  seccionIds: string[];
  newImages: string[];
}

export async function createProduct(input: CreateProductInput) {
  try {
    // Validar que las secciones existen
    const existingSections = await prisma.section.findMany({
      where: { id: { in: input.seccionIds } },
      select: { id: true },
    });

    const existingSectionIds = existingSections.map((section) => section.id);
    if (existingSectionIds.length !== input.seccionIds.length) {
      throw new Error("Algunas secciones no existen en la base de datos.");
    }

    // Crear el producto sin relaciones inicialmente
    const product = await prisma.product.create({
      data: {
        nombre: input.nombre,
        precio: input.precio,
        descripcion: input.descripcion,
        descripcionCorta: input.descripcionCorta,
        slug: input.slug,
        prioridad: input.prioridad ?? 0,
        status: input.status,
        tags: input.tags,
        imagenes: {
          create: input.newImages.map((url) => ({ url })),
        },
      },
    });

    // Conectar las relaciones con las secciones
    await prisma.productSection.createMany({
      data: input.seccionIds.map((sectionId) => ({
        productId: product.id,
        sectionId,
      })),
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("No se pudo crear el producto. Verifica los datos enviados.");
  }
}
