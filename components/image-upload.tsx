'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary'

interface ImageUploadProps{
    disabled?: boolean;
    onChang: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload:React.FC<ImageUploadProps> = ({
disabled,
onChang,
onRemove,
value

}) => {
    const [isMounted, setIsMounted]= useState(false)

    useEffect(()=> {
  setIsMounted(true);
    },[]);
    
const onUpload = (result: any) => {
    onChang(result.info.secure_url)
};
if(!isMounted){
    return null;
}
    return(
   <div>
    <div className="mb-4 flex items-center gap-4"> 
    {value.map((url)=> (
    <div key={url} className="relative w-[200px] h-[200px] rounded-sm overflow-hidden">
    <div className="z-10 absolute top-2 right-2">
    <Button type="button" onClick={()=> onRemove(url)} variant='destructive' size='sm'>
          <Trash className="h-4 w-4"/>
       </Button>
     </div>
     <Image 
     fill
     className="object-cover"
     alt="Image"
     src={url}
     />
    </div>
   ))}   
     </div>
     <CldUploadWidget onUpload={onUpload} uploadPreset="nzfxoopn">
           {({ open}) => {
            const onClick = () => {
                open();
            }
            return (
              <Button 
              type="button"
              disabled={disabled}
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

export default ImageUpload