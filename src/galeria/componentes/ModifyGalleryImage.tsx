"use client";

import React, { useState } from "react";
import { updateGalleryImage } from "@/galeria/actions/updateGalleryImage";
import { deleteImage } from "@/galeria/actions/deleteImage";
import { ImageGalleryItem } from "@/galeria/interfaces/types";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Image from "next/image";

interface ModifyGalleryImageProps {
  initialImage: ImageGalleryItem;
}

const ModifyGalleryImage: React.FC<ModifyGalleryImageProps> = ({ initialImage }) => {
  const [formData, setFormData] = useState({
    url: initialImage.url,
    title: initialImage.title,
    description: initialImage.description,
  });

  const handleUpdate = async () => {
    try {
      const response = await updateGalleryImage({
        id: initialImage.id,
        ...formData,
        order: initialImage.order, // Se conserva el valor original de order
      });

      if (response.success) {
        alert("Imagen actualizada con éxito.");
      } else {
        alert(response.error || "Error al actualizar la imagen.");
      }
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
      alert("Error al actualizar la imagen.");
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      try {
        const response = await deleteImage(initialImage.id);
  
        if (response.success) {
          alert("Imagen eliminada con éxito.");
          window.location.href = "/dashboard/galleryImages"; // Redirige en lugar de recargar
        } else {
          alert(response.error || "Error al eliminar la imagen.");
        }
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        alert("Error al eliminar la imagen.");
      }
    }
  };
  

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Modificar Imagen</h1>
      <Image
        src={formData.url}
        alt={formData.title}
        className="w-full h-48 object-cover rounded-lg mb-6"
      />
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="URL de la imagen"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <FiEdit /> Modificar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <FiTrash2 /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ModifyGalleryImage;
