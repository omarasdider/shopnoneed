import {  Images, Listing, User } from "@prisma/client";



export type SageListing = Omit<Listing , "createdAt" | "images"> & {
  createdAt: string
  images: ImageString
}



export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null
}

export type ImageString = Omit<
Images,
"createdAt" | "updatedAt" 
> & {
  createdAt: string;
  updatedAt: string;
}