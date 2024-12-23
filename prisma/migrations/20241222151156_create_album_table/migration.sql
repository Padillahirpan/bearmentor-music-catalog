-- CreateTable
CREATE TABLE "albums" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "release_date" TIMESTAMP(3),
    "cover_art" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
