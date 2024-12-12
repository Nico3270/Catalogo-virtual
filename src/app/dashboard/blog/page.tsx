import { getBlogList } from "@/blog/actions/getBlogList";
import BlogList from "@/blog/componentes/BlogList";


const Page = async () => {
  const blogs = await getBlogList();
  return <BlogList blogs={blogs} />;
};

export default Page;
