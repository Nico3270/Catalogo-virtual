"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  uploadCarruselImage,
  deleteCarruselImage,
} from "../actions/carruselPrincipalActions";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {  FaUpload } from "react-icons/fa";

// Props del componente
interface ModifyCarruselImageProps {
  sectionId: string;
  initialImageUrl: string;
  onImageUpdated: (newUrl: string) => void;
}

const ModifyCarruselImage: React.FC<ModifyCarruselImageProps> = ({
  initialImageUrl,
  onImageUpdated,
}) => {
  const [previewImage, setPreviewImage] = useState<string>(initialImageUrl);
  const [localImage, setLocalImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Manejo de cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Guardar nueva imagen
  const handleSaveImage = async () => {
    if (!localImage) return;
    setLoading(true);

    try {
      // Eliminar imagen anterior en Cloudinary
      if (initialImageUrl) {
        await deleteCarruselImage(initialImageUrl);
      }

      // Subir nueva imagen
      const newImageUrl = await uploadCarruselImage(localImage);

      // Actualizar el formulario o BD con la nueva URL
      if (newImageUrl) {
        onImageUpdated(newImageUrl);
        setModalMessage("Imagen del carrusel actualizada exitosamente");
      } else {
        setModalMessage("Error al actualizar la imagen");
      }
    } catch (error) {
      setModalMessage("Error al actualizar la imagen");
      console.log(error);
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-300">
        <Image
          src={previewImage || "/imgs/image_not_found.webp"}
          alt="Sección Carrusel"
          fill
          className="object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>

      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <FaUpload />}
        onClick={handleSaveImage}
        disabled={loading || !localImage}
      >
        {loading ? "Actualizando..." : "Actualizar Imagen"}
      </Button>

      {/* Modal de confirmación */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 text-center">
          <Typography>{modalMessage}</Typography>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            color="primary"
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModifyCarruselImage;