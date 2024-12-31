"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImageToCloudinary, createTestimonial } from "../actions/testimonialActions";
import { CircularProgress, Modal, Box, Typography, Button } from "@mui/material";
import Image from "next/image";

interface NewTestimonialForm {
  titulo: string;
  descripcion: string;
  imagen: FileList;
}

const NewTestimonial = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewTestimonialForm>();

  // Manejar previsualización de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Lógica para enviar formulario
  const onSubmit = async (data: NewTestimonialForm) => {
    if (!data.imagen[0]) return;

    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(data.imagen[0]);

      // Crear el testimonio en la base de datos
      await createTestimonial({
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagen: imageUrl,
      });

      setModalMessage("Testimonio creado exitosamente");
      reset();
      setPreviewImage(null);
    } catch (error) {
      setModalMessage("Hubo un error al crear el testimonio");
      console.error(error)
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#D91656] mb-4">Nuevo Testimonio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-bold mb-2">Título</label>
          <input
            {...register("titulo", { required: "El título es obligatorio" })}
            className="w-full p-2 border rounded-lg"
            placeholder="Nombre del cliente"
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-bold mb-2">Descripción</label>
          <textarea
            {...register("descripcion", { required: "La descripción es obligatoria" })}
            className="w-full p-2 border rounded-lg"
            placeholder="Testimonio del cliente"
          />
          {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
        </div>

        {/* Imagen */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-bold mb-2">Imagen</label>
          <div className="relative w-40 h-40 border-dashed border-2 rounded-lg flex justify-center items-center overflow-hidden">
            {previewImage ? (
              <Image src={previewImage} alt="Previsualización" layout="fill" objectFit="cover" />
            ) : (
              <FaCloudUploadAlt className="text-5xl text-gray-400" />
            )}
            <input
              {...register("imagen", { required: "La imagen es obligatoria" })}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {errors.imagen && <p className="text-red-500">{errors.imagen.message}</p>}
        </div>

        {/* Botón de crear */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#D91656] text-white py-2 px-6 rounded-lg hover:bg-[#B8144D]"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Crear Testimonio"}
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="bg-white p-6 rounded-lg max-w-sm mx-auto mt-40">
          <Typography>{modalMessage}</Typography>
          <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NewTestimonial;
