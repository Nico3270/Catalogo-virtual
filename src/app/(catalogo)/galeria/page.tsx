import GalleryComponent from "@/galeria/componentes/GalleryComponent";
import { getProductsCarrusel } from "@/producto/actions/getProductsCarrusel";
import { ProductsCarrusel } from "@/producto/components/ProductsCarrusel";
import { fetchGalleryImages } from "@/galeria/actions/fetchGalleryImages";
import React from "react";
import { fetchGalleryVideos } from "@/galeria/actions/fetchGalleryVideos";

export const GalleryPage = async () => {
  // Llamada a las acciones para obtener los datos
  const productsCarrusel = await getProductsCarrusel();
  const images = await fetchGalleryImages();
  const videos = await fetchGalleryVideos();

  return (
    <div>
      {/* Pasamos las imágenes desde la base de datos */}
      <GalleryComponent videos={videos} images={images} />
      <ProductsCarrusel products={productsCarrusel} />
    </div>
  );
};

export default GalleryPage;
