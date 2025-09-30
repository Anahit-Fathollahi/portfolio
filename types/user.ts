// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    website:string,
    userId:string,
}
