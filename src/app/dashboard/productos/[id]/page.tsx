import { getProductAndSectionToModifyProduct } from "@/productos/actions/getProductAndSectionToModifyProduct";
import ModifyProduct from "@/productos/components/ModifyProduct";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Define los valores válidos para status
const validStatuses = ["available", "out_of_stock", "discontinued"] as const;

// Type guard para verificar si el status es válido
function isValidStatus(status: string): status is typeof validStatuses[number] {
  return validStatuses.includes(status as unknown as typeof validStatuses[number]);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const data = await getProductAndSectionToModifyProduct(id);

  if (!data) {
    return notFound();
  }

  // Validar el status usando el type guard
  const status = isValidStatus(data.product.status) ? data.product.status : undefined;

  const product = {
    ...data.product,
    status, // Asegura que el status sea del tipo restringido
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Producto</h1>
      <ModifyProduct product={product} allSections={data.allSections} />
    </div>
  );
}
