-- CreateTable
CREATE TABLE "page" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "user_name" VARCHAR(200) NOT NULL,
    "user_job_position_name" VARCHAR(150),
    "user_description" VARCHAR(1000),
    "user_id" INTEGER NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "user_image_file_key" VARCHAR(200),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_date" TIMESTAMP(6),

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_slug_key" ON "page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_user_id_key" ON "page"("user_id");

-- CreateIndex
CREATE INDEX "page_slug_idx" ON "page"("slug");
