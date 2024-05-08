'use client'

import { SafeUser, SageListing } from "@/app/types";
import { Images, Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import {format} from 'date-fns'
import Gallery from "./Gallery";
import HeartButton from "../HeartButton";
import ImageSwiper from "./ImageSwiper";
import Button from "../Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ListingCardProps{
  data: Listing & {
    images: Images[]
  };

  reservation?: Reservation;
  onAction?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null

}



const ListingCard = ({data, reservation, disabled, onAction, actionLabel, actionId = "", currentUser,}:ListingCardProps) => {

    const router = useRouter()
   const [isVisible, seIstVisible] = useState<boolean>(false)

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()
     if(disabled){
        return;
     }
     
     onAction?.(actionId)

    },[onAction , actionId, disabled])
  
   const price = useMemo(()=> {
    if(reservation){
        return reservation.totalPrice
    }
    return data.price
   },[reservation, data.price])

  const reservationDate = useMemo(()=> {
    if(!reservation){
        return null
    }

    const start = new Date(reservation.startDate)
    const end   = new Date(reservation.endDate)

  return `${format(start, 'PP',)} - ${format(end, 'PP')}`
  },[reservation])

    return (  
      <div
      className="
    col-span-1 
    cursor-pointer
    group
    "
     >
      <div className="
       flex
       flex-col
       gap-2 
       w-full
      
       "
       >
        
        <div 

        className="aspect-square w-full overflow-hidden rounded-xl relative">
    
       <Link href={`/listings/${data.id}`} >
       <ImageSwiper 
       
       images={data.images}  />
       </Link>
       <div className="absolute top-3 right-3  z-10 ">
        <HeartButton
         listingId = {data.id}
         currentUser={currentUser}
        />
       </div>
       </div>
         <div className="font-light text-lg flex flex-row items-center gap-x-1">
          {reservationDate || data.category}
    
          </div>
         <div className=" flex flex-row items-center gap-x-1">
          <div className="font-semibold ">
            ${price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
      
         </div>
         {onAction && actionLabel && (
          <Button
           disabled={disabled}
           small
           label={actionLabel}
           onClick={handleCancel}
          />
         )}
       </div>

       </div>
   
    );
}
 
export default ListingCard;