import getListingById from "@/actions/getListingId";
import EmptyState from "@/components/EmptyState";
import GalleyTab from "@/components/listingCard/GalleryTab";
import Image from "next/image";
import Container from "@/components/Container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import { getCurrentUser } from "@/app/data-query/getCurrentUser";
import ListingInfo from "./ListingInfo";
import ListingClient from "./listingClient";
import getReservation from "@/actions/getReservation";
  
  interface IParams{
    listingId?: string
  }


  const ListingPage = async ({params} : {params:IParams}) => {
       const listing = await getListingById(params)
       const reservations = await getReservation(params)
        const currentUser = await getCurrentUser()
          if(!listing){
            return (
                <EmptyState/>
            )
          }
    return (
      
      <ListingClient
        listing ={ listing}
        reservations={reservations}
        currentUser = {currentUser}
      />
      );
}
 
export default ListingPage;





{/* <Container>
<Heading
 title={listing.title}
  subtitle={listing.category}
/>
<div className="max-screen-lg mx-auto">
<div className="flex flex-col gap-6">
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


<div className="grid grid-cols-1 md:grid-cols-md:gap-10 mt-6">
<ListingInfo
user={listing.user}
roomCount{listing.roomCount}

/>
</div>
</div>
</div>


</Container> */}