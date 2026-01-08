/*
  Warnings:

  - You are about to alter the column `hasApproved` on the `user` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `hasApproved` VARCHAR(191) NULL;
