/*
  Warnings:

  - Added the required column `usageContent` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "usageContent" TEXT NOT NULL;
