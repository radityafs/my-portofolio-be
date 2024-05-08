-- DropForeignKey
ALTER TABLE `ProjectImage` DROP FOREIGN KEY `ProjectImage_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectStack` DROP FOREIGN KEY `ProjectStack_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectStack` DROP FOREIGN KEY `ProjectStack_stackId_fkey`;

-- AddForeignKey
ALTER TABLE `ProjectStack` ADD CONSTRAINT `ProjectStack_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectStack` ADD CONSTRAINT `ProjectStack_stackId_fkey` FOREIGN KEY (`stackId`) REFERENCES `Stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectImage` ADD CONSTRAINT `ProjectImage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
