'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { formValues } from "../modals/RentModal";

interface PriceProps{
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatePrice?: boolean;
    required?: boolean;
    register: UseFormRegister<formValues>
    errors: FieldErrors
}

const Price = ({id, label, type = "number", disabled, formatePrice, register, required, errors}:PriceProps) => {
    return (
        <div className="
        w-full relative
        ">
        {
            formatePrice && (
                <BiDollar
                size={24}
                className=" text-neutral-700 absolute top-5 left-2"
                />

            )
        } 

        <input 
        id={id}
         disabled={disabled}
         {...register("price" , {required})}
   
         
         placeholder=""
         type={type}
        className={
            ` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none
             transition disabled:opacity-70 disabled:cursor-not-allowed
             ${formatePrice ? 'pl-9 ': 'pl-4'}
              ${errors[id]} ? border-rose-500 : 'border-neutral-300'}
              ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}/>   
       
          <label className={`absolute text-md duration-150 transform -translate-y-3
           top-5
           z-10
           origin-[0]
          ${formatePrice ? 'left-9' : 'left-4'}
          peer-placeholder-shadow:scale-100
          peer-focus:scale-200 peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `
          }> {label}</label>
        </div>
      );
}
 
export default Price;