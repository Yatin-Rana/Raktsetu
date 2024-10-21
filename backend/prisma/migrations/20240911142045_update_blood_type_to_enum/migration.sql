/*
  Warnings:

  - You are about to drop the column `bloodTypeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BloodType` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BloodTypeEnum" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bloodTypeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bloodTypeId",
ADD COLUMN     "bloodType" "BloodTypeEnum";

-- DropTable
DROP TABLE "BloodType";
