"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaBookmark, FaBookOpen, FaPhotoVideo, FaUserEdit } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoDocument } from "react-icons/io5";
import { SiReadthedocs } from "react-icons/si";
import { AiFillProduct } from "react-icons/ai";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useSession, signIn, signOut } from "next-auth/react";

interface SideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

// Configuración del menú para cada rol
const menuConfig: Record<
  "admin" | "user",
  {
    name: string;
    link?: string;
    onClick?: () => void;
    icon: React.JSX.Element;
  }[]
> = {
  admin: [
    { name: "Perfil", link: "/profile", icon: <PeopleIcon /> },
    { name: "Productos", link: "/productos", icon: <MenuBookRoundedIcon /> },
    { name: "Órdenes", link: "/dashboard/orders", icon: <AutoAwesomeMotionRoundedIcon /> },
    { name: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
    { name: "Secciones", link: "/dashboard/sections", icon: <FaBookOpen /> },
    { name: "Blogs", link: "/dashboard/blog", icon: <SiReadthedocs /> },
    { name: "Nuevo Blog", link: "/dashboard/blog/newBlog", icon: <IoDocument /> },
    { name: "Nueva sección", link: "/dashboard/newSection", icon: <FaBookmark /> },
    { name: "Galería de imágenes", link: "/dashboard/galleryImages", icon: <IoMdPhotos /> },
    { name: "Galería de videos", link: "/dashboard/galleryVideos", icon: <FaPhotoVideo /> },
    { name: "Transacciones", link: "/dashboard/transacciones", icon: <FaMoneyBillTransfer /> },
    { name: "Usuarios", link: "/dashboard/users", icon: <FaUserEdit /> },

  ],
  user: [
    // { name: "Perfil", link: "/profile", icon: <PeopleIcon /> },
    { name: "Productos", link: "/productos", icon: <AiFillProduct /> },
    { name: "Órdenes", link: "/orders", icon: <AutoAwesomeMotionRoundedIcon /> },
    { name: "Carro de compras", link: "/carro", icon: <LocalGroceryStoreRoundedIcon /> },
    { name: "Favoritos", link: "/favoritos", icon: <FavoriteRoundedIcon /> },
  ],
};

export const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer }) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const role = (session?.user?.role as "admin" | "user") || "user";

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Desactiva la redirección automática
    window.location.href = "/auth/login"; // Redirige manualmente
  };

  const handleLogin = async () => {
    await signIn();
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {isAuthenticated ? (
          // Si está autenticado, mostrar opciones según el rol
          <>
            {menuConfig[role].map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={item.link ? "a" : "button"}
                  href={item.link ? item.link : undefined}
                  onClick={item.onClick ? item.onClick : undefined}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItemButton>
          </>
        ) : (
          // Si no está autenticado, mostrar solo la opción de iniciar sesión
          <ListItemButton onClick={handleLogin}>
            <ListItemIcon>
              <LoginRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Ingresar" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} anchor="right" onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};
