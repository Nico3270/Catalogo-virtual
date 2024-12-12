"use server";

import prisma from "@/lib/prisma";

export const deleteImage = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.imagegallery.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return { success: false, error: "No se pudo eliminar la imagen." };
  }
};
