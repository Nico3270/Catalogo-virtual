"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export async function postNewBlog(formData: FormData): Promise<{ ok: boolean; message: string }> {
  try {
    const titulo = formData.get("titulo") as string;
    const descripcion = formData.get("descripcion") as string;
    const autor = formData.get("autor") as string;
    const orden = parseInt(formData.get("orden") as string, 10) || 0;
    const secciones = formData.getAll("secciones") as string[];

    const imagenPrincipal = formData.get("imagenPrincipal") as File | null;
    const imagenes = formData.getAll("imagenes") as File[];

    let uploadedImageUrl = "";
    let uploadedImagesUrls: string[] = [];

    // Subir imagen principal a Cloudinary
    if (imagenPrincipal) {
      const buffer = await imagenPrincipal.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`
      );
      uploadedImageUrl = result.secure_url;
    }

    // Subir imágenes adicionales
    uploadedImagesUrls = await Promise.all(
      imagenes.map(async (image) => {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`
        );
        return result.secure_url;
      })
    );

    // **Extraer párrafos y subtítulos desde el FormData como arrays de strings**
    const parrafos: string[] = [];
    const subtitulos: string[] = [];

    formData.forEach((value, key) => {
      if (key.startsWith("parrafos[")) {
        parrafos.push(value as string);
      }
      if (key.startsWith("subtitulos[")) {
        subtitulos.push(value as string);
      }
    });

    // Generar slug del título
    const slug = generateSlug(titulo);

    // **Crear el blog en la base de datos (Prisma)**
    await prisma.articulo.create({
      data: {
        titulo,
        slug,
        descripcion,
        imagen: uploadedImageUrl,
        imagenes: uploadedImagesUrls,
        autor,
        orden,
        parrafos,   // Inserta el array de strings directamente
        subtitulos, // Inserta el array de strings directamente
        secciones: {
          create: secciones.map((sectionId) => ({
            section: { connect: { id: sectionId } },
          })),
        },
      },
    });

    return { ok: true, message: "Blog creado exitosamente." };
  } catch (error) {
    console.error("Error al crear el blog:", error);
    return { ok: false, message: "Error al crear el blog." };
  }
}

// Función para generar el slug a partir del título
const generateSlug = (titulo: string): string => {
  return titulo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
