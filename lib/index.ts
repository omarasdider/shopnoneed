import * as z from "zod"

export const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(11).max(14),
    password: z.string().min(6)
})

export const LoginSchema = z.object({

email: z.string().email(),
password: z.string().min(1),
})