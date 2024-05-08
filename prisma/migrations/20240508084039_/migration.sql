/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProjectType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProjectType_name_key` ON `ProjectType`(`name`);
