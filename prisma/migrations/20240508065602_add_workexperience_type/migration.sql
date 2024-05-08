/*
  Warnings:

  - Added the required column `type` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WorkExperience` ADD COLUMN `type` ENUM('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'CONTRACT') NOT NULL;
