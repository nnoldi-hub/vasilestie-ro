-- DropForeignKey
ALTER TABLE "public"."blog_posts" DROP CONSTRAINT "blog_posts_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."blog_posts" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
