import { getArticlesCarrusel } from "@/blog/actions/getArticlesCarrusel";
import { getCarruselSections } from "@/principal/actions/carruselPrincipalActions";
import { getTestimonials } from "@/principal/actions/testimonialActions";
import PrincipalSection from "@/principal/componentes/PrincipalSection";
import { getProductsCarrusel } from "@/producto/actions/getProductsCarrusel";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";
import { getTarjets } from "@/secondary/actions/quienesSomos";
import BlogArticulos from "@/secondary/componentes/BlogArticulos";
import QuienesSomos from "@/secondary/componentes/QuienesSomos";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché





// Componente HomePage
export default async function HomePage() {
  // Obtener artículos del carrusel desde la base de datos
  const articlesFromDB = await getArticlesCarrusel();
  const productsCarrusel = await getProductsCarrusel();
  const testimonios = await getTestimonials();  // Obtener desde la BD
  const tarjetas = await getTarjets();
  const carruselSecciones = await getCarruselSections();


  // Formatear los artículos para que cumplan con la interfaz ArticuloCarrusel
  const articulos = articlesFromDB.map((article) => ({
    titulo: article.titulo,
    descripcion: article.descripcion,
    imagen: article.imagen,
    slug: article.slug,
  }));

  return (
    <main className="w-full min-h-screen bg-white pt-5">
      <PrincipalSection testimonios={testimonios} secciones={carruselSecciones} />
      <ProductsCarrusel products={productsCarrusel}/>
      <BlogArticulos articulos={articulos} />
      <QuienesSomos tarjetas={tarjetas} />
    </main>
  );
}
