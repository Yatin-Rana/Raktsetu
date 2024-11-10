/*
  Warnings:

  - You are about to drop the column `campTime` on the `Camp` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Camp` table. All the data in the column will be lost.
  - You are about to drop the column `organizationName` on the `Camp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Camp` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Camp` table. All the data in the column will be lost.
  - Made the column `additionalInfo` on table `Camp` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Camp" DROP CONSTRAINT "Camp_userId_fkey";

-- AlterTable
ALTER TABLE "Camp" DROP COLUMN "campTime",
DROP COLUMN "email",
DROP COLUMN "organizationName",
DROP COLUMN "userId",
DROP COLUMN "userName",
ALTER COLUMN "additionalInfo" SET NOT NULL;
