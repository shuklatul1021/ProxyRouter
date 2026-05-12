/*
  Warnings:

  - Added the required column `modelname` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelversion` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "modelname" TEXT NOT NULL,
ADD COLUMN     "modelversion" TEXT NOT NULL;
