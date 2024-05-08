
'use client'
import { Images, Listing } from "@prisma/client";
import { SafeUser, SageListing } from "../types";
import ListingCard from "@/components/listingCard/ListingCard";
import Container from "@/components/Container";
import ListingCardPro from "@/components/listingCard/ListingCardPro";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


interface PropertiesClientProps{
    listings: SageListing[] 
    currentUser?: SafeUser | null
}



const PropertiesClient = ({listings, currentUser}:PropertiesClientProps) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id: string)=> {
 setDeletingId(id)

 axios.delete(`/api/listings/${id}`)
 .then(()=> {
  toast.success('Reservation cancel')
  router.refresh()
 })
.catch(()=> {
  toast.error('something went wrong')
})
.finally(()=> {
  setDeletingId('')
})

  },[router])
    return ( 
        <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
         
       {listings.map((listing) => {
         return(
           <ListingCardPro
            key={listing.id}
            //@ts-ignore
            data={listing}
            actionId={listing.id}
            actionLabel="Delete properties"
            disabled={deletingId === listing.id}
          onAction={onCancel}
            currentUser={currentUser}
           />
         )
       })}
     
        </div>
     
        </Container>
   
     );
}
 
export default PropertiesClient;