'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary'

interface NextInputProps{
    disabled?: boolean;
    onChang: (value: string) => void;
    onRemove?: (value: string) => void;
    value: string[];
}

const NextInput:React.FC<NextInputProps> = ({
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
     <Image 
     fill
     className="object-cover"
     alt="Image"
     src={url}
     />
    </div>
   ))}   
     </div>
     <CldUploadWidget onUpload={onUpload} uploadPreset="wgba1itq">
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

export default NextInput