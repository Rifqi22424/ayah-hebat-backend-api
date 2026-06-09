/*
  Warnings:

  - The primary key for the `Infaq` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Infaq` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `data` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `zoneId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
