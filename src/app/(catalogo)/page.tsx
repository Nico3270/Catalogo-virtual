import { getArticlesCarrusel } from "@/blog/actions/getArticlesCarrusel";
import PrincipalSection from "@/principal/componentes/PrincipalSection";
import { getProductsCarrusel } from "@/producto/actions/getProductsCarrusel";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";
import BlogArticulos from "@/secondary/componentes/BlogArticulos";
import QuienesSomos, { Tarjeta } from "@/secondary/componentes/QuienesSomos";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
import { FaTree, FaMapMarkerAlt, FaGift, FaSmile } from "react-icons/fa";

const tarjetas: Tarjeta[] = [
  {
    icono: <FaTree />,
    titulo: "Productos Personalizados",
    descripcion:
      "Descubre la alegría de regalar con nuestros detalles únicos y regalos personalizados, diseñados especialmente para hombres, mujeres y niños. Celebra cada cumpleaños, aniversario y ocasión especial con un toque único que hará sonreír a tus seres queridos. ¡Haz que cada momento sea inolvidable y sorprende hoy mismo!",
  },
  {
    icono: <FaMapMarkerAlt />,
    titulo: "Ubicación Estratégica",
    descripcion:
      "Nos encontramos en el corazón de Tunja, facilitando entregas rápidas y seguras. Encuentra los mejores detalles sorpresa y regalos personalizados cerca de ti.",
  },
  {
    icono: <FaGift />,
    titulo: "Regalos para Fechas Especiales",
    descripcion:
      "Descubre regalos inolvidables para cumpleaños, amor y amistad, y aniversarios. Diseñados para enamorar, sorprender y celebrar cada momento especial contigo.",
  },
  {
    icono: <FaSmile />,
    titulo: "Clientes Felices",
    descripcion:
      "Más de 500 clientes satisfechos confirman nuestra calidad. Sorprende con detalles que enamoran, flores y regalos personalizados diseñados para superar tus expectativas.",
  },
];

// Componente HomePage
export default async function HomePage() {
  // Obtener artículos del carrusel desde la base de datos
  const articlesFromDB = await getArticlesCarrusel();
  const productsCarrusel = await getProductsCarrusel();

  // Formatear los artículos para que cumplan con la interfaz ArticuloCarrusel
  const articulos = articlesFromDB.map((article) => ({
    titulo: article.titulo,
    descripcion: article.descripcion,
    imagen: article.imagen,
    slug: article.slug,
  }));

  return (
    <main className="w-full min-h-screen bg-white pt-5">
      <PrincipalSection />
      <ProductsCarrusel products={productsCarrusel}/>
      <BlogArticulos articulos={articulos} />
      <QuienesSomos tarjetas={tarjetas} />
    </main>
  );
}
