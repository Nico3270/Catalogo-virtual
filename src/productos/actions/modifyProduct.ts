"use server";

import prisma from "@/lib/prisma";

interface ModifyProductInput {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  descripcionCorta?: string;
  slug: string;
  prioridad?: number;
  status: string;
  tags: string[];
  seccionIds: string[];
  imagesToDelete: string[];
  newImages: string[];
}

export async function modifyProduct(input: ModifyProductInput): Promise<boolean> {
  try {
    // Actualizar el producto principal
    await prisma.product.update({
      where: { id: input.id },
      data: {
        nombre: input.nombre,
        precio: input.precio,
        descripcion: input.descripcion,
        descripcionCorta: input.descripcionCorta,
        slug: input.slug,
        prioridad: input.prioridad,
        status: input.status,
        tags: input.tags,
      },
    });

    // Eliminar imágenes
    if (input.imagesToDelete.length > 0) {
      await prisma.image.deleteMany({
        where: { id: { in: input.imagesToDelete } },
      });
    }

    // Agregar nuevas imágenes
    if (input.newImages.length > 0) {
      await prisma.image.createMany({
        data: input.newImages.map((url) => ({ url, productId: input.id })),
      });
    }

    // Asegurarse de que al menos quede una imagen
    const remainingImages = await prisma.image.count({
      where: { productId: input.id },
    });

    if (remainingImages === 0) {
      await prisma.image.create({
        data: { url: "/imgs/image_not_found.webp", productId: input.id },
      });
    }

    return true;
  } catch (error) {
    console.error("Error al modificar el producto:", error);
    return false;
  }
}
