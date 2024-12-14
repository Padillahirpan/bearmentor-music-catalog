import { Album } from "../albums/service";
import { Artist } from "../artists/service";

interface Track {
   id: number,
   title: string,
   createdAt: string,
   updatedAt: string,
   album: Album,
   artist: Artist,
}

export let tracksDummy: Track[] = [
   {
      id: 1,
      title: "Dine In",
      createdAt: "dinein@gmail.com",
      updatedAt: "",
      album: {
         id: 1,
         title: "Summer 245",
         releaseDate: "08 January 2020",
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
      title: "Dine Out",
      createdAt: "20 December 2021",
      updatedAt: "21 December 2021",
      album: {
         id: 1,
         title: "Summer 245",
         releaseDate: "08 January 2020",
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
      artist: {
         id: 1,
         name: "Lady Lala",
         bio: "I'm the number one",
         image: "",
         createdAt: "",
         updatedAt: ""
      }
   },
];

export async function getTracks() {
   return tracksDummy;
}

export async function getTrackById(id: number) {
   const selectedTrack = tracksDummy.find((track) => {
      return track.id === id;
   });

   return selectedTrack;
}

export async function addNewTrack(track: Track) {

}

export async function updateNewTrack({ id, ...tracks }: Track) {
   const index = tracksDummy.findIndex((track) => {
      return track.id === id
   });

   const doto = {...tracksDummy[index]};

   console.log("this is data upate pertama: ",doto)

   tracksDummy[index] = { ...tracksDummy[index], ...tracks}

   return tracksDummy;
}
