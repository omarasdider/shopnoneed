import {  Listing, Reservation, User } from "@prisma/client";




export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'  > & {
  createdAt: string;
  startDate:string;
  endDate: string;
  listing: SageListing 
}

export type SageListing = Omit<Listing , "createdAt"> & {
  createdAt: string,

}



export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null
}