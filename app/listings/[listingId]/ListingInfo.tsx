
'use client'
import { SafeUser } from "@/app/types";
import Avatar from "@/components/Avatar";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps{
    user: SafeUser | null;
    category: {
        icon: IconType,
        label: string
        description: string
    } | undefined;

    description: string;
    guestCount: number;
    bathroomCount: number;
    roomCount: number
}


const ListingInfo = ({user, category, description, guestCount, roomCount, bathroomCount, }:ListingInfoProps) => {
    return (  
        <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
        <div className="">Hosted by {user?.name} <br/> {user?.phone}</div> 
        <Avatar/>   
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div className="">
                {guestCount} guests
            </div>
            <div className="">{roomCount} room</div>
            <div className="">{bathroomCount} bathroom</div>
        </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
             icon = {category.icon}
             label = {category.label}
             description = {category.description}
            />
        )}

        <hr />

        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr />
        </div>
    );
}
 
export default ListingInfo;