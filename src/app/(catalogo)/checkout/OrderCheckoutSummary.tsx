"use client";

import { useCartCatalogoStore } from "@/store/carro/carro-store";
import { Precio } from "@/seccion/componentes/Precio";
import { useEffect, useState } from "react";
import { useAddressStore } from "@/store/address/address-store";
import { createOrder } from "@/checkout/actions/createOrder";
import { BsWhatsapp } from "react-icons/bs";
import { useRouter } from "next/navigation"; // Importar el router

export default function OrderCheckoutSummary() {
  const router = useRouter(); // Inicializar el router
  const cartItems = useCartCatalogoStore((state) => state.cart);
  const totalItems = useCartCatalogoStore((state) => state.getTotalItems());
  const totalPrice = useCartCatalogoStore((state) => state.getTotalPrice());
  const address = useAddressStore((state) => state.address);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || totalItems === 0) {
    return null;
  }

  const handleConfirmOrder = async () => {
    const orderDetails = cartItems
      .map(
        (item) =>
          `${item.cantidad} x ${item.nombre}${item.comentario ? ` (Comentario: ${item.comentario})` : ""}`
      )
      .join("\n");

    const message = `
📦 *Resumen de Pedido*
${orderDetails}
-----------------------------------
🔢 *Total de Artículos*: ${totalItems}
💰 *Total a Pagar*: $${totalPrice}
-----------------------------------
📍 *Datos de Entrega*:
- Remitente: ${address.senderName} (${address.senderPhone})
- Destinatario: ${address.recipientName || "N/A"} (${address.recipientPhone})
- Dirección: ${address.deliveryAddress}
- Ocasión: ${address.occasion || "N/A"}
- Dedicatoria: ${address.dedicationMessage || "N/A"}
- Fecha de Entrega: ${address.deliveryDate || "N/A"}
- Hora de Entrega: ${address.deliveryTime || "N/A"}
- Comentarios: ${address.additionalComments || "N/A"}
-----------------------------------
Gracias por tu compra!`;

    // Crear la orden en la base de datos
    const response = await createOrder({
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
        comentario: item.comentario,
      })),
      address,
    });

    if (response.success) {
      console.log("Orden creada exitosamente:", response.order);
      router.refresh();

      // Abrir WhatsApp
      const whatsappURL = `https://wa.me/573182293083?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    } else {
      console.error("Error al crear la orden:", response.error);
      alert("Hubo un problema al procesar tu orden. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Información del Pedido</h2>
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Datos de Entrega</h3>
        <p><strong>Remitente:</strong> {address.senderName} ({address.senderPhone})</p>
        <p><strong>Destinatario:</strong> {address.recipientName || "N/A"} ({address.recipientPhone})</p>
        <p><strong>Dirección:</strong> {address.deliveryAddress}</p>
        <p><strong>Ocasión:</strong> {address.occasion || "N/A"}</p>
        <p><strong>Dedicatoria:</strong> {address.dedicationMessage || "N/A"}</p>
        <p><strong>Fecha de Entrega:</strong> {address.deliveryDate || "N/A"}</p>
        <p><strong>Hora de Entrega:</strong> {address.deliveryTime || "N/A"}</p>
        <p><strong>Comentarios:</strong> {address.additionalComments || "N/A"}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Resumen de Orden</h3>
        {cartItems.map((product) => (
          <p key={product.cartItemId}>
            <span className="font-bold">{product.cantidad} - </span>
            {product.nombre}
          </p>
        ))}
        <p className="font-bold text-red-600 text-lg flex items-center">
          Total a pagar: <Precio value={totalPrice} />
        </p>
        <button
          className="mt-4 px-6 py-2 flex items-center justify-center gap-2 rounded-lg text-white font-bold w-full bg-green-500 hover:bg-green-600 transition"
          onClick={handleConfirmOrder}
        >
          <BsWhatsapp className="text-xl" /> {/* Ícono de WhatsApp */}
          Confirmar Pedido en WhatsApp
        </button>
      </div>
    </div>
  );
}
