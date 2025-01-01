import { Articulo } from "@/secondary/componentes/BlogArticulos";
import React from "react";
import Image from "next/image";
import { LatoFont, SeccionesFont, titleFont } from "@/config/fonts";

interface ShowBlogArticleProps {
  article: Articulo;
}

const ShowBlogArticle: React.FC<ShowBlogArticleProps> = ({ article }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 pb-16">
      {/* Imagen destacada */}
      <div className="mb-6">
        <Image
          src={article.imagen}
          alt={`Imagen destacada - ${article.titulo}`}
          width={1280}
          height={400}
          className="w-full h-72 object-cover rounded-lg"
          priority // Asegura que esta imagen se cargue primero
        />
      </div>

      {/* Título y detalles */}
      <header className="mb-8">
        <h1 className={`text-4xl font-bold color-titulos ${SeccionesFont.className}`}>
          {article.titulo}
        </h1>
        <p className={`color-descripcion-tarjeta mt-2 ${titleFont.className}`}>
          Por <span className="font-semibold">{article.autor}</span> el{" "}
          {new Date(article.fechaPublicacion).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Contenido del artículo */}
      <section className="space-y-8">
        {article.parrafos.map((parrafo, index) => (
          <React.Fragment key={index}>
            {article.subtitulos[index] && parrafo && (
              <h2
                className={`text-2xl font-semibold color-secundario ${SeccionesFont.className}`}
              >
                {article.subtitulos[index]}
              </h2>
            )}
            <p className={`text-lg color-descripcion-tarjeta ${LatoFont.className}`}>
              {parrafo}
            </p>

            {/* Imágenes adicionales */}
            {article.imagenes[index] && (
              <div className="my-4">
                <Image
                  src={article.imagenes[index]}
                  alt={`Imagen relacionada con "${article.subtitulos[index] || article.titulo}"`}
                  width={800}
                  height={450}
                  className="w-full object-cover rounded-lg shadow-md"
                  loading="lazy" // Carga diferida
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </section>
    </article>
  );
};

export default ShowBlogArticle;
