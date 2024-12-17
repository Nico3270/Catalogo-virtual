"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { modifyProduct } from "@/productos/actions/modifyProduct";
import {
  Alert,
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  FormControl,
  FormLabel,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface ImageExtended {
  id: string;
  url: string;
  file?: File;
  toDelete?: boolean;
  isNew?: boolean;
}

interface ModifyProductProps {
  product: {
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionCorta?: string;
    slug: string;
    prioridad?: number;
    status?: "available" | "out_of_stock" | "discontinued";
    tags: string[];
    imagenes: { id: string; url: string }[];
    seccionIds: string[];
  };
  allSections: { id: string; nombre: string }[];
}

interface ModifyProductFormData {
  nombre: string;
  precio: number;
  descripcion: string;
  descripcionCorta?: string;
  slug: string;
  prioridad?: number;
  status: "available" | "out_of_stock" | "discontinued";
  tags: string;
  seccionIds: string[]; // Añadimos el campo seccionIds
}

export default function ModifyProduct({ product, allSections }: ModifyProductProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ModifyProductFormData>({
    defaultValues: {
      ...product,
      tags: product.tags.join(", "),
      seccionIds: product.seccionIds, // Sección añadida en defaultValues
      status: product.status || "available",
    },
  });

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [images, setImages] = useState<ImageExtended[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedSections = watch("seccionIds") || []; // Se asegura de que sea un array

  useEffect(() => {
    setImages(product.imagenes.map((img) => ({ ...img })));
  }, [product.imagenes]);

  const toggleSection = (id: string) => {
    const updatedSections = selectedSections.includes(id)
      ? selectedSections.filter((sectionId) => sectionId !== id)
      : [...selectedSections, id];
    setValue("seccionIds", updatedSections);
  };

  const onSubmit = async (data: ModifyProductFormData) => {
    setAlert(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("nombre", data.nombre);
    formData.append("precio", data.precio.toString());
    formData.append("descripcion", data.descripcion);
    formData.append("descripcionCorta", data.descripcionCorta || "");
    formData.append("slug", data.slug.toLowerCase().replace(/ /g, "-").trim());
    formData.append("prioridad", (data.prioridad || 0).toString());
    formData.append("status", data.status || "available");
    formData.append("tags", data.tags);

    // Secciones
    data.seccionIds.forEach((id) => formData.append("seccionIds", id));

    // Imágenes para borrar
    images
      .filter((img) => img.toDelete)
      .forEach((img) => formData.append("imagesToDelete", img.id));

    // Imágenes nuevas
    const newImages = images.filter((img) => img.isNew && img.file);
    newImages.forEach((img) => formData.append("newImages", img.file as File));

    const result = await modifyProduct(formData);
    setLoading(false);

    if (result.ok) {
      setAlert({ type: "success", message: result.message });
    } else {
      setAlert({ type: "error", message: result.message || "Ocurrió un error al modificar el producto." });
    }
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setLoading(true);

    const compressedImages = await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        });

        return {
          id: crypto.randomUUID(),
          file: compressedFile,
          url: URL.createObjectURL(compressedFile),
          isNew: true,
        };
      })
    );

    setLoading(false);
    setImages((prev) => [...prev, ...compressedImages]);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
            ...img,
            toDelete: true,
          }
          : img
      )
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Modificar Producto</h2>

      {/* Nombre */}
      <TextField
        label="Nombre"
        {...register("nombre", { required: "El nombre es obligatorio" })}
        fullWidth
        error={!!errors.nombre}
        helperText={errors.nombre?.message}
      />

      {/* Precio */}
      <TextField
        label="Precio"
        type="number"
        {...register("precio", { required: "El precio es obligatorio" })}
        fullWidth
        error={!!errors.precio}
        helperText={errors.precio?.message}
      />

      {/* Descripción */}
      <TextField
        label="Descripción"
        {...register("descripcion", { required: "La descripción es obligatoria" })}
        fullWidth
        multiline
        rows={4}
        error={!!errors.descripcion}
        helperText={errors.descripcion?.message}
      />

      {/* Descripción Corta */}
      <TextField label="Descripción Corta" {...register("descripcionCorta")} fullWidth />

      {/* Slug */}
      <TextField
        label="Slug"
        {...register("slug", { required: "El slug es obligatorio" })}
        fullWidth
        error={!!errors.slug}
        helperText={errors.slug?.message}
      />

      {/* Prioridad */}
      <TextField label="Prioridad" type="number" {...register("prioridad")} fullWidth />

      {/* Estado */}
      <FormControl>
        <FormLabel>Estado</FormLabel>
        <select {...register("status")}>
          <option value="available">Disponible</option>
          <option value="out_of_stock">Agotado</option>
          <option value="discontinued">Descontinuado</option>
        </select>
      </FormControl>

      {/* Tags */}
      <TextField label="Tags (separados por coma)" {...register("tags")} fullWidth />

      {/* Secciones */}
      <div>
        <FormLabel>Secciones</FormLabel>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {allSections.map((section) => (
            <FormControlLabel
              key={section.id}
              control={
                <Checkbox
                  checked={selectedSections.includes(section.id)}
                  onChange={() => toggleSection(section.id)}
                />
              }
              label={section.nombre}
            />
          ))}
        </Stack>
      </div>

      {/* Imágenes */}
      <div>
        <FormLabel>Imágenes</FormLabel>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {images.map((image) => (
            <div key={image.id} className="relative w-24 h-24">
              <Image
                src={image.url}
                alt="Imagen"
                className="rounded-md"
                fill
                style={{ objectFit: "cover" }}
              />
              {image.toDelete && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center rounded-md">
                  <span className="text-white font-bold">Eliminar</span>
                </div>
              )}
              <IconButton
                onClick={() => handleRemoveImage(image.id)}
                className="absolute top-0 right-0"
              >
                <FaTrashAlt />
              </IconButton>
            </div>
          ))}
          <input type="file" multiple onChange={handleAddImage} />
        </Stack>
      </div>

      {/* Botón de Guardar */}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Cambios"}
      </Button>

      {/* Alertas */}
      {alert && (
        <Alert severity={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
    </form>
  );
}