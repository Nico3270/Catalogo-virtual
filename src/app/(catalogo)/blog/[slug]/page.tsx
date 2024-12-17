import { getArticleInformation } from "@/blog/actions/getArticleInformation";
import ShowBlogArticle from "@/blog/componentes/ShowBlogArticle";
import { getProductsCarruselBySlug } from "@/producto/actions/getProductsCarruselBySlug";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";

// Ajuste en el tipo para aceptar `params` como una promesa
type Params = Promise<{ slug: string }>;

export default async function BlogPage({ params }: { params: Params }) {
  // Esperar `params` antes de acceder a sus propiedades
  const { slug } = await params;

  // Obtener el artículo desde la base de datos
  const article = await getArticleInformation(slug);

  // Manejar el caso donde no se encuentre el artículo
  if (!article) {
    return <div>Artículo no encontrado.</div>;
  }

  // Obtener productos relacionados
  const products = await getProductsCarruselBySlug(slug);

  return (
    <div>
      {/* Mostrar artículo */}
      <ShowBlogArticle article={article} />

      {/* Mostrar carrusel de productos */}
      <ProductsCarrusel products={products} />
    </div>
  );
}
