'use client'

import { useEffect } from "react"
import EmptyState from "../components/EmptyState"

interface ErrorStateProps{
    error: Error
}

const ErrorState = ({error}:ErrorStateProps)=> {
    useEffect(()=> {
          console.error(error)
    },[error])
   
    return(
        <EmptyState
         title="Oh Oh oh"
         subtitle="Something went to wrong"
        />
    )


}

export default ErrorState