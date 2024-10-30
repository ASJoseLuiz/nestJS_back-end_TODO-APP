/*
  Warnings:

  - The values [PROCESS] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `date_to_finish` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('DONE', 'INITIALIZED', 'PENDING');
ALTER TABLE "task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "date_to_finish" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
