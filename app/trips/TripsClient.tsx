
'use client'

import Container from "@/components/Container";
import { SafeReservation, SafeUser, SageListing } from "../types";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "../listings/[listingId]/ListingReservation";
import ReservationCard from "@/components/ReservationCard";
interface TripsClientProps{
    reservations: SafeReservation[] 
    currentUser?: SafeUser | null
}



const TripsClient = ({reservations, currentUser}:TripsClientProps) => {
     const router = useRouter()
     const [deletingId, setDeletingId] = useState('')
      const onCancel = useCallback((id:string) =>{
      setDeletingId(id)
      
      axios.delete(`/api/reservations/${id}`)
      .then(()=> {
        toast.success("reservation cancel")
      }) 
      .catch((error)=> {
        toast.success('Something went to wrong')
      })
      .finally(()=> {
        setDeletingId('')
      })
    },[router])
    return ( 
      <Container>
        <Heading
         title="Trips"
         subtitle="Where you've been and where you're going"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {reservations.map((reservation) => (
            <ReservationCard
             key={reservation.id}
             data={reservation.listing}
             reservation={reservation}
             actionId={reservation.id}
             onAction={onCancel}
             disabled={deletingId === reservation.id}
             actionLabel="Cancel Reservation"
             currentUser={currentUser}
            />
            ))}
        </div>
      </Container>
     );
}



 
export default TripsClient;