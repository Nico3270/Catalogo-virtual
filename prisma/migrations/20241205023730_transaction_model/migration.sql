-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ingreso', 'gasto');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('ventas', 'ahorro', 'otros', 'propinas', 'prestamos');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('implementos', 'materiales', 'arriendo', 'empleados', 'servicios_publicos', 'envios', 'deudas', 'mantenimiento', 'impuestos', 'otros');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('efectivo', 'nequi', 'daviplata', 'cuenta_principal', 'transferencias');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TransactionType" NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
