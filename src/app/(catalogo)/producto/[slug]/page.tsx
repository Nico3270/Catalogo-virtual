import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGridProduct } from "@/producto/components/ProductGridProduct";
import { ResponsiveSlideShow } from "@/producto/components/ResonsiveSlideShow";
import { Precio } from "@/seccion/componentes/Precio";
import { AddToCart } from "@/producto/components/AddToCart"; // Asegúrate de que este componente sea un Client Component
import { getProductBySlug } from "@/producto/actions/getProductBySlug";
import { BsWhatsapp } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

interface Props {
  params: {
    slug: string;
  };
}

// Generar metadatos dinámicos basados en el producto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { product } = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que estás buscando no existe.",
      robots: {
        index: false, // Evitar indexación de páginas de productos inexistentes
      },
    };
  }

  const imageUrl = product.imagenes[0];

  return {
    title: product.nombre,
    description: product.descripcion || "",
    openGraph: {
      title: product.nombre,
      description: product.descripcion || "",
      images: [imageUrl],
      url: `https://www.tusitio.com/product/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.nombre,
      description: product.descripcion || "",
      images: [imageUrl],
    },
  };
}

// Página principal del producto
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  // Obtener el producto y productos similares desde la acción
  const { product, similarProducts } = await getProductBySlug(slug);

  if (!product) {
    notFound(); // Mostrar una página 404 si no se encuentra el producto
  }

  

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carrusel de imágenes */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <ResponsiveSlideShow images={product.imagenes} title={product.nombre} />
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col space-y-6 md:space-y-4 md:flex-grow">
          

          {/* Botones en la misma fila */}
          <div className="flex gap-4 items-center">
            {/* Botón de agregar al carrito */}
            <div className="flex-1">
              <AddToCart product={product} />
            </div>

          </div>
        </div>
      </div>

      {/* Productos similares */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Productos Similares</h2>
        <ProductGridProduct products={similarProducts} />
      </div>
    </div>
  );
}
