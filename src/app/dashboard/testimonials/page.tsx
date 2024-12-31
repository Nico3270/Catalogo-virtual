import React from "react";



import { getTestimonials } from "@/principal/actions/testimonialActions";
import NewTestimonial from "@/principal/componentes/NewTestimonial";
import ListTestimonials from "@/principal/componentes/ListTestimonials";

const TestimonialsPage = async () => {
  // Obtener testimonios desde la base de datos
  const testimonios = await getTestimonials();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#D91656] text-center">Gestionar Testimonios</h1>
      
      {/* Formulario para agregar nuevos testimonios */}
      <div className="mb-8">
        <NewTestimonial />
      </div>

      {/* Listado de testimonios */}
      <div className="pb-20">
        <ListTestimonials testimonios={testimonios} />
      </div> 
    </section>
  );
};

export default TestimonialsPage;
