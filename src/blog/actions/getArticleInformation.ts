import prisma from "@/lib/prisma";

export async function getArticleInformation(slug: string) {
  return await prisma.articulo.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true, // Asegúrate de incluir "slug"
      titulo: true,
      descripcion: true,
      imagen: true,
      imagenes: true,
      parrafos: true,
      subtitulos: true,
      fechaPublicacion: true,
      autor: true,
    },
  });
}
