import React from "react";
import { getVideoFromGalleryById } from "@/galeria/actions/getVideoFromGalleryById";
import ModifyGalleryVideo from "@/galeria/componentes/ModifyGalleryVideo";

const Page = async ({ params }: { params: { id: string } }) => {
  const video = await getVideoFromGalleryById(params.id);

  if (!video) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Video no encontrado</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 md:px-12">
      <ModifyGalleryVideo initialVideo={video} />
    </main>
  );
};

export default Page;
