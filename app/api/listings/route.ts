import { getCurrentUser } from "@/app/data-query/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function POST(
    req:Request
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }
    const body = await req.json();

    const {
        title,
        description,
        images,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price

    } = body;


                                  

     const listing = await db.listing.create({
        data: {
            title,
            description,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            price: parseInt(price, 10),
            userId: currentUser.id,
             images: {
                createMany: {
                  data: [
                    ...images.map((image: {url:string})=> image)
                  ]
                }
              }
            
        }
     })
  return NextResponse.json(listing)
}