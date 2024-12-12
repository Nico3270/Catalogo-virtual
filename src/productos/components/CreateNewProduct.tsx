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
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

interface CreateNewProductProps {
  allSections: { id: string; name: string }[];
}

export default function CreateNewProduct({ allSections }: CreateNewProductProps) {
  const { register, handleSubmit, control } = useForm({
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
  const [images, setImages] = useState<{ id: string; url: string; isNew: boolean }[]>([]);

  const onSubmit = async (data: any) => {
    try {
      const result = await createProduct({
        ...data,
        precio: parseFloat(data.precio),
        prioridad: parseInt(data.prioridad, 10),
        tags: data.tags.split(",").map((tag: string) => tag.trim()),
        seccionIds: Array.from(selectedSections),
        newImages: images.map((img) => img.url),
      });

      if (result) {
        setAlert({ type: "success", message: "Producto creado exitosamente." });
      } else {
        setAlert({ type: "error", message: "Ocurrió un error al crear el producto." });
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
        url: URL.createObjectURL(file),
        isNew: true,
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Crear Nuevo Producto</h2>
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

      <div>
        <h3>Secciones</h3>
        {allSections.map((section) => (
          <Chip
            key={section.id}
            label={section.name}
            color={selectedSections.has(section.id) ? "primary" : "default"}
            clickable
            onClick={() =>
              setSelectedSections((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(section.id)) {
                  newSet.delete(section.id);
                } else {
                  newSet.add(section.id);
                }
                return newSet;
              })
            }
          />
        ))}
      </div>

      <div>
        <h3>Imágenes</h3>
        <input type="file" multiple onChange={handleAddImage} />
        <div className="flex gap-4 flex-wrap mt-4">
          {images.map((img) => (
            <div key={img.id} className="relative w-24 h-24">
              <img src={img.url} alt="Imagen subida" className="w-full h-full object-cover rounded-md" />
              <IconButton
                className="absolute top-0 right-0 bg-white"
                onClick={() => handleRemoveImage(img.id)}
              >
                <FaTrashAlt color="red" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full flex items-center justify-center mt-6"
        startIcon={<AiOutlineCheckCircle />}
      >
        Crear Producto
      </Button>

      {alert && <Stack sx={{ width: "100%" }} spacing={2} className="mt-4"><Alert severity={alert.type}>{alert.message}</Alert></Stack>}
    </form>
  );
}
