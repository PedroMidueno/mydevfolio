-- CreateTable
CREATE TABLE "page" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "user_first_name" VARCHAR(200) NOT NULL,
    "user_last_name" VARCHAR(200) NOT NULL,
    "user_job_position_name" VARCHAR(150),
    "user_description" VARCHAR(1000),
    "user_id" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "user_image_resource_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_date" TIMESTAMP(6),

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_meta_data" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "favicon_resource_id" INTEGER,
    "description" VARCHAR(200),
    "og_title" VARCHAR(200),
    "og_description" VARCHAR(200),
    "og_image_resource_id" INTEGER,
    "og_url" VARCHAR(200),
    "twitter_title" VARCHAR(200),
    "twitter_description" VARCHAR(200),
    "twitter_image_resource_id" INTEGER,
    "twitter_card" VARCHAR(200),

    CONSTRAINT "page_meta_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_skill_cat" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "logo" VARCHAR(200) NOT NULL,

    CONSTRAINT "tech_skill_cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_skills_on_pages" (
    "page_id" INTEGER NOT NULL,
    "tech_skill_key" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "resource" (
    "id" SERIAL NOT NULL,
    "file_key" VARCHAR(200) NOT NULL,
    "original_name" VARCHAR(200) NOT NULL,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_contact" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "resume_file_resource_id" INTEGER,
    "github_user" VARCHAR(50),
    "linkedin_user" VARCHAR(50),
    "twitter_user" VARCHAR(50),
    "page_id" INTEGER NOT NULL,

    CONSTRAINT "user_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_experience" (
    "id" SERIAL NOT NULL,
    "job_title" VARCHAR(150) NOT NULL,
    "company" VARCHAR(150) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current_job" BOOLEAN NOT NULL DEFAULT false,
    "job_description" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "user_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_resource_id" INTEGER,
    "description" TEXT NOT NULL,
    "repositoryUrl" TEXT,
    "deployUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_skills_on_projects" (
    "teck_skill_key" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_education" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "school" VARCHAR(150) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current_school" BOOLEAN NOT NULL DEFAULT false,
    "page_id" INTEGER NOT NULL,

    CONSTRAINT "user_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCertification" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "certificate_issuer" VARCHAR(150) NOT NULL,
    "issued_date" DATE NOT NULL,
    "certificate_url" VARCHAR(300) NOT NULL,
    "page_id" INTEGER NOT NULL,

    CONSTRAINT "UserCertification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_slug_key" ON "page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_user_id_key" ON "page"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "page_user_image_resource_id_key" ON "page"("user_image_resource_id");

-- CreateIndex
CREATE INDEX "page_slug_idx" ON "page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_meta_data_favicon_resource_id_key" ON "page_meta_data"("favicon_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "page_meta_data_og_image_resource_id_key" ON "page_meta_data"("og_image_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "page_meta_data_twitter_image_resource_id_key" ON "page_meta_data"("twitter_image_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_skill_cat_key_key" ON "tech_skill_cat"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tech_skills_on_pages_page_id_tech_skill_key_key" ON "tech_skills_on_pages"("page_id", "tech_skill_key");

-- CreateIndex
CREATE UNIQUE INDEX "user_contact_resume_file_resource_id_key" ON "user_contact"("resume_file_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_image_resource_id_key" ON "project"("image_resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_skills_on_projects_teck_skill_key_project_id_key" ON "tech_skills_on_projects"("teck_skill_key", "project_id");

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_user_image_resource_id_fkey" FOREIGN KEY ("user_image_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_meta_data" ADD CONSTRAINT "page_meta_data_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_meta_data" ADD CONSTRAINT "page_meta_data_favicon_resource_id_fkey" FOREIGN KEY ("favicon_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_meta_data" ADD CONSTRAINT "page_meta_data_og_image_resource_id_fkey" FOREIGN KEY ("og_image_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_meta_data" ADD CONSTRAINT "page_meta_data_twitter_image_resource_id_fkey" FOREIGN KEY ("twitter_image_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_skills_on_pages" ADD CONSTRAINT "tech_skills_on_pages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_skills_on_pages" ADD CONSTRAINT "tech_skills_on_pages_tech_skill_key_fkey" FOREIGN KEY ("tech_skill_key") REFERENCES "tech_skill_cat"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contact" ADD CONSTRAINT "user_contact_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contact" ADD CONSTRAINT "user_contact_resume_file_resource_id_fkey" FOREIGN KEY ("resume_file_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_experience" ADD CONSTRAINT "user_experience_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_image_resource_id_fkey" FOREIGN KEY ("image_resource_id") REFERENCES "resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_skills_on_projects" ADD CONSTRAINT "tech_skills_on_projects_teck_skill_key_fkey" FOREIGN KEY ("teck_skill_key") REFERENCES "tech_skill_cat"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_skills_on_projects" ADD CONSTRAINT "tech_skills_on_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_education" ADD CONSTRAINT "user_education_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCertification" ADD CONSTRAINT "UserCertification_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
