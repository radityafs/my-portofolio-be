/*
  Warnings:

  - You are about to drop the column `typeId` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Project_typeId_fkey` ON `Project`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `typeId`;
