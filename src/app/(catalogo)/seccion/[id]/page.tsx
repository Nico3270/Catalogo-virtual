import { ProductGrid } from "@/seccion/componentes/ProductGridSeccion";
import { getProductsBySection } from "@/seccion/actions/getProductsBySection";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
interface Props {
  params: Promise<{
    id: string; // El slug de la sección
  }>;
}

export default async function SectionPage({ params }: Props) {
  // Esperar la resolución de los parámetros
  const { id: sectionSlug } = await params;

  // Obtener productos y el nombre de la sección desde la action
  const { productos, sectionName } = await getProductsBySection(sectionSlug);

  if (!sectionName) {
    return (
      <div className="text-center text-xl text-red-500 font-bold mt-8">
        Sección no encontrada
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center text-xl text-red-500 font-bold mt-8">
        No se encontraron productos en la sección {sectionName}.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Título dinámico llamativo */}
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-[#f07167]">
          Explora nuestra selección en <span>{sectionName}</span>
        </h1>
      </div>

      {/* Productos de la sección */}
      <ProductGrid products={productos} />
    </div>
  );
}
