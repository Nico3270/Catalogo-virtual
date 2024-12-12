import { fetchSectionsNewBlog } from "@/blog/actions/fetchSectionsNewBlog";
import CreateNewBlog from "@/blog/componentes/CreateNewBlog";
import { postNewBlog } from "@/blog/actions/postNewBlog";

const Page = async () => {
  const secciones = await fetchSectionsNewBlog();

  return (
    <div>
      <CreateNewBlog
        secciones={secciones}
        onSubmit={postNewBlog} // Llama directamente a la acción del servidor
      />
    </div>
  );
};

export default Page;
