/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Stack` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Stack_name_key` ON `Stack`(`name`);
