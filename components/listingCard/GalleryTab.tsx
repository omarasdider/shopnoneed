
import { Images } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

interface GalleryTabProps{
    image: Images[]
}


const GalleyTab = ({image}:GalleryTabProps) => {
    return (  

        <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {image.map((imag, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
             <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
             <Image
                 alt="img"
                 fill
                 src={imag.url[0]}
                 className="h-full w-full object-cover object-cover-center"
                 />

             </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    );
}
 
export default GalleyTab;