import { Images } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import ListingHead from "./ListingHead";

interface GalleryProps{
    images: Images[]
}

const Gallery = ({images}:GalleryProps) => {
    return ( 

  
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
       {
        images.map((image) => (
          <ListingHead key={image.id} image={image}/>
        ))
       }
      </div>


     );
}
 
export default Gallery;



//*{


{/* <Image
alt="listing"
fill
src={data?.images?.[0]?.url}
className="object-cover h-full w-full group-hover:scale-110 transition"
/>
</div>
//}* */}





