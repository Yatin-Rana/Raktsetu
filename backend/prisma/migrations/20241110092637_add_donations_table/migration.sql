/*
  Warnings:

  - You are about to drop the column `notes` on the `Donation` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donationType` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `Donation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "notes",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "campaign" TEXT,
ADD COLUMN     "donationType" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Donation_userId_idx" ON "Donation"("userId");
