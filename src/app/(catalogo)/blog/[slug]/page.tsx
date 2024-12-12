import { getArticleInformation } from "@/blog/actions/getArticleInformation";
import ShowBlogArticle from "@/blog/componentes/ShowBlogArticle";
import { getProductsCarruselBySlug } from "@/producto/actions/getProductsCarruselBySlug";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";


interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Obtener el artículo desde la base de datos
  const article = await getArticleInformation(params.slug);

  // Manejar el caso donde no se encuentre el artículo
  if (!article) {
    return <div>Artículo no encontrado.</div>;
  }

  // Obtener productos relacionados
  const products = await getProductsCarruselBySlug(params.slug);

  return (
    <div>
      {/* Mostrar artículo */}
      <ShowBlogArticle article={article} />

      {/* Mostrar carrusel de productos */}
      <ProductsCarrusel products={products} />
    </div>
  );
}
