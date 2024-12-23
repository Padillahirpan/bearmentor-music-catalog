-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);
