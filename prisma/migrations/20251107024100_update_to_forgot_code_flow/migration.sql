/*
  Warnings:

  - You are about to drop the column `resetPasswordExpires` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[forgotCode]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Profile_resetPasswordToken_key` ON `profile`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `resetPasswordExpires`,
    DROP COLUMN `resetPasswordToken`,
    ADD COLUMN `forgotCode` VARCHAR(191) NULL,
    ADD COLUMN `forgotExpiredAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_forgotCode_key` ON `Profile`(`forgotCode`);
