import { Artist } from "../artists/service";

export interface Album {
   id: number,
   title: string,
   releaseDate: string,
   coverArt: string,
   createdAt: string,
   updatedAt: string,
   artist: Artist,
}

export let albumsDummy: Album[] = [
   {
      id: 1,
      title: "Summer 245",
      releaseDate: "08 January 2001",
      coverArt: "",
      createdAt: "08 January 2024",
      updatedAt: "10 January 2024",
      artist: {
         id: 1,
         name: "Lady Lala",
         bio: "I'm the number one",
         image: "",
         createdAt: "",
         updatedAt: ""
      }
   },
   {
      id: 2,
      title: "One for all",
      coverArt: "",
      releaseDate: "",
      createdAt: "",
      updatedAt: "",
      artist: {
         id: 1,
         name: "Lady Lala",
         bio: "I'm the number one",
         image: "",
         createdAt: "",
         updatedAt: ""
      }
   },
]

export function getAlbums() {
   return albumsDummy;
}

export function getAlbumById(id: number) {
   const selectedAlbum = albumsDummy.find((album) => {
      return album.id === id;
   });

   return selectedAlbum;
}