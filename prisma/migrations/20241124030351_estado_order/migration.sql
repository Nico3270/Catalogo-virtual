/*
  Warnings:

  - The `estado` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('RECIBIDA', 'ENTREGADA', 'PAGADA', 'CANCELADA', 'PREPARACION');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "estado",
ADD COLUMN     "estado" "OrderState" NOT NULL DEFAULT 'RECIBIDA';
