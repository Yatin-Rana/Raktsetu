/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hospital` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Hospital_email_key";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
