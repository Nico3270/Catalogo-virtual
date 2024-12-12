"use server";

import prisma from "@/lib/prisma";
import { AdaptedArticulo } from "../componentes/ModifyBlogComponent";

export const getBlogById = async (id: string) => {
  try {
    const blog = await prisma.articulo.findUnique({
      where: { id },
      include: {
        secciones: {
          include: {
            section: true,
          },
        },
      },
    });

    if (!blog) return null;

    return {
      ...blog,
      imagenes: blog.imagenes.map((url: string) => ({ url })), // Transformar imágenes
      parrafos: blog.parrafos.map((texto: string) => ({ texto })), // Transformar párrafos
      subtitulos: blog.subtitulos.map((texto: string) => ({ texto })), // Transformar subtítulos
      secciones: blog.secciones.map(({ section }) => ({
        id: section.id,
        nombre: section.nombre,
      })),
    } as AdaptedArticulo;
  } catch (error) {
    console.error("Error al obtener el blog por ID:", error);
    return null;
  }
};
