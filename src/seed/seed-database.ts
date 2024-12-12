import { PrismaClient } from "@prisma/client";
import { initialData } from "./seed";

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
      await prisma.articulo.deleteMany(); // Eliminar artículos existentes
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
          iconName: section.iconName, // Nombre del ícono
          order: section.order, // Orden o prioridad
          isActive: section.isActive, // Estado activo/inactivo
        },
      });
      sectionMap[section.id] = createdSection.id;
    }

    // Crear un conjunto para almacenar slugs únicos
    const slugSet = new Set<string>();

    // Insertar productos e imágenes
    console.log("Insertando productos e imágenes...");
    for (const product of initialData.products) {
      let uniqueSlug = product.slug;

      // Asegurarse de que el slug sea único
      let counter = 1;
      while (slugSet.has(uniqueSlug)) {
        uniqueSlug = `${product.slug}-${counter}`;
        counter++;
      }

      // Agregar el slug único al conjunto
      slugSet.add(uniqueSlug);

      const createdProduct = await prisma.product.create({
        data: {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          descripcion: product.descripcion,
          descripcionCorta: product.descripcionCorta || null,
          slug: uniqueSlug, // Usar el slug único
          prioridad: product.prioridad || null,
          status: product.status || "available",
          tags: product.tags,
          secciones: {
            create: product.seccionIds.map((seccionId) => ({
              sectionId: sectionMap[seccionId], // Conectar a la sección correspondiente
            })),
          },
        },
      });

      // Insertar imágenes relacionadas con el producto
      console.log(`Insertando imágenes para el producto: ${product.nombre}`);
      for (const imageUrl of product.imagenes) {
        await prisma.image.create({
          data: {
            url: imageUrl,
            productId: createdProduct.id, // Relacionar con el producto
          },
        });
      }
    }

    // Insertar artículos
    console.log("Insertando artículos...");
    for (const articulo of initialData.articulos) {
      let uniqueSlug = articulo.slug;

      // Asegurarse de que el slug sea único
      let counter = 1;
      while (slugSet.has(uniqueSlug)) {
        uniqueSlug = `${articulo.slug}-${counter}`;
        counter++;
      }

      // Agregar el slug único al conjunto
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

    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error durante la inserción de datos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
