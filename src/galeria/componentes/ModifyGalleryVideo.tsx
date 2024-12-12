"use client";

import React, { useState } from "react";

import { deleteVideo } from "@/galeria/actions/deleteVideo";
import { VideoGalleryItem } from "@/galeria/interfaces/types";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { updateGalleryVideo } from "../actions/updateGalleryVideo";

interface ModifyGalleryVideoProps {
  initialVideo: VideoGalleryItem;
}

const ModifyGalleryVideo: React.FC<ModifyGalleryVideoProps> = ({ initialVideo }) => {
  const [formData, setFormData] = useState({
    url: initialVideo.url,
    title: initialVideo.title,
    description: initialVideo.description,
  });

  const handleUpdate = async () => {
    try {
      const response = await updateGalleryVideo({
        id: initialVideo.id,
        ...formData,
        order: initialVideo.order, // Mantiene el valor original del orden
      });

      if (response.success) {
        alert("Video actualizado con éxito.");
      } else {
        alert(response.error || "Error al actualizar el video.");
      }
    } catch (error) {
      console.error("Error al actualizar el video:", error);
      alert("Error al actualizar el video.");
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar este video?")) {
      try {
        const response = await deleteVideo(initialVideo.id);

        if (response.success) {
          alert("Video eliminado con éxito.");
          window.location.href = "/dashboard/galleryVideos"; // Redirige al index
        } else {
          alert(response.error || "Error al eliminar el video.");
        }
      } catch (error) {
        console.error("Error al eliminar el video:", error);
        alert("Error al eliminar el video.");
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Modificar Video</h1>
      <video
        src={formData.url}
        className="w-full h-48 object-cover rounded-lg mb-6"
        controls
      />
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="URL del video"
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

export default ModifyGalleryVideo;
