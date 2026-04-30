/*
  Warnings:

  - You are about to drop the column `outputInput` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `outputToken` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "outputInput",
DROP COLUMN "outputToken";
