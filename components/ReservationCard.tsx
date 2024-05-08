'use client'

import { SafeReservation, SafeUser, SageListing } from "@/app/types";
import { Images, Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import {format} from 'date-fns'
;
import HeartButton from "@/components/HeartButton";

import Button from "@/components/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Avatar from "./Avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Logo from "./navbar/Logo";
import Heading from "./Heading";

interface ReservationCardProps{
  data: SageListing & {
    images: Images[]
  };

  reservation?: SafeReservation
  onAction?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null

}



const ReservationCard = ({data, reservation, disabled, onAction, actionLabel, actionId = "", currentUser,}:ReservationCardProps) => {


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
        <Logo/>
        <Heading
        //@ts-ignore
          title={reservation?.listing.category}
          subtitle={reservation?.listing.title}
        />


     
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
 
export default ReservationCard;