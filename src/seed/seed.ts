import { Section } from "@/interfaces/product.interface";
import {  FaBirthdayCake,  FaGift,  } from "react-icons/fa";
import { GiBearFace, GiChocolateBar,  GiFlowers, GiPartyPopper } from "react-icons/gi";
import { IoIosRestaurant } from "react-icons/io";
import { IoWoman } from "react-icons/io5";
import { MdFreeBreakfast, MdOutlineMan } from "react-icons/md";
import { TbMoodKid } from "react-icons/tb";

// MenuSectionsBar
export const sectionsMenuSectionsBar: Omit<Section, "id">[] = [
    { name: "Cumpleaños", icon: FaBirthdayCake, href: "cumpleaños", isActive: true, order:1  },
    { name: "Desayunos", icon: IoIosRestaurant, href: "desayunos_sorpresa", isActive: true, order:2 },
    { name: "Detalles florales", icon: GiFlowers , href: "detalles_florales", isActive: true, order:3 },
    { name: "Peluches", icon: GiBearFace, href: "peluches", isActive: true, order:4 },
    { name: "Mugs", icon: MdFreeBreakfast, href: "mugs", isActive: true, order:5 },
    { name: "Chocolates", icon: GiChocolateBar, href: "chocolates", isActive: true, order:6 },
    { name: "Día del hombre", icon: MdOutlineMan, href: "dia_hombre", isActive: true, order:7 },
    { name: "Día de la mujer", icon: IoWoman, href: "dia_mujer", isActive: true, order:8 },
    { name: "Niños", icon: TbMoodKid, href: "niños", isActive: true, order:9 },
    { name: "Cajas sorpresas", icon: FaGift, href: "cajas_sorpresa", isActive: true, order:10 },
    { name: "Decoraciones", icon: GiPartyPopper, href: "decoraciones", isActive: true, order:11 },
  ];