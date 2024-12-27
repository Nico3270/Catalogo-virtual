"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createProduct } from "@/productos/actions/createProduct";
import {
  Alert,
  Stack,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Chip,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

interface CreateNewProductProps {
  allSections: { id: string; name: string }[];
}

interface ProductFormData {
  nombre: string;
  precio: number;
  descripcion: string;
  descripcionCorta: string;
  slug: string;
  prioridad: number;
  status: "available" | "out_of_stock";
  tags: string;
}

export default function CreateNewProduct({ allSections }: CreateNewProductProps) {
  const { register, handleSubmit, control } = useForm<ProductFormData>({
    defaultValues: {
      nombre: "",
      precio: 0,
      descripcion: "",
      descripcionCorta: "",
      slug: "",
      prioridad: 0,
      status: "available",
      tags: "",
    },
  });

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());
  const [images, setImages] = useState<{ id: string; file: File; url: string }[]>([]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("precio", data.precio.toString());
      formData.append("descripcion", data.descripcion);
      formData.append("descripcionCorta", data.descripcionCorta);
      formData.append("slug", data.slug.toLowerCase().replace(/ /g, "-").trim());
      formData.append("prioridad", data.prioridad.toString());
      formData.append("status", data.status);
      formData.append("tags", data.tags);

      // Agregar IDs de secciones seleccionadas
      selectedSections.forEach((id) => formData.append("seccionIds", id));

      // Agregar imágenes al FormData
      images.forEach((img) => formData.append("images", img.file));

      const result = await createProduct(formData);

      if (result.ok) {
        setAlert({ type: "success", message: "Producto creado exitosamente." });
      } else {
        setAlert({ type: "error", message: result.message || "Ocurrió un error al crear el producto." });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error al crear el producto." });
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleSection = (id: string) => {
    setSelectedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      

      <TextField label="Nombre" {...register("nombre", { required: true })} fullWidth />
      <TextField label="Precio" type="number" {...register("precio", { required: true })} fullWidth />
      <TextField label="Descripción" {...register("descripcion", { required: true })} fullWidth multiline rows={4} />
      <TextField label="Descripción Corta" {...register("descripcionCorta")} fullWidth />
      <TextField label="Slug" {...register("slug", { required: true })} fullWidth />
      <TextField label="Prioridad" type="number" {...register("prioridad")} fullWidth />

      <FormControl>
        <FormLabel>Estado</FormLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="available" control={<Radio />} label="Disponible" />
              <FormControlLabel value="out_of_stock" control={<Radio />} label="Agotado" />
            </RadioGroup>
          )}
        />
      </FormControl>

      {/* Secciones */}
      <div>
        <h3 className="font-bold mb-2">Secciones</h3>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {allSections.map((section) => (
            <Chip
              key={section.id}
              label={section.name}
              onClick={() => toggleSection(section.id)}
              color={selectedSections.has(section.id) ? "primary" : "default"}
              clickable
            />
          ))}
        </Stack>
      </div>

      {/* Imágenes */}
      <div>
        <h3 className="font-bold mb-2">Imágenes</h3>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {images.map((img) => (
            <div key={img.id} className="relative w-32 h-32">
              <Image
                src={img.url}
                alt="Previsualización"
                className="rounded-lg"
                fill
                style={{ objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(img.id)}
                className="absolute top-0 right-0 bg-white"
              >
                <FaTrashAlt color="red" />
              </IconButton>
            </div>
          ))}
          <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer">
            <AiOutlinePlus size={24} />
            <input type="file" accept="image/*" capture multiple onChange={handleAddImage} className="hidden" />
          </label>
        </Stack>
      </div>

      {/* Botón de envío */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Producto
      </Button>

      {/* Alerta */}
      {alert && (
        <Alert severity={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
    </form>
  );
}