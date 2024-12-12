import { getProductAndSectionToModifyProduct } from "@/productos/actions/getProductAndSectionToModifyProduct";
import ModifyProduct from "@/productos/components/ModifyProduct";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

// Define los valores válidos para status
const validStatuses = ["available", "out_of_stock", "discontinued"] as const;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  const data = await getProductAndSectionToModifyProduct(id);

  if (!data) {
    return notFound();
  }

  // Mapear el status al tipo restringido
  const status = validStatuses.includes(data.product.status as any)
    ? (data.product.status as "available" | "out_of_stock" | "discontinued")
    : undefined;

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
