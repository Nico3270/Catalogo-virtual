"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { modifyProduct } from "@/productos/actions/modifyProduct";
import { deleteImage } from "@/productos/actions/deleteImage";
import {
  Alert,
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

interface ImageExtended {
  id: string;
  url: string;
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
  allSections: {
    id: string;
    nombre: string;
  }[];
}

export default function ModifyProduct({ product, allSections }: ModifyProductProps) {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      ...product,
      tags: product.tags.join(", "),
      seccionIds: new Set(product.seccionIds),
      status: product.status || "available",
    },
  });

  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [images, setImages] = useState<ImageExtended[]>([]);

  useEffect(() => {
    setImages(product.imagenes.map((img) => ({ ...img })));
  }, [product.imagenes]);

  const onSubmit = async (data: any) => {
    const success = await modifyProduct({
      id: product.id,
      nombre: data.nombre,
      precio: parseFloat(data.precio),
      descripcion: data.descripcion,
      descripcionCorta: data.descripcionCorta || undefined,
      slug: data.slug,
      prioridad: data.prioridad ? parseInt(data.prioridad) : undefined,
      status: data.status || "available",
      tags: typeof data.tags === "string" ? data.tags.split(",").map((tag: string) => tag.trim()) : [],
      seccionIds: Array.from(data.seccionIds),
      imagesToDelete: images.filter((img) => img.toDelete).map((img) => img.id),
      newImages: images.filter((img) => img.isNew).map((img) => img.url),
    });

    if (success) {
      setAlert({ type: "success", message: "Producto modificado exitosamente." });
    } else {
      setAlert({ type: "error", message: "Ocurrió un error al modificar el producto." });
    }
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === "undefined" || !e.target.files) return;

    const newImages = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isNew: true,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = async (id: string) => {
    const image = images.find((img) => img.id === id);
    if (!image) return;

    if (!image.isNew) {
      const success = await deleteImage(image.url);
      if (!success) {
        setAlert({ type: "error", message: "No se pudo eliminar la imagen." });
        return;
      }
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Modificar Producto</h2>

      <TextField
        label="Nombre"
        {...register("nombre", { required: "El nombre es obligatorio" })}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Precio"
        type="number"
        {...register("precio", { required: "El precio es obligatorio" })}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Descripción"
        {...register("descripcion", { required: "La descripción es obligatoria" })}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />

      <TextField
        label="Descripción Corta"
        {...register("descripcionCorta")}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Slug"
        {...register("slug", { required: "El slug es obligatorio" })}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Prioridad"
        type="number"
        {...register("prioridad")}
        fullWidth
        variant="outlined"
      />

      <FormControl>
        <FormLabel>Estado</FormLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="available" control={<Radio />} label="Disponible" />
              <FormControlLabel value="out_of_stock" control={<Radio />} label="Agotado" />
              <FormControlLabel value="discontinued" control={<Radio />} label="Descontinuado" />
            </RadioGroup>
          )}
        />
      </FormControl>

      <TextField
        label="Tags (separados por coma)"
        {...register("tags")}
        fullWidth
        variant="outlined"
      />

      <div>
        <h3 className="font-semibold mb-4">Imágenes</h3>
        <div className="flex gap-6 flex-wrap mb-6">
          {images.map((img) => (
            <div key={img.id} className="relative w-24 h-24">
              <img
                src={img.url}
                alt="Producto"
                className="w-full h-full object-cover rounded-md"
              />
              <IconButton
                className="absolute top-0 right-0 m-1 bg-white"
                onClick={() => handleRemoveImage(img.id)}
                style={{
                  zIndex: 10,
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                }}
              >
                <FaTrashAlt color="red" size={16} />
              </IconButton>
            </div>
          ))}
        </div>
        <Button variant="outlined" component="label" className="mt-4">
          Añadir imágenes
          <input type="file" hidden multiple onChange={handleAddImage} />
        </Button>
      </div>

      {alert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="flex items-center justify-center w-full mt-6"
        startIcon={<AiOutlineCheckCircle />}
      >
        Modificar Producto
      </Button>
    </form>
  );
}
