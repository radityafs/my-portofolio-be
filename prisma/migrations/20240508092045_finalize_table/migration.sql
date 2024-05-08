/*
  Warnings:

  - You are about to drop the column `type` on the `ProjectStack` table. All the data in the column will be lost.
  - You are about to drop the `ProjectType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Stack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_typeId_fkey`;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `type` ENUM('ANDROID', 'WEB', 'IOS', 'DESKTOP', 'IOT', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `ProjectStack` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `Stack` ADD COLUMN `type` ENUM('LANGUAGE', 'FRAMEWORK', 'DATABASE', 'PLATFORM', 'LIBRARY', 'OTHER') NOT NULL;

-- DropTable
DROP TABLE `ProjectType`;
