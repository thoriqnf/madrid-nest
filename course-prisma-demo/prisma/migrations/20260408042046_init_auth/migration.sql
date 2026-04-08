/*
  Warnings:

  - You are about to drop the column `author_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_author_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_course_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_course_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropIndex
DROP INDEX "enrollments_user_id_course_id_key";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "author_id",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "completed_at",
DROP COLUMN "course_id",
DROP COLUMN "user_id",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "course_id",
DROP COLUMN "created_at",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ALTER COLUMN "order" DROP DEFAULT;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatar_url",
DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "enrollments"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
