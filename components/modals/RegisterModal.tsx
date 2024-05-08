'use client'
import * as z from 'zod'
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from '@/lib';
import Modal from './Modal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import Heading from '../Heading';
import {FcGoogle} from 'react-icons/fc'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../input/error-message';
import SuccessMessage from '../input/success-message';
import {register } from '@/actions/register';
import { useCallback, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/hooks/useLoginModal';
import Button from '../Button';
import { AiFillGithub } from 'react-icons/ai';
const RegisterModal = () => {
   const[error ,setError]   =useState<string | undefined>("")
   const[success ,setSuccess]   =useState<string | undefined>("")
   const router = useRouter()
  const toggle = useCallback(()=> {
    registerModal.onClose()
    loginModal.onOpen()
  },[])

   const loginModal = useLoginModal()
    const [isPending , startTransition] = useTransition()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },

    })

    const onSubmit = (values: z.infer< typeof RegisterSchema>) => {
         startTransition(()=> {
            register(values)
            .then((data)=> {
                setError(data.error);
                setSuccess(data.success)
                 toggle()
            })
         })
    }

    const registerModal = useRegisterModal()
     
    const bodyContent = (
        <div className="flex flex-col gap-2">
         <Heading title='Welcome to Airbnb' subtitle='Crate an account'/>
         <Form {...form}>
            <form>
            <div className="flex flex-col gap-3">
               <FormField
               control={form.control}
                name='name'
                render={({ field}) => (
                    <FormItem>
                    <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder='Name'
                
                    /> 
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
               /> 
                <FormField
               control={form.control}
                name='email'
                render={({ field}) => (
                    <FormItem>
            
                    <FormControl>
                    <Input
                    {...field}
                    placeholder='Email'
                    type='email'
                     disabled={isPending}
                    /> 
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
               /> 
                <FormField
               control={form.control}
                name='password'
                render={({ field}) => (
                    <FormItem>
                    <FormControl>
                    <Input
                    {...field}
                    placeholder='password'
                    type='password'
                    disabled={isPending}
                    /> 
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
               /> 
                 <FormField
               control={form.control}
                name='phone'
                render={({ field}) => (
                    <FormItem>
                    <FormControl>
                    <Input
                    {...field}
                    placeholder='please contract number'
                     disabled={isPending}
                     type='number'
                    /> 
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
               /> 
            </div>
            <div className="mt-2">
            <ErrorMessage message={error}/>
            <SuccessMessage message={success}/>
            </div>
            </form>
         </Form>
        </div>
    )

    const footerContent = (
     <div className="flex flex-col gap-2 mt-3">
      <hr/>
      <Button 
      onClick={()=> {}}
      outline label='Continue with Google' icon={FcGoogle}
      />
   
       <div className="flex justify-center flex-row items-center gap-2">
            <div className=""></div>
            <div 
             onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline">
                Log in
            </div>
         </div>
     </div>
    )

    return (  
       <Modal
       isOpen={registerModal.isOpen}
       title='RegisterModal'
       actionLabel='Sign up'
       onClose={registerModal.onClose}
       onSubmit={form.handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
    );
}
 
export default RegisterModal;