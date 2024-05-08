'use client'
import * as z from 'zod'
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from '@/lib';
import Modal from './Modal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import Heading from '../Heading';
import { FcGoogle } from 'react-icons/fc';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import ErrorMessage from '../input/error-message';
import SuccessMessage from '../input/success-message';
import { useCallback, useState, useTransition } from 'react';
import { useLoginModal } from '@/hooks/useLoginModal';
import { login } from '@/actions/login';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { AiFillGithub } from 'react-icons/ai';
import { Label } from '../ui/label';
const LoginModal = () => {
   const[error ,setError]   =useState<string | undefined>("")
   const[success ,setSuccess]   =useState<string | undefined>("")
    const router = useRouter()
    const [isPending , startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })
    
      const toggle = () => {
        loginModal.onClose()
        registerModal.onOpen()
      }
 
    const onSubmit = (values: z.infer< typeof LoginSchema>) => {
         startTransition(()=> {
            login(values)
            .then((data)=> {
                setError(data?.error);
                 setSuccess(data?.success)

                 if(data?.error) return
                 else{ loginModal.onClose()}
            })
         })
    }

    const registerModal = useRegisterModal()
    const loginModal     = useLoginModal()
     
    const bodyContent = (
        <div className="flex flex-col gap-2 ">
         <Heading title='Welcome Back' subtitle='Please Login'/>
         <Form {...form}>
            <form>
            <div className=" flex flex-col gap-4 ">
                <FormField
               control={form.control}
                name='email'
                render={({ field}) => (
                    <FormItem>
                   <Label> Email</Label>
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
                         <Label> Password</Label>
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
         outline label='Continue with Google' 
         icon={FcGoogle} 
         />
         <Button 
         onClick={()=> {}}
         outline label='Continue with Google' 
         icon={AiFillGithub} 
         />
 
    
         <div className="flex justify-center flex-row items-center gap-2">
            <div className=""></div>
            <div  
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline">
                Sign up
            </div>
         </div>
        </div>
       )

    return (  
       <Modal
       isOpen={loginModal.isOpen}
       title='RegisterModal'
       actionLabel='Login'
       onClose={loginModal.onClose}
       onSubmit={form.handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
       />
    );
}
 
export default LoginModal;