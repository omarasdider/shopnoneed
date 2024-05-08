import { getCurrentUser } from "@/app/data-query/getCurrentUser";
import { db } from "@/lib/db";


export default async function getFavorites(){

    try {
        const currentUser = await getCurrentUser()

         if(!currentUser){
            return []
         }

         const favorites = await db.listing.findMany({
            where:{
                id: {
                    in: [...currentUser.favoriteIds || []]
                }
            }
         })

         return favorites
    } catch (error: any) {
        throw new Error(error)
    }
}