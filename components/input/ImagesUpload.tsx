'use client'


import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary'



interface ImagesUploadProps{
    onChang: (url: string) => void;
    value: string[];
}

const ImagesUpload:React.FC<ImagesUploadProps> = ({
onChang,
value

}) => {



    
const onUpload = (result: any) => {
    onChang(result.info.secure_url)
    
};

    return(
   <div>
    <div className="mb-4 flex items-center gap-4"> 
    {value.map((url)=> (
    <div key={url} className="relative w-[200px] h-[200px] rounded-sm overflow-hidden">
     <Image 
     fill
     className="object-cover"
     alt="Image"
     src={url} 
     />
    </div>
   ))}   
     </div>
     <CldUploadWidget onSuccess={onUpload} uploadPreset="wgba1itq"
    >
           {({ open}) => {
            const onClick = () => {
                open();
            }
            return (
              <Button 
              type="button"
              variant='secondary'
              onClick={onClick}
              >
                <ImagePlus className="h-4 w-4 mr-2 " />
                Upload an Image
              </Button>  
            )
           }}
     </CldUploadWidget>
    </div>
    )
}

export default ImagesUpload