"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CartProduct, Product } from "@/interfaces/product.interface";
import { QuantitySelector } from "./QuantitySelector";
import { useCartCatalogoStore } from "@/store/carro/carro-store";
import { FaShoppingCart } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import {  SeccionesFont, titleFont } from "@/config/fonts";
import { InfoEmpresa } from "@/config/config";

interface AddToCartProps {
  product: Product;
}

export const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const addProductToCart = useCartCatalogoStore((state) => state.addProductToCart);

  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    const productToAdd: CartProduct = {
      cartItemId: uuidv4(),
      id: product.id,
      slug: product.slug,
      nombre: product.nombre,
      precio: product.precio,
      cantidad,
      imagen: product.imagenes[0],
      seccionIds: product.seccionIds,
      descripcionCorta: product.descripcionCorta,
      comentario,
    };

    addProductToCart(productToAdd);

    setIsModalOpen(true);
    setCantidad(1);
    setComentario("");

    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  const handleQuantityChange = (newCantidad: number) => {
    setCantidad(newCantidad);
  };

  // Crear mensaje de WhatsApp
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Estoy interesado en el siguiente producto:\n\n` +
    `*${product.nombre}*\n` +
    `Precio: $${(product.precio * cantidad).toFixed(2)}\n\n` +  // Eliminar espacio después de $
    `Puedes ver más detalles aquí:\n` +
    `Puedes ver más detalles aquí: ${InfoEmpresa.linkWebProduccion}/producto/${product.slug}`
  );


  const whatsappUrl = `https://wa.me/${InfoEmpresa.telefono}?text=${whatsappMessage}`;

  return (
    <div className="mt-6 flex flex-col items-center gap-6 bg-white p-6 rounded-lg shadow-md">
      {/* Información del producto */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold color-titulo-tarjeta ${SeccionesFont.className}`}>{product.nombre}</h1>
        <p className={`color-descripcion-tarjeta text-lg mt-2 ${titleFont.className}`}>{product.descripcion}</p>
      </div>

      {/* Selector de cantidad y precio */}
      <div className="flex items-center gap-4 w-full justify-center">
        <QuantitySelector inicio={cantidad} onQuantityChange={handleQuantityChange} />
        <p className="text-lg font-semibold text-[#9f86c0]">
          Precio: ${product.precio.toFixed(2)}
        </p>
      </div>

      {/* Campo de texto para comentario */}
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Comentario..."
        className="w-full max-w-lg border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#2e2d2e] focus:outline-none"
        rows={2}
      />

      {/* Botones */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 color-boton-agregar texto-boton font-bold py-3 px-6 rounded-lg shadow-md transition-all"
        >
          <FaShoppingCart className="text-lg" />
          Agregar
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
        >
          <BsWhatsapp className="text-lg" />
          WhatsApp
        </a>
      </div>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold text-gray-700">¡Producto agregado al carrito!</p>
            <button
              className="color-boton-agregar  texto-boton px-6 py-2 mt-4 rounded-lg  transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
