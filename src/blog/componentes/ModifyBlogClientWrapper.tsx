"use client";

import React from "react";
import ModifyBlogComponent, { AdaptedArticulo } from "./ModifyBlogComponent";
import { updateBlog } from "@/blog/actions/updateBlog";

interface ModifyBlogClientWrapperProps {
  blog: AdaptedArticulo;
  blogId: string;
}

const ModifyBlogClientWrapper: React.FC<ModifyBlogClientWrapperProps> = ({
  blog,
  blogId,
}) => {
  const handleUpdate = async (data: AdaptedArticulo) => {
    try {
      console.log("Datos recibidos en handleUpdate:", data);
      await updateBlog(blogId, data);
      alert("¡Blog actualizado con éxito!");
    } catch (error) {
      console.error("Error al actualizar el blog:", error);
      alert("Hubo un error al actualizar el blog.");
    }
  };

  return <ModifyBlogComponent blog={blog} onSubmit={handleUpdate} />;
};

export default ModifyBlogClientWrapper;
