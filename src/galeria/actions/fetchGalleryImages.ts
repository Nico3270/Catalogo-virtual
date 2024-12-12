import prisma from "@/lib/prisma";


export const fetchGalleryImages = async () => {
  try {
    const images = await prisma.imagegallery.findMany({
      orderBy: {
        order: "asc", // Ordenar de menor a mayor por el campo `order`
      },
    });
    return images;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return [];
  }
};
