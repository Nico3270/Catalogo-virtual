"use client";

import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  IconButton,
  Alert,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { postNewBlog } from "@/blog/actions/postNewBlog";

interface Section {
  id: string;
  nombre: string;
}

interface BlogFormData {
  titulo: string;
  descripcion: string;
  autor: string;
  orden: number;
  parrafos: { texto: string }[];
  subtitulos: { texto: string }[];
  imagen: string;
  imagenes: { url: string }[];
  secciones: string[];
}

interface CreateNewBlogProps {
  secciones: Section[];
}

export default function CreateNewBlog({ secciones }: CreateNewBlogProps) {
  const { register, handleSubmit, control, setValue, reset } = useForm<BlogFormData>({
    defaultValues: {
      titulo: "",
      descripcion: "",
      autor: "",
      orden: 0,
      parrafos: [],
      subtitulos: [],
      secciones: [],
    },
  });

  const { fields: parrafos, append: addParrafo, remove: removeParrafo } =
    useFieldArray({
      control,
      name: "parrafos",
    });

  const { fields: subtitulos, append: addSubtitulo, remove: removeSubtitulo } =
    useFieldArray({
      control,
      name: "subtitulos",
    });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const [images, setImages] = useState<
    { id: string; file: File; url: string }[]
  >([]);

  const [mainImage, setMainImage] = useState<{
    file: File | null;
    url: string | null;
  }>({
    file: null,
    url: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const additionalFileInputRef = useRef<HTMLInputElement | null>(null);
  // Estado para manejar las secciones seleccionadas
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    const updatedSections = selectedSections.includes(id)
      ? selectedSections.filter((sec) => sec !== id)
      : [...selectedSections, id];
    setSelectedSections(updatedSections);
    setValue("secciones", updatedSections); // Actualiza el valor en react-hook-form
  };

  // Imagen Principal
  const handleAddMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  // Imágenes Adicionales
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleFormSubmit = async (data: BlogFormData) => {
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("descripcion", data.descripcion);
      formData.append("autor", data.autor);
      formData.append("orden", data.orden.toString());

      if (mainImage.file) {
        formData.append("imagenPrincipal", mainImage.file);
      }

      images.forEach((img) => formData.append("imagenes", img.file));

      data.parrafos.forEach((parrafo, index) =>
        formData.append(`parrafos[${index}][texto]`, parrafo.texto)
      );
      data.subtitulos.forEach((subtitulo, index) =>
        formData.append(`subtitulos[${index}][texto]`, subtitulo.texto)
      );

      const result = await postNewBlog(formData);

      if (result.ok) {
        setOpenModal(true); // Mostrar modal
        reset(); // Reiniciar formulario
        setImages([]);
        setMainImage({ file: null, url: null });
        setAlert({ type: "success", message: result.message });
      } else {
        setAlert({ type: "error", message: result.message });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error al crear el blog." });
      console.log(error);
    }
  };

  return (<>
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
        Crear Nuevo Blog
      </Typography>

      <Divider />

      <TextField
        label="Título"
        {...register("titulo", { required: "El título es obligatorio" })}
        fullWidth
      />

      <TextField
        label="Descripción"
        {...register("descripcion", { required: true })}
        fullWidth
        multiline
        rows={4}
      />

      <TextField
        label="Autor"
        {...register("autor", { required: true })}
        fullWidth
      />

      <TextField
        label="Orden"
        type="number"
        {...register("orden")}
        fullWidth
      />
      {/* Subtítulos */}
      <Typography variant="h6" fontWeight="bold">
        Subtítulos
      </Typography>
      {subtitulos.map((field, index) => (
        <Stack direction="row" spacing={2} key={field.id} alignItems="center">
          <TextField
            {...register(`subtitulos.${index}.texto` as const, {
              required: "El subtítulo no puede estar vacío",
            })}
            fullWidth
            placeholder={`Subtítulo ${index + 1}`}
          />
          <IconButton onClick={() => removeSubtitulo(index)}>
            <FaTrashAlt color="red" />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        startIcon={<AiOutlinePlus />}
        onClick={() => addSubtitulo({ texto: "" })}
      >
        Añadir Subtítulo
      </Button>

      {/* Párrafos */}
      <Typography variant="h6" fontWeight="bold">
        Párrafos
      </Typography>
      {parrafos.map((field, index) => (
        <Stack direction="row" spacing={2} key={field.id} alignItems="center">
          <TextField
            {...register(`parrafos.${index}.texto` as const, {
              required: "El párrafo no puede estar vacío",
            })}
            fullWidth
            placeholder={`Párrafo ${index + 1}`}
          />
          <IconButton onClick={() => removeParrafo(index)}>
            <FaTrashAlt color="red" />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        startIcon={<AiOutlinePlus />}
        onClick={() => addParrafo({ texto: "" })}
      >
        Añadir Párrafo
      </Button>


      {/* Imagen Principal */}
      <Typography variant="h6" fontWeight="bold">
        Imagen Principal
      </Typography>
      <div className="flex items-center justify-center w-64 h-64 border-2 border-dashed rounded-lg cursor-pointer relative">
        {mainImage.url ? (
          <Image
            src={mainImage.url}
            alt="Imagen Principal"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <MdAddAPhoto size={40} className="text-gray-400" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAddMainImage}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {/* Imágenes Adicionales */}
      <Typography variant="h6" fontWeight="bold">
        Imágenes Adicionales
      </Typography>
      <Button
        variant="outlined"
        startIcon={<AiOutlinePlus />}
        onClick={() => additionalFileInputRef.current?.click()}
      >
        Añadir Imágenes
      </Button>
      <input
        ref={additionalFileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImages}
        className="hidden"
      />

      {images.map((img) => (
        <div key={img.id} className="relative w-32 h-32">
          <Image src={img.url} alt="Imagen" layout="fill" className="rounded-lg" />
          <IconButton
            onClick={() => handleRemoveImage(img.id)}
            className="absolute top-0 right-0 bg-white"
          >
            <FaTrashAlt color="red" />
          </IconButton>
        </div>
      ))}

      <Divider />

      <Typography variant="h6" fontWeight="bold">
        Secciones
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {secciones.map((seccion) => (
          <FormControlLabel
            key={seccion.id}
            control={
              <Checkbox
                checked={selectedSections.includes(seccion.id)}
                onChange={() => toggleSection(seccion.id)}
              />
            }
            label={seccion.nombre}
          />
        ))}
      </Stack>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Blog
      </Button>

      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
    </form>

    {/* Modal de éxito */}
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>Blog Creado</DialogTitle>
      <DialogContent>
        <Typography>
          El blog ha sido creado exitosamente.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  </>

  );
}
