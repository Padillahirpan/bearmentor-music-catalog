-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_album_id_fkey";

-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "artist_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tracks" ALTER COLUMN "album_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;
