import { getArticleInformation } from "@/blog/actions/getArticleInformation";
import ShowBlogArticle from "@/blog/componentes/ShowBlogArticle";
import { getProductsCarruselBySlug } from "@/producto/actions/getProductsCarruselBySlug";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
import Head from "next/head";

// Ajuste en el tipo para aceptar `params` como una promesa
type Params = Promise<{ slug: string }>;

// Generar metadata para SEO y OpenGraph dinámicamente
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticleInformation(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
      description: "El artículo que buscas no existe o fue eliminado.",
      robots: "noindex, follow",
    };
  }

  const firstParagraph = article.parrafos[0] || "";
  const imageUrl = article.imagen || article.imagenes[0] || "https://catalogo-virtual.vercel.app/default.jpg";

  return {
    title: article.titulo,
    description: article.descripcion || firstParagraph.substring(0, 150),
    openGraph: {
      title: article.titulo,
      description: article.descripcion || firstParagraph.substring(0, 150),
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titulo,
      description: article.descripcion || firstParagraph.substring(0, 150),
      images: [imageUrl],
    },
  };
}

// Renderizado de la página del artículo de blog
export default async function BlogPage({ params }: { params: Params }) {
  const { slug } = await params;

  // Obtener el artículo desde la base de datos
  const article = await getArticleInformation(slug);

  // Manejo de error si el artículo no existe
  if (!article) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-500">Artículo no encontrado</h1>
        <p className="text-gray-500 mt-4">El artículo que estás buscando no existe o ha sido eliminado.</p>
      </div>
    );
  }

  // Obtener productos relacionados (carrusel)
  const products = await getProductsCarruselBySlug(slug);

  // Generar JSON-LD (datos estructurados para SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.titulo,
    "description": article.descripcion || article.parrafos[0].substring(0, 150),
    "image": article.imagen || article.imagenes[0],
    "author": {
      "@type": "Person",
      "name": article.autor,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Detalles, Sorpresas y Regalos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://catalogo-virtual.vercel.app/logo.jpg",
      },
    },
    "datePublished": article.fechaPublicacion,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://catalogo-virtual.vercel.app/blog/${article.slug}`,
    },
  };

  return (
    <>
      {/* Metadatos dinámicos */}
      <Head>
        <title>{article.titulo}</title>
        <meta name="description" content={article.descripcion || article.parrafos[0].substring(0, 150)} />
        <meta property="og:title" content={article.titulo} />
        <meta property="og:description" content={article.descripcion || article.parrafos[0].substring(0, 150)} />
        <meta property="og:image" content={article.imagen || article.imagenes[0]} />
        <meta name="author" content={article.autor} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </Head>

      <div className="container mx-auto p-4">
        {/* Mostrar artículo */}
        <ShowBlogArticle article={article} />

        {/* Carrusel de productos relacionados */}
        {products.length > 0 && (
          <div className="mt-2">
            <ProductsCarrusel products={products} />
          </div>
        )}
      </div>
    </>
  );
}
