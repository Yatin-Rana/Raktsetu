-- CreateTable
CREATE TABLE "Camp" (
    "id" SERIAL NOT NULL,
    "organizerName" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "campDate" TIMESTAMP(3) NOT NULL,
    "campTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "expectedDonors" INTEGER NOT NULL,
    "additionalInfo" TEXT,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Camp" ADD CONSTRAINT "Camp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
