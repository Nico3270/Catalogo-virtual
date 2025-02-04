

// Información general de la aplicación
export const APP_Nombre = "Detalles, Sorpresas y Regalos";
export const App_Nombre1 = "Detalles";
export const App_Nombre2 = "Sorpresas y Regalos";
export const InfoEmpresa = {
  nombreCompleto: "Detalles, Sorpresas y Regalos",
  direccion: "Cra 17 # 8 -25, Tunja - Colombia",
  iframeGoogleMaps : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.394594074716!2d-73.37225322535299!3d5.508293434128291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7de1c1eac06f%3A0xcbfdc6875cf68173!2sCra.%209A%20%237-14%2C%20Tunja%2C%20Boyac%C3%A1!5e0!3m2!1sen!2sco!4v1732853148670!5m2!1sen!2sco",
  nombreCorto: {
    parte1: "Detalles",
    parte2: "Regalos"
  },
  telefono:"3182293083",
  email: "contacto@detallesysorpresas.com", 
  website: "https://detallesysorpresas.com",
  horarios: {lunes_viernes: "8:00 - 12:00 y de 2:00 - 6:00", sabados: "9:00 - 12:00 y de 2:00 - 5:00", domingos:" No atendemos"},
  nit: "900123456-7",
  urlInstagram: "/",
  urlFacebook: "/",
  urlTiktok: "https://tiktok.com",
  titulo:"Detalles & Sorpresas – Crea Detalles Especiales y Originales", //Importante para SEO con SEO
  descripcion: "Celebra con detalles únicos y regalos personalizados. Detalles & Sorpresas convierte cada fecha en algo especial. ¡Compra ahora!", // Entre 120 - 160 caracteres
  keywords: "regalos personalizados, detalles sorpresa, desayunos sorpresa, experiencias únicas, regalos creativos, regalos personalizados a domicilio, detalles para aniversarios, desayunos sorpresa para cumpleaños, entrega rápida de regalos, detalles especiales para San Valentín, obsequios personalizados para bodas, regalos express, detalles sorpresa para Navidad, regalos para fechas especiales, desayunos sorpresa a domicilio, detalles únicos y personalizados, sorpresas de última hora, regalos originales para aniversarios, compra de regalos personalizados, experiencias inolvidables con entrega rápida",
  imagenesPlaceholder: {
    imagenRepresentativa:"/imgs/logo.webp",
    imagenCarroVacio: "/imgs/logo.webp",
    logoEmpresa : "/imgs/logo.webp",
    noAutorizado: "/imgs/no_autorizado.webp",
    notfound: "/imgs/image_not_found.webp",
    domicilio: "/imgs/domicilio.webp",
    registerPage: "/imgs/register_image.webp",
    loginPage: "/imgs/login_image.webp",
    imagenTiendaContacto: "/imgs/tienda_contacto.webp",
    emptyCart : "/imgs/empty_cart.webp"
  },
  linkWebProduccion: "https://catalogo-virtual.vercel.app"
}

// Barra de navegación principal e inferior
export const TopMenuConfig = {
  EnlacesNavegacionTopMenu : [{ section: "Productos", ruta: "/productos" }, { section: "Galería", ruta: "/galeria" }, { section: "Servicios", ruta: "/servicios" }, { section: "Contacto", ruta: "/contacto" }],
  widthLogo : 80,
  heightLogo : 80,
  //Mobile
  width_height_logo_topMenuMobile : 50,
  height_height_logo_topMenuMobile : 50,
  enlacePrincipalInferior : { nombre: "Productos", ruta: "/", icono: "" },
  Color_Circulo_Numero_Iconos_Mobile : "bg-red-600 text-[#f2f2f2]"
}


//Data para secciónes de Privacidad, 
export const companyInfo = {
  nombre: "Detalles y Sorpresas",
  direccion: "Calle 45 #12-56, Tunja, Boyacá, Colombia",
  telefono: "+57 300 123 4567",
  email: "contacto@detallesysorpresas.com",
  website: "https://detallesysorpresas.com",
  nit: "900123456-7",
  politicaEnvio: "Realizamos envíos a todo el país con un tiempo de entrega de 3 a 7 días hábiles.",
  politicaDevolucion: "Puedes solicitar la devolución de productos en un plazo de 15 días hábiles.",
  garantia: "Ofrecemos garantía de 30 días en todos nuestros productos contra defectos de fábrica.",
  puntoDeVenta: "Punto físico y online",
  paisesOperacion: "Colombia, Ecuador, Argentina"
};


