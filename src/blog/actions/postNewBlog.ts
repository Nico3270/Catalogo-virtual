"use server"

import prisma from "@/lib/prisma";

export const postNewBlog = async (data: any) => {
  const { titulo, descripcion, imagen, imagenes, parrafos, subtitulos, autor, orden, secciones } = data;

  // Generar el slug a partir del título
  const slug = generateSlug(titulo);

  try {
    const newBlog = await prisma.articulo.create({
      data: {
        titulo,
        slug, // Incluir el slug generado
        descripcion,
        imagen,
        imagenes: imagenes.map((img: { url: string }) => img.url),
        parrafos: parrafos.map((p: { texto: string }) => p.texto),
        subtitulos: subtitulos.map((s: { texto: string }) => s.texto),
        autor,
        orden,
        secciones: {
          create: secciones.map((sectionId: string) => ({
            section: { connect: { id: sectionId } },
          })),
        },
      },
    });

    return newBlog;
  } catch (error) {
    console.error("Error posting new blog:", error);
    throw new Error("No se pudo insertar el blog.");
  }
};

// Función para generar el slug
const generateSlug = (titulo: string): string => {
  return titulo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza espacios y caracteres no válidos con "-"
    .replace(/(^-|-$)+/g, ""); // Elimina guiones al principio o al final
};
