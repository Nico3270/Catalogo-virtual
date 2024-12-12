"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Link from "next/link";
import { VideoGalleryItem } from "../interfaces/types";
import { addNewVideo } from "@/galeria/actions/addNewVideo";
import { updateVideosOrder } from "@/galeria/actions/updateVideosOrder";
import { SortableRow } from "./SortableRow";
import { FiMove } from "react-icons/fi";
import { RubikFont } from "@/config/fonts";

interface ShowGalleryVideosProps {
  initialVideos: VideoGalleryItem[];
}

const ShowGalleryVideos: React.FC<ShowGalleryVideosProps> = ({ initialVideos }) => {
  const [videos, setVideos] = useState<VideoGalleryItem[]>(initialVideos);
  const [newVideo, setNewVideo] = useState<VideoGalleryItem>({
    id: "",
    url: "",
    title: "",
    description: "",
    order: videos.length + 1,
  });
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async ({ active, over }: any) => {
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);

      const reorderedVideos = arrayMove(videos, oldIndex, newIndex).map((video, index) => ({
        ...video,
        order: index + 1,
      }));

      setVideos(reorderedVideos);

      try {
        setIsSavingOrder(true);
        const result = await updateVideosOrder(
          reorderedVideos.map(({ id, order }) => ({ id, order }))
        );
        if (result.success) {
          alert("Orden actualizado con éxito.");
        } else {
          console.error("Error al actualizar el orden.");
        }
      } catch (error) {
        console.error("Error al guardar el orden:", error);
      } finally {
        setIsSavingOrder(false);
      }
    }
  };

  const handleAddVideo = async () => {
    if (newVideo.url && newVideo.title && newVideo.description) {
      try {
        const response = await addNewVideo({
          url: newVideo.url,
          title: newVideo.title,
          description: newVideo.description,
          order: videos.length + 1,
        });

        if (response.success && response.video) {
          setVideos([...videos, response.video]);
          setNewVideo({ id: "", url: "", title: "", description: "", order: videos.length + 2 });
          alert("Video agregado con éxito.");
        } else {
          console.error(response || "Error al agregar el video.");
        }
      } catch (error) {
        console.error("Error al agregar el video:", error);
        alert("Error al agregar el video.");
      }
    } else {
      alert("Por favor, completa todos los campos antes de agregar un nuevo video.");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className={`text-2xl font-bold mb-4 text-center text-[#D91656] ${RubikFont.className}`}>
        Administración de videos de la galería
      </h1>

      {/* Formulario para agregar un nuevo video */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Agregar nuevo video</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="URL del video"
            value={newVideo.url}
            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Título"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            className="border rounded-md p-2"
          />
        </div>
        <button
          onClick={handleAddVideo}
          className="mt-4 bg-[#EB5B00] text-white px-4 py-2 rounded-md hover:bg-[#FFB200]"
        >
          Agregar Video
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={videos.map((video) => video.id)} strategy={verticalListSortingStrategy}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-2 border">Orden</th>
                <th className="p-2 border">Vista previa</th>
                <th className="p-2 border">Título</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Modificar</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <SortableRow key={video.id} id={video.id}>
                  <td className="p-2 border text-center cursor-grab">
                    <FiMove className="text-gray-500" />
                  </td>
                  <td className="p-2 border">
                    <video src={video.url} className="h-16 w-28 object-cover" controls />
                  </td>
                  <td className="p-2 border">{video.title}</td>
                  <td className="p-2 border">{video.description}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/dashboard/galleryVideos/${video.id}`}
                      className="text-[#EB5B00] hover:underline"
                    >
                      Modificar
                    </Link>
                  </td>
                </SortableRow>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      {isSavingOrder && <p className="text-center mt-4 text-blue-500">Guardando el orden...</p>}
    </div>
  );
};

export default ShowGalleryVideos;