export const termsAndConditionsForm = {
  empresa: {
    nombreLegal: companyInfo.nombre,  // Ej: Detalles y Sorpresas S.A.S
    direccion: companyInfo.direccion,  // Ej: Calle 123, Bogotá, Colombia
    nit: companyInfo.nit,  // Ej: 901234567-8
    emailContacto: companyInfo.email,  // Ej: contacto@detallesysorpresas.com
    telefonoContacto: companyInfo.telefono,  // Ej: +57 300 123 4567
    puntoDeVenta: companyInfo.puntoDeVenta,  // Ej: Punto físico y ventas online
    paisesOperacion: companyInfo.paisesOperacion,  // Ej: Colombia, Ecuador
    website: companyInfo.website,
  },

  ambitoAplicacion: {
    tipoProductos: "Detalles, regalos para ocasiones especiales, desayunos personalizado, detalles florales, chocolates, regalos para hombre, mujer, niño, servicios personalizados",  // Ej: Desayunos sorpresa, regalos personalizados, flores
    productosDigitales: false,  // true / false
    restriccionesEdad: "para mayores de edad productos que contengan alcohol",  // Ej: +18 para productos con alcohol
  },

  comprasPagos: {
    metodosPago: "Nequi, Daviplata, Bancolombia, transferencias y pago ",  // Ej: Tarjetas de crédito/débito, transferencias, contra entrega
    plataformaPagos: "PayU",  // Ej: PayU, MercadoPago, Stripe
    compraSinCuenta: true,  // true / false
    notificacionCompra: "Correo electrónico y mediante la aplicación",  // Ej: Correo electrónico con factura adjunta
  },

  enviosEntregas: {
    tiempoEntrega: "1-2 días calendario, dependiendo del producto y lo acordado con el cliente",  // Ej: 3-5 días hábiles
    servicioMensajeria: "propio y mediantes el uso de diferentes empresas de mensajería",  // Ej: Propio y servicios como Servientrega
    costoEnvio: "Se acuerda con el cliente",  // Ej: Gratis para compras mayores a $100.000 COP
    ausenteEntrega: "reprogramación sin costo adicional",  // Ej: Reprogramación sin costo adicional
  },

  cancelacionesDevoluciones: {
    aceptaCancelaciones: true,  // true / false
    devolucionCondiciones: "Producto dañado, error en el envío",  // Ej: Producto dañado, error en el envío
    plazoDevolucion: "dependiendo del tipo de producto, ya que hay productos como comidas que deben ser devueltos inmediatamente, mientras que productos como ",  // Ej: 15 días hábiles
    costoDevolucion: "el cliente asume el costo del envío de devolución",  // Ej: El cliente asume el costo del envío de devolución
  },

  garantias: {
    garantiaProductos: true,  // true / false
    tiempoGarantia: "1 mes, para ropa, accesorios y zapatos",  // Ej: 6 meses
    coberturaGarantia: "Defectos de fábrica, daño durante el envío",  // Ej: Defectos de fábrica, daño durante el envío
    garantiasExcluidas: "Productos personalizados, y productos que contengan alimentos",  // Ej: Productos personalizados
  },

  responsabilidadCliente: {
    verificacionDatos: "El cliente debe verificar dirección y datos de contacto",  // Ej: El cliente debe verificar dirección y datos de contacto
    advertencias: "Flores pueden causar alergias en ciertas personas, los alimentos de los productos pueden ocasionar alergías",  // Ej: Flores pueden causar alergias en ciertas personas
  },

  propiedadIntelectual: {
    derechosAutor: true,  // true / false
    usoContenido: "prohibido copiar imágenes sin autorización",  // Ej: Prohibido copiar imágenes sin autorización
  },

  seguridadPrivacidad: {
    medidasSeguridad: "Certificado SSL, encriptación de datos",  // Ej: Certificado SSL, encriptación de datos
    datosRecopilados: "Nombre, dirección, teléfono, email",  // Ej: Nombre, dirección, teléfono, email
    usoDatos: "se utiliza solo para efectos de facturación, y entrega de productos",  // Ej: Envío de productos y promociones
    comparteDatos: false,  // true / false
  },

  modificacionesTerminos: {
    actualizacionesFrecuentes: "Cada 6 meses",  // Ej: Cada 6 meses
    notificacionCambios: "sin notificar, solo mediante nuestra aplicación web",  // Ej: Notificación vía email
  },

  extras: {
    programaLealtad: false,  // true / false
    maxProductosPorCliente: "sin límite y de acuerdo a disponibilidad",  // Ej: Máximo 5 productos por pedido
    suscripciones: false,  // true / false
  }
};


