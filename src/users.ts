interface User {
   id: number,
   name: string,
   email: string,
}


export let users: User[] = [
   {
      id: 1,
      name: "Dine In",
      email: "dinein@gmail.com"
   },
   {
      id: 2,
      name: "Mono Repo",
      email: "monorepo@gmail.com"
   },
   {
      id: 3,
      name: "Jaja Tiga",
      email: "jajatiga@gmail.com"
   }
]

export async function getUsers() {
   return users;
}

export async function getUserById(id: number) {
   console.log('this logogo: ', id)
   const userFound = users.find((usr) =>
      usr.id === id
   );

   console.log('this data found: ', userFound)
   return userFound;
}
