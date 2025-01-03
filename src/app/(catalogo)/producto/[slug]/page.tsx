import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGridProduct } from "@/producto/components/ProductGridProduct";
import { ResponsiveSlideShow } from "@/producto/components/ResonsiveSlideShow";
import { AddToCart } from "@/producto/components/AddToCart";
import { getProductBySlug } from "@/producto/actions/getProductBySlug";
import { SeccionesFont } from "@/config/fonts";
import Head from "next/head";  // Importar Head para insertar el JSON-LD


export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generar metadatos dinámicos basados en el producto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Asegúrate de await params

  const { product } = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que estás buscando no existe.",
      robots: {
        index: false,
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
      url: `https://catalogo-virtual.vercel.app/producto/${product.slug}`,
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
  const { slug } = await params; // Asegúrate de await params

  const { product, similarProducts } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Generar JSON-LD dinámico para el producto
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.nombre,
    "description": product.descripcion || "",
    "image": product.imagenes,
    "brand": {
      "@type": "Brand",
      "name": "Detalles, Sorpresas y Regalos"
    },
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": `https://catalogo-virtual.vercel.app/producto/${product.slug}`,
      "priceCurrency": "COP",
      "price": product.precio,
    }
  };


  return (
    <div className="container mx-auto p-4">

      {/* Incrustar el JSON-LD en el head */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carrusel de imágenes */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <ResponsiveSlideShow images={product.imagenes} title={product.nombre} />
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col space-y-6 md:space-y-4 md:flex-grow">
          <AddToCart product={product} />
        </div>
      </div>

      {/* Productos similares */}
      <div className="mt-8">
        <h2 className={`text-2xl font-bold mb-4 ${SeccionesFont.className} color-secundario`}>Productos Similares</h2>
        <ProductGridProduct products={similarProducts} />
      </div>
    </div>
  );
}