export const privacyPolicyForm = {
  empresa: {
    nombre: companyInfo.nombre,  // Nombre de la empresa
    emailContacto: companyInfo.email,  // Correo de contacto
    website: companyInfo.website,  // URL del sitio web
    direccion: companyInfo.direccion,  // Dirección de la empresa
    telefono: companyInfo.telefono,  // Teléfono de contacto
  },

  informacionRecopilada: {
    datosPersonales: "Nombre, correo electrónico, dirección, teléfono y datos de pago",  // Ej: Nombre, email, dirección
    datosNavegacion: "Dirección IP, navegador, y comportamiento de navegación",  // Ej: IP, navegador
    cookies: true,  // Indica si se usan cookies
    serviciosTerceros: "Google Analytics, Facebook Pixel",  // Servicios de terceros utilizados
  },

  usoInformacion: {
    propositos: "Procesar pedidos, enviar promociones, mejorar el servicio y personalizar la experiencia",  // Finalidad del uso de datos
    marketing: true,  // Si se usan para marketing
    mejorasProducto: true,  // Si se utilizan para mejorar productos o servicios
    publicidadTerceros: false,  // Si comparten con terceros
  },

  seguridad: {
    medidas: "Certificado SSL, cifrado de datos y acceso restringido",  // Ej: SSL, cifrado de datos
    almacenamiento: "Servidores seguros con acceso restringido",  // Dónde se almacenan los datos
    retencion: "Los datos se conservan por 5 años o hasta que el cliente solicite su eliminación",  // Tiempo de retención
  },

  derechosUsuario: {
    acceso: true,  // Si los usuarios pueden acceder a sus datos
    rectificacion: true,  // Si los usuarios pueden modificar sus datos
    eliminacion: true,  // Si los usuarios pueden solicitar eliminar sus datos
    portabilidad: false,  // Si se permite transferir los datos a otra empresa
  },

  cookies: {
    usoCookies: true,  // Indica si se usan cookies
    tipoCookies: "Cookies esenciales y de seguimiento de comportamiento",  // Tipo de cookies
    desactivacion: "Los usuarios pueden desactivar cookies desde la configuración del navegador",  // Opciones de desactivación
  },

  cambiosPolitica: {
    actualizaciones: "Cada 6 meses",  // Frecuencia de actualización
    notificacion: "Se notificará en el sitio web",  // Cómo se notifican los cambios
  },

  contacto: {
    canalContacto: "Puedes contactarnos a través de nuestro correo electrónico o por llamada directa",  // Forma de contacto
  }
};


