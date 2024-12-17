"use client";

import React, { useState} from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Link from "next/link";
import Image from "next/image";
import { ImageGalleryItem } from "../interfaces/types";
import { addNewImage } from "@/galeria/actions/addNewImage";
import { updateImagesOrder } from "@/galeria/actions/updateImagesOrder";
import { SortableRow } from "./SortableRow";
import { FiMove } from "react-icons/fi";
import { RubikFont } from "@/config/fonts";

interface ShowGalleryImagesProps {
  initialImages: ImageGalleryItem[];
}

const ShowGalleryImages: React.FC<ShowGalleryImagesProps> = ({ initialImages }) => {
  const [images, setImages] = useState<ImageGalleryItem[]>(initialImages);
  const [newImage, setNewImage] = useState<ImageGalleryItem>({
    id: "",
    url: "",
    title: "",
    description: "",
    order: images.length + 1,
  });
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);

      const reorderedImages = arrayMove(images, oldIndex, newIndex).map((image, index) => ({
        ...image,
        order: index + 1,
      }));

      setImages(reorderedImages);

      try {
        setIsSavingOrder(true);
        const result = await updateImagesOrder(
          reorderedImages.map(({ id, order }) => ({ id, order }))
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

  const handleAddImage = async () => {
    if (newImage.url && newImage.title && newImage.description) {
      try {
        const response = await addNewImage({
          url: newImage.url,
          title: newImage.title,
          description: newImage.description,
          order: images.length + 1,
        });

        if (response.success && response.image) {
          setImages([...images, response.image]);
          setNewImage({ id: "", url: "", title: "", description: "", order: images.length + 2 });
          alert("Imagen agregada con éxito.");
        } else {
          console.error(response || "Error al agregar la imagen.");
        }
      } catch (error) {
        console.error("Error al agregar la imagen:", error);
        alert("Error al agregar la imagen.");
      }
    } else {
      alert("Por favor, completa todos los campos antes de agregar una nueva imagen.");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h1 className={`text-2xl font-bold mb-4 text-center text-[#D91656] ${RubikFont.className}`}>
        Administración de imágenes de la galería
      </h1>

      {/* Formulario para agregar una nueva imagen */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Agregar nueva imagen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="URL de la imagen"
            value={newImage.url}
            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Título"
            value={newImage.title}
            onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newImage.description}
            onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
            className="border rounded-md p-2"
          />
        </div>
        <button
          onClick={handleAddImage}
          className="mt-4 bg-[#EB5B00] text-white px-4 py-2 rounded-md hover:bg-[#FFB200]"
        >
          Agregar Imagen
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image.id)} strategy={verticalListSortingStrategy}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-2 border">Orden</th>
                <th className="p-2 border">Imagen</th>
                <th className="p-2 border">Título</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Modificar</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <SortableRow key={image.id} id={image.id}>
                  <td className="p-2 border text-center cursor-grab">
                    <FiMove className="text-gray-500" />
                  </td>
                  <td className="p-2 border">
                    <Image
                      src={image.url}
                      alt={image.title}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">{image.title}</td>
                  <td className="p-2 border">{image.description}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/dashboard/galleryImages/${image.id}`}
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

export default ShowGalleryImages;
