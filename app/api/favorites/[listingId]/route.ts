import { getCurrentUser } from "@/app/data-query/getCurrentUser"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

interface IParams {
    listingId?: string
}


export async function POST(
    req:Request,
    {params} : {params : IParams}
){

const currentUse = await getCurrentUser()

if(!currentUse){
    return new NextResponse('Unauthorize', { status: 400 });
}

const {listingId} = params;
if(!listingId || typeof listingId !== 'string'){
return new NextResponse('Unauthorize', { status: 400 });
}

let favoriteIds = [...(currentUse.favoriteIds || [])];
  favoriteIds.push(listingId)

  const user = await db.user.update({
    where:{
        id:currentUse.id
    },
    data:{
        favoriteIds
    }

  })

  return NextResponse.json(user)
}



export async function DELETE(
    req: Request,
    {params} : {params: IParams}
){

 const currentUser = await getCurrentUser()

 if(!currentUser){
    return new NextResponse('Unauthorize', { status: 400 });
 }

 const {listingId} = params

 if(!listingId || typeof listingId !== 'string'){
    return new NextResponse('Unauthorize', { status: 400 });
 }

 let favoriteIds = [...(currentUser.favoriteIds || [])]

 favoriteIds = favoriteIds.filter((id) => id !== listingId)

const user = await db.user.update({
    where:{
        id: currentUser.id
    },
    data:{
        favoriteIds
    }
})

return NextResponse.json(user)
}