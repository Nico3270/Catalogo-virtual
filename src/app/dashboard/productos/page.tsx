import { getProductsToDashboard } from "@/productos/actions/getProductsToDashboard";
import { ProductsDashboard } from "@/productos/components/ProductsDashboard";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché

export default async function ProductsPage() {
  const initialData = await getProductsToDashboard({ page: 1, pageSize: 20 });

  const fetchProducts = async (page: number) => {
    "use server";
    const data = await getProductsToDashboard({ page, pageSize: 20 });
    return { products: data.products };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#441752] mb-4 text-center">
        Gestión de Productos
      </h1>
      <ProductsDashboard
        initialData={{
          products: initialData.products,
        }}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
