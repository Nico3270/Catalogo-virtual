"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export interface AdaptedArticulo {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes: { url: string }[];
  parrafos: { texto: string }[];
  subtitulos: { texto: string }[];
  autor: string;
  orden: number;
  secciones: { id: string; nombre: string }[];
}

const ModifyBlogComponent: React.FC<{
  blog: AdaptedArticulo;
  onSubmit: (data: any) => Promise<void>;
}> = ({ blog, onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<AdaptedArticulo>({
    defaultValues: blog,
  });

  const { fields: imagenFields, append: appendImagen, remove: removeImagen } =
    useFieldArray({ control, name: "imagenes" });

  const { fields: parrafoFields, append: appendParrafo, remove: removeParrafo } =
    useFieldArray({ control, name: "parrafos" });

  const { fields: subtituloFields, append: appendSubtitulo, remove: removeSubtitulo } =
    useFieldArray({ control, name: "subtitulos" });

    const handleFormSubmit = async (data: AdaptedArticulo) => {
      console.log("Datos enviados desde el formulario:", data);
      const formattedData = {
        ...data,
        imagenes: data.imagenes.map((img) => img.url),
        parrafos: data.parrafos.map((p) => p.texto),
        subtitulos: data.subtitulos.map((s) => s.texto),
      };
      console.log("Datos formateados:", formattedData);
      await onSubmit(formattedData);
    };

  return (
    <form
  onSubmit={handleSubmit(handleFormSubmit)}
  className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 pb-20"
>
      <h1 className="text-2xl font-bold text-center">Modificar Blog</h1>

      {/* Título */}
      <div>
        <label className="block font-bold mb-1">Título</label>
        <input
          {...register("titulo", { required: "El título es obligatorio" })}
          className="w-full border rounded p-2"
          placeholder="Título del blog"
        />
        {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block font-bold mb-1">Descripción</label>
        <textarea
          {...register("descripcion", { required: "La descripción es obligatoria" })}
          className="w-full border rounded p-2"
          placeholder="Descripción breve del blog"
        />
        {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
      </div>

      {/* Imagen Principal */}
      <div>
        <label className="block font-bold mb-1">Imagen Principal</label>
        <input
          {...register("imagen", { required: "La imagen principal es obligatoria" })}
          className="w-full border rounded p-2"
          placeholder="URL de la imagen principal"
        />
        {errors.imagen && <p className="text-red-500">{errors.imagen.message}</p>}
      </div>

      {/* Imágenes Adicionales */}
      <div>
        <label className="block font-bold mb-1">Imágenes Adicionales</label>
        {imagenFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <input
              {...register(`imagenes.${index}.url`)}
              className="w-full border rounded p-2"
              placeholder={`URL de la imagen ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeImagen(index)}
              className="text-red-500"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendImagen({ url: "" })}
          className="text-[#D91656] flex items-center"
        >
          <FaPlus className="mr-2" /> Añadir Imagen
        </button>
      </div>

      {/* Párrafos */}
      <div>
        <label className="block font-bold mb-1">Párrafos</label>
        {parrafoFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <textarea
              {...register(`parrafos.${index}.texto`)}
              className="w-full border rounded p-2"
              placeholder={`Párrafo ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeParrafo(index)}
              className="text-red-500"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendParrafo({ texto: "" })}
          className="text-[#D91656] flex items-center"
        >
          <FaPlus className="mr-2" /> Añadir Párrafo
        </button>
      </div>

      {/* Subtítulos */}
      <div>
        <label className="block font-bold mb-1">Subtítulos</label>
        {subtituloFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <input
              {...register(`subtitulos.${index}.texto`)}
              className="w-full border rounded p-2"
              placeholder={`Subtítulo ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeSubtitulo(index)}
              className="text-red-500"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSubtitulo({ texto: "" })}
          className="text-[#D91656] flex items-center"
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
        {errors.autor && <p className="text-red-500">{errors.autor.message}</p>}
      </div>

      {/* Secciones */}
      <div>
        <label className="block font-bold mb-1">Secciones</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {blog.secciones.map((seccion) => (
            <label key={seccion.id} className="flex items-center space-x-2">
              <input
                {...register("secciones", { required: "Selecciona al menos una sección" })}
                type="checkbox"
                value={seccion.id}
              />
              <span>{seccion.nombre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de Guardar */}
      <button
        type="submit"
        className="w-full bg-[#640D5F] text-white font-bold py-2 rounded hover:bg-[#D91656]"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default ModifyBlogComponent;
