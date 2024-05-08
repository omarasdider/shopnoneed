'use client'

import { SafeReservation, SafeUser, SageListing } from "@/app/types";
import Container from "@/components/Container";
import { Images, Reservation } from "@prisma/client";
import GalleyTab from "@/components/listingCard/GalleryTab";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import HeartButton from "@/components/HeartButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/components/navbar/Categores";
import Heading from "@/components/Heading";
import ListingInfo from "./ListingInfo";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/hooks/useLoginModal";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date (),
 key: 'selection'
};


interface listingClientProps {
    reservations?: SafeReservation[]
    listing: SageListing & {
        user: SafeUser 
        images: Images[]
    }
    currentUser: SafeUser | null
}


const ListingClient = ({reservations =[], currentUser, listing}:listingClientProps) => {

   const loginModal = useLoginModal()
   const router = useRouter()
   const disabledDates = useMemo(()=> {
    let dates: Date[] = [];
    reservations.forEach((reservation) =>{
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range]
    } )

    return dates


   },[reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreationReservation = useCallback(()=> {
     if(!currentUser){
      return loginModal.onOpen()
     }

     setIsLoading(true)

     axios.post('/api/reservations' ,{
      totalPrice,
      startDate: dateRange.endDate,
      endDate: dateRange.startDate,
      listingId: listing?.id
     })
     .then(()=> {
      toast.success("listing reserved")
      setDateRange(initialDateRange)
      /// Redirect to / trips
       router.refresh()

     })
    .catch(() => {
      toast.error("Something went to wrong")
    })
    .finally(()=> {
      setIsLoading(false)
    })
    },[totalPrice, dateRange, listing?.id, router, currentUser, loginModal])


    useEffect(()=> {
      if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(
          dateRange.endDate,
          dateRange.startDate
        );

        if(dayCount && listing.price){
          setTotalPrice(dayCount * listing.price)
        } else{
          setTotalPrice(listing.price)
        }
      }

      
    },[dateRange , listing.price])

  const category = useMemo(()=> {
    return categories.find((item) => item.label === listing.category)
  },[listing.category])
    return (  
      <Container>
        
<div className="max-screen-lg mx-auto">
<div className="flex flex-col gap-6">
  <Heading 
   title={listing.title}
   subtitle={category?.label}
  />
  <Carousel className="">
 <CarouselContent>
   {listing.images.map((imag, index) => (
     <CarouselItem key={index}>
      <div className="p-1">
     <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
      <Image
       alt="img"
       fill
       src={imag.url}
       className="object-cover w-full"
       />
       <div className="absolute top-5 right-5 z-20">
<HeartButton
  listingId={listing.id}
  currentUser={currentUser}

 /> 
</div>
   </div>
   </div>
   
  </CarouselItem>
))}
</CarouselContent>
<CarouselPrevious className="flex ml-[60px]" />
<CarouselNext className="flex mr-[60px]"/>
</Carousel>
<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
<ListingInfo
 user={listing.user}
 category={category}
 description ={listing.description}
 roomCount={listing.roomCount}
 bathroomCount={listing.bathroomCount}
 guestCount={listing.guestCount}
 />



 
 </div>
</div>

</div>


</Container> 
    );
}
 
export default ListingClient;