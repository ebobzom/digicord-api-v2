-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "SEX" NOT NULL,
    "location" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "country" TEXT,
    "address" TEXT,
    "profilePicURL" TEXT,
    "state" TEXT,
    "city" TEXT,
    "logoURL" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PATIENT',

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "SEX" NOT NULL,
    "location" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "IDNumber" TEXT NOT NULL,
    "country" TEXT,
    "address" TEXT,
    "profilePicURL" TEXT,
    "state" TEXT,
    "city" TEXT,
    "logoURL" TEXT,
    "role" "Role" NOT NULL DEFAULT 'DOCTOR',

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");
