-- CreateTable
CREATE TABLE "playlisttracks" (
    "playlistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlisttracks_pkey" PRIMARY KEY ("playlistId","trackId")
);

-- AddForeignKey
ALTER TABLE "playlisttracks" ADD CONSTRAINT "playlisttracks_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlisttracks" ADD CONSTRAINT "playlisttracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
