
import { auth } from "@/auth"
import { db } from "@/lib/db"


export const getCurrentUser = async()=> {
    const session = await auth()

    if(!session?.user?.email){
        return null
    }

    try {
    
        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if(!currentUser){
            return  null    
    }

    return {
        ...currentUser,
         createdAt: currentUser.createdAt.toISOString(),
         updatedAt: currentUser.updatedAt.toISOString(),
         emailVerified: currentUser.emailVerified?.toISOString() || null
    }

    } catch (error: any) {
   return null
         
    }
}