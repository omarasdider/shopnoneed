
'use client'
import { SafeUser } from "@/app/types";
import useFavorite from "@/hooks/useFavorites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps{
 listingId: string
 currentUser?: SafeUser | null
}

const HeartButton = ({listingId, currentUser}:HeartButtonProps) => {
    const {hasFavorited, toggleFavorite} = useFavorite({
      listingId, currentUser
    })

    
    return (  
        <div  onClick={toggleFavorite} className="
        relative hover:opacity-80 transition cursor-pointer
        ">
        <AiOutlineHeart
          size={32}
          className=" fill-white absolute -top-[2px] -right-[2px]"
        />
          <AiFillHeart
          size={26}
          className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-700/70' }
        />
        </div>
    );
}
 
export default HeartButton;