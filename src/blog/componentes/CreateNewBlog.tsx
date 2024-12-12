"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

export interface Section {
  id: string;
  nombre: string;
}

export interface FormValues {
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes: { url: string }[];
  parrafos: { texto: string }[];
  subtitulos: { texto: string }[];
  autor: string;
  orden: number;
  secciones: string[];
}

const CreateNewBlog: React.FC<{
  secciones: Section[];
  onSubmit: (data: FormValues) => Promise<any>; // Se acepta cualquier tipo de promesa
}> = ({ secciones, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      titulo: "",
      descripcion: "",
      imagen: "",
      imagenes: [],
      parrafos: [],
      subtitulos: [],
      autor: "",
      orden: 0,
      secciones: [],
    },
  });

  const { fields: imagenFields, append: appendImagen } = useFieldArray({
    control,
    name: "imagenes",
  });

  const { fields: parrafoFields, append: appendParrafo } = useFieldArray({
    control,
    name: "parrafos",
  });

  const { fields: subtituloFields, append: appendSubtitulo } = useFieldArray({
    control,
    name: "subtitulos",
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      const result = await onSubmit(data); // Llama a la función pasada como prop
      alert("¡Blog creado con éxito!");
      console.log("Resultado del servidor:", result); // Muestra el resultado devuelto por el servidor
    } catch (error) {
      console.error("Error al crear el blog:", error);
      alert("Hubo un error al crear el blog.");
    }
  };

  return (
    <form
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h1 className="text-2xl font-bold text-center">Crear Nuevo Blog</h1>

      {/* Título */}
      <div>
        <label className="block font-bold mb-1">Título</label>
        <input
          {...register("titulo", { required: "El título es obligatorio" })}
          className="w-full border rounded p-2"
          placeholder="Título del blog"
        />
        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block font-bold mb-1">Descripción</label>
        <textarea
          {...register("descripcion", { required: "La descripción es obligatoria" })}
          className="w-full border rounded p-2"
          placeholder="Descripción breve del blog"
        />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      {/* Imagen Principal */}
      <div>
        <label className="block font-bold mb-1">Imagen Principal</label>
        <input
          {...register("imagen", { required: "La imagen principal es obligatoria" })}
          className="w-full border rounded p-2"
          placeholder="URL de la imagen principal"
        />
        {errors.imagen && <p className="text-red-500 text-sm">{errors.imagen.message}</p>}
      </div>

      {/* Imágenes Dinámicas */}
      <div>
        <label className="block font-bold mb-1">Imágenes Adicionales</label>
        {imagenFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`imagenes.${index}.url`, {
              required: "La URL de la imagen es obligatoria",
            })}
            className="w-full border rounded p-2 mb-2"
            placeholder={`URL de la imagen ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => appendImagen({ url: "" })}
          className="text-blue-500 flex items-center"
        >
          <FaPlus className="mr-2" /> Añadir Imagen
        </button>
      </div>

      {/* Párrafos */}
      <div>
        <label className="block font-bold mb-1">Párrafos</label>
        {parrafoFields.map((field, index) => (
          <textarea
            key={field.id}
            {...register(`parrafos.${index}.texto`, {
              required: "El párrafo no puede estar vacío",
            })}
            className="w-full border rounded p-2 mb-2"
            placeholder={`Párrafo ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => appendParrafo({ texto: "" })}
          className="text-blue-500 flex items-center"
        >
          <FaPlus className="mr-2" /> Añadir Párrafo
        </button>
      </div>

      {/* Subtítulos */}
      <div>
        <label className="block font-bold mb-1">Subtítulos</label>
        {subtituloFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`subtitulos.${index}.texto`, {
              required: "El subtítulo no puede estar vacío",
            })}
            className="w-full border rounded p-2 mb-2"
            placeholder={`Subtítulo ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={() => appendSubtitulo({ texto: "" })}
          className="text-blue-500 flex items-center"
        >
          <FaPlus className="mr-2" /> Añadir Subtítulo
        </button>
      </div>

      {/* Orden */}
      <div>
        <label className="block font-bold mb-1">Orden</label>
        <input
          {...register("orden", { valueAsNumber: true })}
          className="w-full border rounded p-2"
          type="number"
          placeholder="Orden de prioridad"
        />
      </div>

      {/* Autor */}
      <div>
        <label className="block font-bold mb-1">Autor</label>
        <input
          {...register("autor", { required: "El autor es obligatorio" })}
          className="w-full border rounded p-2"
          placeholder="Nombre del autor"
        />
        {errors.autor && <p className="text-red-500 text-sm">{errors.autor.message}</p>}
      </div>

      {/* Secciones */}
      <div>
        <label className="block font-bold mb-1">Secciones</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {secciones.map((seccion) => (
            <label key={seccion.id} className="flex items-center space-x-2">
              <input {...register("secciones")} type="checkbox" value={seccion.id} />
              <span>{seccion.nombre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de Enviar */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
      >
        Insertar Blog
      </button>
    </form>
  );
};

export default CreateNewBlog;
