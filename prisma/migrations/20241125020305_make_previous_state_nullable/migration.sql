/*
  Warnings:

  - You are about to drop the column `changedAt` on the `OrderStatusHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderStatusHistory" DROP COLUMN "changedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "previousState" DROP NOT NULL;
