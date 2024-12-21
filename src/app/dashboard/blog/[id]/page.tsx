import { getBlogById } from "@/blog/actions/getBlogById";
import ModifyBlogClientWrapper from "@/blog/componentes/ModifyBlogClientWrapper";
import { use } from "react";
export const dynamic = "force-dynamic"; // Asegura que la acción no use caché
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Resolver los parámetros de forma segura
  const { id } = use(params);

  // Verificar si el ID existe
  if (!id) {
    return (
      <div className="text-center text-red-500">
        Error: No se proporcionó un ID válido para el blog.
      </div>
    );
  }

  // Obtener el blog por ID
  const blog = use(getBlogById(id));

  if (!blog) {
    return (
      <div className="text-center text-red-500">Blog no encontrado</div>
    );
  }

  return (
    <div className="container mx-auto">
      <ModifyBlogClientWrapper blog={blog} blogId={id} />
    </div>
  );
}
