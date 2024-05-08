
import { db } from "@/lib/db";

export interface IListingParams{
  userId?: string
  category?:string
}

  export default async function getListings(params:IListingParams){
  
    try {
        const {userId , category} = params      
         let query: any = {};

         if(userId){
          query.userId = userId
         }

         if(category){
          query.category = category
         }
        const listings = await db.listing.findMany({      
            where: query,
          orderBy:{
            createdAt: 'desc'
          },
          include:{
            images: true
          },
        })
        const safeListings = listings.map((listing)=> ({
          ...listing,
          createdAt: listing.createdAt.toISOString(),
      
         }
          
         ))
         return  safeListings
    } catch (error: any) {
        throw new Error
    }

  }