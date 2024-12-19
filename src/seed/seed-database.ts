import { PrismaClient } from "@prisma/client";
import { initialData } from "./seed";
import bcryptjs from "bcryptjs"; // Importa bcryptjs para encriptar la contraseña

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Iniciando la inserción de datos...");

    // Eliminar datos existentes si estamos en modo desarrollo
    if (process.env.NODE_ENV !== "production") {
      console.log("Eliminando datos existentes...");
      await prisma.orderItem.deleteMany();
      await prisma.order.deleteMany();
      await prisma.deliveryData.deleteMany();
      await prisma.image.deleteMany();
      await prisma.productSection.deleteMany();
      await prisma.section.deleteMany();
      await prisma.product.deleteMany();
      await prisma.articulo.deleteMany();
      await prisma.user.deleteMany(); // Eliminar usuarios existentes
    }

    // Insertar secciones
    console.log("Insertando secciones...");
    const sectionMap: { [key: string]: string } = {};
    for (const section of initialData.secciones) {
      const createdSection = await prisma.section.create({
        data: {
          id: section.id,
          nombre: section.name,
          slug: section.href,
          iconName: section.iconName,
          order: section.order,
          isActive: section.isActive,
        },
      });
      sectionMap[section.id] = createdSection.id;
    }

    const slugSet = new Set<string>();

    // Insertar productos e imágenes
    console.log("Insertando productos e imágenes...");
    for (const product of initialData.products) {
      let uniqueSlug = product.slug;

      let counter = 1;
      while (slugSet.has(uniqueSlug)) {
        uniqueSlug = `${product.slug}-${counter}`;
        counter++;
      }
      slugSet.add(uniqueSlug);

      const createdProduct = await prisma.product.create({
        data: {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          descripcion: product.descripcion,
          descripcionCorta: product.descripcionCorta || null,
          slug: uniqueSlug,
          prioridad: product.prioridad || null,
          status: product.status || "available",
          tags: product.tags,
          secciones: {
            create: product.seccionIds.map((seccionId) => ({
              sectionId: sectionMap[seccionId],
            })),
          },
        },
      });

      for (const imageUrl of product.imagenes) {
        await prisma.image.create({
          data: {
            url: imageUrl,
            productId: createdProduct.id,
          },
        });
      }
    }

    // Insertar artículos
    console.log("Insertando artículos...");
    for (const articulo of initialData.articulos) {
      let uniqueSlug = articulo.slug;

      let counter = 1;
      while (slugSet.has(uniqueSlug)) {
        uniqueSlug = `${articulo.slug}-${counter}`;
        counter++;
      }
      slugSet.add(uniqueSlug);

      await prisma.articulo.create({
        data: {
          id: articulo.id,
          orden: articulo.orden,
          slug: uniqueSlug,
          titulo: articulo.titulo,
          descripcion: articulo.descripcion,
          imagen: articulo.imagen,
          imagenes: articulo.imagenes,
          parrafos: articulo.parrafos,
          subtitulos: articulo.subtitulos,
          fechaPublicacion: articulo.fechaPublicacion,
          autor: articulo.autor,
        },
      });
    }

    // Insertar usuario admin
    console.log("Insertando usuario administrador...");
    const hashedPassword = bcryptjs.hashSync("Nicolas3270", 10); // Hashea la contraseña

    await prisma.user.create({
      data: {
        name: "Nico",
        email: "admin1@gmail.com",
        password: hashedPassword,
        role: "admin", // Rol de administrador
      },
    });

    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error durante la inserción de datos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
