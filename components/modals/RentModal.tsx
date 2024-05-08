'use client'
import { useRentModal } from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categores";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, SubmitHandler, useFieldArray, useForm , } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import ImageSlider from "../input/ImageSlider";
import ImageUploadModal from "./ImageUploadModal";

import axios from 'axios'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NextInput from "../input/NextInput";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { number, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useImageUploadModal } from "@/hooks/useImageUploadModal";
import ImagesUpload from "../input/ImagesUpload";
import { register } from "module";
import { FcCustomerSupport } from "react-icons/fc";

import Description from "../input/Description";
import { Input } from "../ui/input";

  export type formValues = {
    category: string,
    location: null,
    guestCount: number,
    roomCount: number,
    bathroomCount: number,
    price: number,
    title: string,
    description: string,
    images: string[]
  }

const formSchema = z.object({
  images: z.object({url: z.string()}).array(),
  guestCount:  z.coerce.number().min(1),
  roomCount:  z.coerce.number().min(1),
  bathroomCount:  z.coerce.number().min(1),
  category:  z.string().optional(),
  location: z.string().nullable(),
  price:     z.number().min(1),
  title:  z.string().max(5),
  description: z.string().min(10)
})

type ListingFormValues = z.infer<typeof formSchema>;

enum STEPS {
  CATEGORY = 0,
  INFO =1,
  IMAGES=2,
  DESCRIPTION = 3,
  PRICE = 4, 
  
}
const RentModal = () => {
  const rentModal = useRentModal()
  const imageUploadModal = useImageUploadModal()
const [step , setStep] = useState(STEPS.CATEGORY)


const form = useForm<ListingFormValues
>({

  defaultValues: {
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    images:[],
    price: 1,
    title: '',
    description: '',
  
  
  }

})


 const {
  register,
  handleSubmit,
  setValue,
  watch,
  reset,
  formState
 } = form

 const {errors} = formState
 const [image, setImages] = useState([])

const category = watch("category");
const location = watch("location")
const guestCount = watch("guestCount")
const roomCount = watch("roomCount")
const bathroomCount = watch("bathroomCount")
 const images = watch(["images"])
const Map = useMemo(()=> dynamic(()=> import  ("../Map"),{
  ssr: false
}),[location])

const setCustomValue = (id:string & any | null, value: any  ) => {
  setValue(id, value ,  {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
   
  }) 
}



const [isLoading , setIsLoading] = useState(false)
const [isImage, setImage] = useState ([])
const router = useRouter()
const onBack = () => {
  setStep((value) => value -1)
}
const onNext = () => {
  setStep((value) => value +1)
}
const actionLabel = useMemo(() => {
  if(step === STEPS.PRICE){
    return "Create"
  }

  return 'Next'
},[step])

const secondaryActionLabel = useMemo(()=>{
  if(step === STEPS.CATEGORY){
    return undefined
  } 

  return 'Back'
},[step]) 



const onSubmit =(data: ListingFormValues ) => {
  if(step !== STEPS.PRICE){
    return onNext()

  }

  console.log(data)
  setIsLoading(true)
  axios.post('/api/listings', data)
  .then(()=> {
    toast.success("Listing Created")
    router.refresh()
    reset()
    setStep(STEPS.CATEGORY)
    rentModal.onClose()
  })
  .catch(()=> toast.error("Something went wrong"))
  .finally(()=> setIsLoading(false))
}


let bodyContent = (
  <div className="flex flex-col gap-8"> 
   <Heading
   title="Which of these best description your place"
   subtitle="Pick a category"
   />
 

   
   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
    {categories.map((item) => (
      <div key={item.label} className="col-span-1">
         <CategoryInput
          onClick={(category)=> setCustomValue('category' , category)}
          selected={category === item.label}
          label={item.label}
          icon={item.icon}
       />
      </div>
    ))}
   </div>
  </div>
  

)



   if(step === STEPS.INFO){
    bodyContent =(
      <div className="flex flex-col gap-8">
       <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have"
       />
       <Counter
       title=" Guests"
       subtitle="How many guests"
       value={guestCount}
       onChange={(value) => setCustomValue("guestCount", value)}
       />
       <Counter
       title=" Room"
       subtitle="How many Rooms"
       value={roomCount}
       onChange={(value) => setCustomValue("roomCount", value)}
       />
        <Counter
       title=" Bathroom"
       subtitle="How many bathroom"
       value={bathroomCount}
       onChange={(value) => setCustomValue("bathroomCount", value)}
       />
      </div>
      
    )
   }

   
   if(step === STEPS.IMAGES){
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
        title="Add a photo of your place"
        subtitle="Show guests what you look like"
        /> 
  <Form {...form}>
            <form>
            <div className=" flex flex-col gap-4 ">
                <FormField
               control={form.control}
                name='images'
                render={({ field}) => (
                    <FormItem>
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
        </form>
         </Form>

    </div>
    )
   }

    
   if(step === STEPS.DESCRIPTION){
      bodyContent = (
      
        <div className="flex flex-col gap-8">
        <Heading
         title="Describe your place"
         subtitle="Short and sweet works best"
        />

<Input
         id="title"
          title="Title"
          placeholder="title"
         {...register("title")
        
         }
         required
         />
         <Input
         id="description"
          title="description"
          placeholder="description"
         {...register("description")}
         />

        
      
        </div>
      )
    
   }

   if(step === STEPS.PRICE){
    bodyContent = (
      
      <div className="flex flex-col gap-8">
      <Heading
       title="Describe your place"
       subtitle="Short and sweet works best"
      />

        <Input
         id="price"
         type="number"
          title="price"
          placeholder="price"
          {...register("price")}
        />
     
      </div>
    )

 }
    return ( 
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={form.handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Airbnb your home" 
         body={bodyContent}
        />
     );

     
}
 
export default RentModal;