export const shippingPolicyForm = {
  empresa: {
    nombre: companyInfo.nombre,  // Nombre de la empresa
    emailContacto: companyInfo.email,  // Correo de contacto
    website: companyInfo.website,  // URL del sitio web
    direccion: companyInfo.direccion,  // Dirección de la empresa
    telefono: companyInfo.telefono,  // Teléfono de contacto
  },

  ambitoEnvio: {
    paisesCobertura: "Colombia",  // Ej: Colombia, Ecuador, México
    regionesRestringidas: "Zonas rurales de difícil acceso",  // Ej: Regiones apartadas o peligrosas
    internacional: false,  // true / false - ¿Realizan envíos internacionales?
  },

  costosEnvio: {
    envioGratis: true,  // true / false - ¿Ofrecen envío gratuito?
    umbralEnvioGratis: "Compras superiores a $150.000 COP",  // Condición para envío gratis
    tarifaBase: "$5.000 COP",  // Tarifa estándar de envío
    costosAdicionales: "Áreas rurales o de difícil acceso",  // ¿Hay costos adicionales?
  },

  tiemposEntrega: {
    tiempoLocal: "1-2 días hábiles",  // Tiempo de entrega en la misma ciudad
    tiempoNacional: "3-5 días hábiles",  // Entrega a nivel nacional
    tiempoInternacional: "No aplica",  // Tiempo para envíos internacionales
    entregasUrgentes: true,  // true / false - ¿Ofrecen envíos express?
    tiempoUrgente: "En el mismo día",  // Tiempo de entrega para pedidos urgentes
  },

  mensajeria: {
    servicioPropio: true,  // true / false - ¿Cuentan con servicio de mensajería propio?
    empresasAliadas: "Servientrega, Interrapidisimo",  // Empresas de mensajería aliadas
  },

  seguimiento: {
    trackingEnvios: false,  // true / false - ¿Ofrecen seguimiento de envíos?
    plataformaTracking: "Tracking desde el sitio web",  // ¿Dónde se puede rastrear el pedido?
    actualizacionesEmail: false,  // true / false - ¿Se notifica por email?
  },

  politicaAusente: {
    reintentosEntrega: 1,  // ¿Cuántos intentos de entrega se realizan?
    reprogramacionGratis: true,  // true / false - ¿Se permite reprogramar sin costo?
    costoReenvio: "$5.000 COP",  // Costo en caso de reenvío
    devolucionFalloEntrega: true,  // ¿Se devuelve el producto si falla la entrega?
  },

  cancelaciones: {
    cancelacionAntesEnvio: true,  // true / false - ¿Se pueden cancelar pedidos antes del envío?
    cancelacionDuranteEnvio: false,  // true / false - ¿Se pueden cancelar durante el envío?
    penalidadCancelacion: "10% del valor del pedido",  // Penalidad si aplica
  },

  condicionesEspeciales: {
    productosFragiles: "Embalaje especial para productos de vidrio",  // Ej: Cristalería, porcelana
    restriccionesAlimentos: "No enviamos alimentos fuera de la ciudad",  // Restricciones de envío
    condicionesClimaticas: "Retrasos por condiciones climáticas extremas",  // Ej: Retrasos por clima
  },

  devoluciones: {
    aceptanDevoluciones: true,  // true / false
    plazoDevolucion: "5 días hábiles para entregas de productos que no contengan alimentos",  // Tiempo para devolver el producto
    condicionesDevolucion: "Producto dañado o incorrecto",  // Condiciones para aceptar devoluciones
    costoDevolucion: "Cubierto por la empresa",  // ¿Quién cubre los costos de devolución?
  },

  extras: {
    seguroEnvio: false,  // true / false - ¿Ofrecen seguro de envío?
    valorSeguro: "2% del valor del pedido",  // Valor del seguro de envío
    opcionRecogida: true,  // true / false - ¿Permiten recoger pedidos en tienda?
    horarioRecogida: "De lunes a sábado de 9 am a 6 pm",  // Horario de recogida
  },
};




export const privacyPolicyFormVacio = {
  empresa: {
    nombre: "Detalles, Sorpresas y Regalos",  // Nombre de la empresa
    emailContacto: "detallesregalos@gmail.com",  // Correo de contacto
    website: "https://detallesysorpresas.com",  // URL del sitio web
    direccion: "Carrera 17 #8-58, Tunja, Colombia",  // Dirección de la empresa
    telefono: "3152478596",  // Teléfono de contacto
  },

  informacionRecopilada: {
    datosPersonales: "Nombre, correo electrónico, dirección, teléfono y datos de pago",  // Ej: Nombre, email, dirección
    datosNavegacion: "Dirección IP, navegador, y comportamiento de navegación",  // Ej: IP, navegador
    cookies: true,  // Indica si se usan cookies
    serviciosTerceros: "Google Analytics, Facebook Pixel",  // Servicios de terceros utilizados
  },

  usoInformacion: {
    propositos: "Procesar pedidos, enviar promociones, mejorar el servicio y personalizar la experiencia",  // Finalidad del uso de datos
    marketing: true,  // Si se usan para marketing
    mejorasProducto: true,  // Si se utilizan para mejorar productos o servicios
    publicidadTerceros: false,  // Si comparten con terceros
  },

  seguridad: {
    medidas: "Certificado SSL, cifrado de datos y acceso restringido",  // Ej: SSL, cifrado de datos
    almacenamiento: "Servidores seguros con acceso restringido",  // Dónde se almacenan los datos
    retencion: "Los datos se conservan por 5 años o hasta que el cliente solicite su eliminación",  // Tiempo de retención
  },

  derechosUsuario: {
    acceso: true,  // Si los usuarios pueden acceder a sus datos
    rectificacion: true,  // Si los usuarios pueden modificar sus datos
    eliminacion: true,  // Si los usuarios pueden solicitar eliminar sus datos
    portabilidad: false,  // Si se permite transferir los datos a otra empresa
  },

  cookies: {
    usoCookies: true,  // Indica si se usan cookies
    tipoCookies: "Cookies esenciales y de seguimiento de comportamiento",  // Tipo de cookies
    desactivacion: "Los usuarios pueden desactivar cookies desde la configuración del navegador",  // Opciones de desactivación
  },

  cambiosPolitica: {
    actualizaciones: "Cada 6 meses",  // Frecuencia de actualización
    notificacion: "Se notificará por correo electrónico y en el sitio web",  // Cómo se notifican los cambios
  },

  contacto: {
    canalContacto: "Puedes contactarnos a través de nuestro correo electrónico o por llamada directa",  // Forma de contacto
  }
};



