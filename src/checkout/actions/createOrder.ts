"use server";

import prisma from "@/lib/prisma";
import { Prisma, OrderState } from "@prisma/client"; // Importamos los tipos de Prisma

interface CreateOrderInput {
  cartItems: {
    productId: string;
    cantidad: number;
    precio: number;
    comentario?: string;
  }[];
  address: {
    senderName: string;
    senderPhone: string;
    recipientName?: string;
    recipientPhone: string;
    deliveryAddress: string;
    occasion?: string;
    dedicationMessage?: string;
    deliveryDate?: string;
    deliveryTime?: string;
    additionalComments?: string;
  };
}

export const createOrder = async (data: CreateOrderInput) => {
  try {
    const { cartItems, address } = data;

    // Crear la transacción en la base de datos con el tipo correcto para `tx`
    const createdOrder = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Crear los datos de entrega
      const deliveryData = await tx.deliveryData.create({
        data: {
          senderName: address.senderName,
          senderPhone: address.senderPhone,
          recipientName: address.recipientName || null,
          recipientPhone: address.recipientPhone,
          deliveryAddress: address.deliveryAddress,
          occasion: address.occasion || null,
          dedicationMessage: address.dedicationMessage || null,
          deliveryDate: address.deliveryDate ? new Date(address.deliveryDate) : null,
          deliveryTime: address.deliveryTime || null,
          additionalComments: address.additionalComments || null,
        },
      });

      // Crear la orden
      const order = await tx.order.create({
        data: {
          estado: OrderState.RECIBIDA, // Estado predeterminado
          datosDeEntrega: {
            connect: { id: deliveryData.id },
          },
          items: {
            create: cartItems.map((item) => ({
              cantidad: item.cantidad,
              precio: item.precio,
              comentario: item.comentario || null,
              producto: {
                connect: { id: item.productId },
              },
            })),
          },
        },
        include: {
          items: true, // Incluir los items en la respuesta
        },
      });

      // Crear el historial inicial del estado
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          previousState: null, // No hay estado previo, ya que es la creación inicial
          newState: OrderState.RECIBIDA, // Estado inicial
          comment: "Orden creada y marcada como recibida automáticamente.",
        },
      });

      return order;
    });

    return { success: true, order: createdOrder };
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return { success: false, error: "Error al crear la orden." };
  }
};
