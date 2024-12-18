// src/app/cart/page.tsx

import { OrderSummaryWithActions } from "@/carro/componentes/OrderSummaryWithActions";
import { ProductsInCart } from "@/carro/componentes/ProductsInCart";
import { RubikFont } from "@/config/fonts";



export default function CaroPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className={`text-3xl font-bold mb-2 text-center text-[#f07167] pt-4 ${RubikFont.className}`}>
        Tu Carrito de Compras
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna principal para los productos */}
        <div className="w-full lg:w-2/3">
          <ProductsInCart />
        </div>

        {/* Resumen de la orden */}
        <div className="w-full lg:w-1/3 bg-white p-4 shadow-md rounded-lg lg:sticky lg:top-24 pb-20">
          <OrderSummaryWithActions />
        </div>
      </div>
    </div>
  );
}
