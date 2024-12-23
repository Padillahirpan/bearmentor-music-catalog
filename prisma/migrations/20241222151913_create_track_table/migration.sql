-- CreateTable
CREATE TABLE "tracks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "album_id" INTEGER NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
