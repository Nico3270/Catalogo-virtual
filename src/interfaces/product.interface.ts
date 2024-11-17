
export interface Section {
    id: string; // Identificador único de la sección
    name: string;
    icon: React.ComponentType<{ className?: string }> // Componente del ícono
    href: string; // Slug de la URL
    order: number; // Orden o prioridad
    isActive: boolean; // Estado activo/inactivo
  }

export interface Product {
    id: string;
    nombre: string;
    precio: number;
    imagen: string;
    descripcion: string;
    seccionIds: string[]; // IDs de las secciones asociadas
    descripcionCorta?: string;
    slug: string;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
    prioridad?: number;
    status?: "available" | "out_of_stock" | "discontinued";
  }