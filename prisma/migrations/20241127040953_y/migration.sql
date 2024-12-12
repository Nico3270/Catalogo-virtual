-- CreateTable
CREATE TABLE "Articulo" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "imagenes" TEXT[],
    "parrafos" TEXT[],
    "subtitulos" TEXT[],
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autor" TEXT NOT NULL,

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticuloSection" (
    "id" TEXT NOT NULL,
    "articuloId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "ArticuloSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Articulo_slug_key" ON "Articulo"("slug");

-- AddForeignKey
ALTER TABLE "ArticuloSection" ADD CONSTRAINT "ArticuloSection_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticuloSection" ADD CONSTRAINT "ArticuloSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
