
"use server"
import prisma from "@/lib/prisma";

export const updateBlog = async (id: string, data: any) => {
  try {
    console.log("Datos enviados al servidor:", data);
    const updatedBlog = await prisma.articulo.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagen: data.imagen,
        imagenes: data.imagenes,
        parrafos: data.parrafos,
        subtitulos: data.subtitulos,
        autor: data.autor,
        orden: data.orden,
      },
    });
    console.log("Respuesta del servidor:", updatedBlog);
    return updatedBlog;
  } catch (error) {
    console.error("Error al actualizar el blog en Prisma:", error);
    throw new Error("No se pudo actualizar el blog");
  }
};
