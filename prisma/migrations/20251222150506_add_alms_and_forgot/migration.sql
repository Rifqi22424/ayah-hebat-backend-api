/*
  Warnings:

  - A unique constraint covering the columns `[forgotCode]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `forgotCode` VARCHAR(191) NULL,
    ADD COLUMN `forgotExpiredAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `alms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `allocationTypeCode` VARCHAR(191) NOT NULL,
    `evidenceImageUrl` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `profile_forgotCode_key` ON `profile`(`forgotCode`);

-- AddForeignKey
ALTER TABLE `alms` ADD CONSTRAINT `alms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