export const termsAndConditionsFormVacio = {
  empresa: {
    nombreLegal: "",  // Ej: Detalles y Sorpresas S.A.S
    direccion: "",  // Ej: Calle 123, Bogotá, Colombia
    nit: "",  // Ej: 901234567-8
    emailContacto: "",  // Ej: contacto@detallesysorpresas.com
    telefonoContacto: "",  // Ej: +57 300 123 4567
    puntoDeVenta: "",  // Ej: Punto físico y ventas online
    paisesOperacion: "",  // Ej: Colombia, Ecuador
  },

  ambitoAplicacion: {
    tipoProductos: "",  // Ej: Desayunos sorpresa, regalos personalizados, flores
    productosDigitales: false,  // true / false
    restriccionesEdad: "",  // Ej: +18 para productos con alcohol
  },

  comprasPagos: {
    metodosPago: "",  // Ej: Tarjetas de crédito/débito, transferencias, contra entrega
    plataformaPagos: "",  // Ej: PayU, MercadoPago, Stripe
    compraSinCuenta: false,  // true / false
    notificacionCompra: "",  // Ej: Correo electrónico con factura adjunta
  },

  enviosEntregas: {
    tiempoEntrega: "",  // Ej: 3-5 días hábiles
    servicioMensajeria: "",  // Ej: Propio y servicios como Servientrega
    costoEnvio: "",  // Ej: Gratis para compras mayores a $100.000 COP
    ausenteEntrega: "",  // Ej: Reprogramación sin costo adicional
  },

  cancelacionesDevoluciones: {
    aceptaCancelaciones: true,  // true / false
    devolucionCondiciones: "",  // Ej: Producto dañado, error en el envío
    plazoDevolucion: "",  // Ej: 15 días hábiles
    costoDevolucion: "",  // Ej: El cliente asume el costo del envío de devolución
  },

  garantias: {
    garantiaProductos: true,  // true / false
    tiempoGarantia: "",  // Ej: 6 meses
    coberturaGarantia: "",  // Ej: Defectos de fábrica, daño durante el envío
    garantiasExcluidas: "",  // Ej: Productos personalizados
  },

  responsabilidadCliente: {
    verificacionDatos: "",  // Ej: El cliente debe verificar dirección y datos de contacto
    advertencias: "",  // Ej: Flores pueden causar alergias en ciertas personas
  },

  propiedadIntelectual: {
    derechosAutor: true,  // true / false
    usoContenido: "",  // Ej: Prohibido copiar imágenes sin autorización
  },

  seguridadPrivacidad: {
    medidasSeguridad: "",  // Ej: Certificado SSL, encriptación de datos
    datosRecopilados: "",  // Ej: Nombre, dirección, teléfono, email
    usoDatos: "",  // Ej: Envío de productos y promociones
    comparteDatos: false,  // true / false
  },

  modificacionesTerminos: {
    actualizacionesFrecuentes: "",  // Ej: Cada 6 meses
    notificacionCambios: "",  // Ej: Notificación vía email
  },

  extras: {
    programaLealtad: false,  // true / false
    maxProductosPorCliente: "",  // Ej: Máximo 5 productos por pedido
    suscripciones: false,  // true / false
  }
};


// SideBar
