/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `resetPasswordExpires` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_resetPasswordToken_key` ON `Profile`(`resetPasswordToken`);
