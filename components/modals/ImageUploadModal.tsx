'use client'
import * as z from 'zod'
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from './Modal';

import Heading from '../Heading';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useImageUploadModal } from '@/hooks/useImageUploadModal';
import ImageSlider from '../input/ImageSlider';
import { categories } from '../navbar/Categores';
import CategoryInput from '../input/CategoryInput';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const formSchema = z.object({
    images: z.object({url: z.string()}).array(),

  })

  type listingFormValues = z.infer<typeof formSchema>;
const ImageUploadModal = () => {
    const imageUploadModal = useImageUploadModal()
    const form = useForm<listingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            images: [],
          
        
        },

    })
    

    const [isLoading, setIsLoading] = useState(false)

     const router = useRouter()
     
   






    const onSubmit = (data: listingFormValues) => {
       console.log(data)
      setIsLoading(true)
      axios.post('/api/listings', data)
      .then(()=> {
        toast.success("Listing Created")
        router.refresh()
    
       
      })
      .catch(()=> toast.error("Something went wrong"))
      .finally(()=> setIsLoading(false))
    }

    

  

     
    const bodyContent = (
        <div className="flex flex-col gap-2 ">
         <Heading title='Welcome Back' subtitle='Please Login'/>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-4 ">
                <FormField
               control={form.control}
                name='images'
                render={({ field}) => (
                    <FormItem>
                   <Label> Email</Label>
                    <FormControl>
                    <ImageSlider
                     value={field.value.map((image)=> image.url)}
                     onChang={(url) => field.onChange([...field.value, {url}])}
                     onRemove={(url) => field.onChange([...field.value.filter((current)=> current.url !== url )])}
               />
                    </FormControl>
                
                    </FormItem>
                )}
               /> 
        </div> 
        <Button type='submit' className='w-full'>Submit</Button>      
        </form>
         </Form>
        </div>
    )
   


    return (  
       <Modal
       isOpen={imageUploadModal.isOpen}
       title='RegisterModal'
       actionLabel="Submit"
       onClose={imageUploadModal.onClose}
       onSubmit={form.handleSubmit(onSubmit)}
       body={bodyContent}
 
       />
    );
}
 
export default ImageUploadModal