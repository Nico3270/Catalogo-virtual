"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export async function createProduct(formData: FormData) {
  try {
    const nombre = formData.get("nombre") as string;
    const precio = parseFloat(formData.get("precio") as string);
    const descripcion = formData.get("descripcion") as string;
    const descripcionCorta = formData.get("descripcionCorta") as string;
    const slug = formData.get("slug") as string;
    const prioridad = parseInt(formData.get("prioridad") as string);
    const status = formData.get("status") as string;
    const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim());
    const seccionIds = formData.getAll("seccionIds") as string[];
    const images = formData.getAll("images") as File[];

    // Subir imágenes a Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
        return result.secure_url; // Retornar el URL seguro de la imagen subida
      })
    );

    // Crear el producto
    const product = await prisma.product.create({
      data: {
        nombre,
        precio,
        descripcion,
        descripcionCorta,
        slug,
        prioridad,
        status,
        tags,
        imagenes: {
          create: uploadedImages.map((url) => ({ url })), // Relacionar imágenes con el producto
        },
      },
    });

    // Relacionar el producto con las secciones
    await prisma.productSection.createMany({
      data: seccionIds.map((sectionId) => ({
        productId: product.id,
        sectionId,
      })),
    });

    return { ok: true, product };
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { ok: false, message: "Error al crear el producto." };
  }
}