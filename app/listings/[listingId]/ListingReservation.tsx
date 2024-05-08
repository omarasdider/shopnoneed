'use client'


import { Range } from "react-date-range";
import Calender from "./Calendar";
import Button from "@/components/Button";
interface ListingReservationProps{
      price: number;
     dateRange: Range;
     totalPrice: number;
     onChangeDate: (value: Range) => void;
     onSubmit: ()=> void;
     disabled?: boolean
     disabledDates: Date[]
}

const ListingReservation = ({price, dateRange, totalPrice, onChangeDate, onSubmit, disabledDates, disabled}:ListingReservationProps) => {
    return (  
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 ">
       <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
            ${price}
        </div>
        <div className="font-light text-neutral-600">night
       </div>
       </div>

       <hr />

       <Calender
         value ={dateRange}
         disabledDates={disabledDates}
         onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4">
            <Button
              disabled={disabled}
              label="Reserved"
              onClick={onSubmit}
            />
        </div>

         <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <div className=""> Total</div>
            <div className="">${totalPrice}</div>
         </div>
        </div>
    );
}
 
export default ListingReservation;