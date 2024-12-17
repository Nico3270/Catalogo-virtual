"use server";

import prisma from "@/lib/prisma";

// Define una interfaz para los datos del blog
interface BlogData {
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes: { url: string }[];
  parrafos: { texto: string }[];
  subtitulos: { texto: string }[];
  autor: string;
  orden: number;
  secciones: string[]; // IDs de las secciones
}

// Función principal
export const postNewBlog = async (data: BlogData): Promise<void> => {
  const { titulo, descripcion, imagen, imagenes, parrafos, subtitulos, autor, orden, secciones } = data;

  // Generar el slug a partir del título
  const slug = generateSlug(titulo);

  try {
    await prisma.articulo.create({
      data: {
        titulo,
        slug, // Incluir el slug generado
        descripcion,
        imagen,
        imagenes: imagenes.map((img) => img.url), // Extraer las URLs de imágenes
        parrafos: parrafos.map((p) => p.texto), // Extraer los textos de párrafos
        subtitulos: subtitulos.map((s) => s.texto), // Extraer los textos de subtítulos
        autor,
        orden,
        secciones: {
          create: secciones.map((sectionId) => ({
            section: { connect: { id: sectionId } },
          })),
        },
      },
    });
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
