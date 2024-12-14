export interface Artist {
   id: number,
   name: string,
   createdAt: string,
   updatedAt: string,
   bio: string,
   image: string,
}

export let artistsDummy: Artist[] = [
   {
      id: 1,
      name: "Lady Lala",
      bio: "I'm the number one",
      image: "",
      createdAt: "",
      updatedAt: "",
   },
   {
      id: 2,
      name: "One Republic",
      bio: "The greatest band",
      image: "",
      createdAt: "",
      updatedAt: "",
   },
]

export function getArtists() {
   return artistsDummy;
}

export function getArtistById(id: number) {
   const selectedArtist = artistsDummy.find((artist) => {
      return artist.id === id;
   });

   return selectedArtist;
}