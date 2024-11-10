/*
  Warnings:

  - You are about to drop the column `bloodBankId` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the `BloodBank` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_bloodBankId_fkey";

-- DropIndex
DROP INDEX "Hospital_bloodBankId_key";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "bloodBankId";

-- DropTable
DROP TABLE "BloodBank";
