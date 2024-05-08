import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "../data-query/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "./propertiesClient";


const PropertiesPage = async() => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return(
            <EmptyState
             title="Unauthorized"
             subtitle="Please login"
            />

        )
    }
     const listings = await getListings({
        userId: currentUser.id
     })

     if(listings.length===0){
        return(
            <EmptyState
             title="No properties found"
             subtitle="Looks like you have reserved any trips"
            />
        )
     }
   return(
    <PropertiesClient
       listings = {listings}
       currentUser = {currentUser}
    />
   )
}
 
export default PropertiesPage;