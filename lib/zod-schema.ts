import { z } from 'zod'

export const registerSchema = z
   .object({
      name: z
         .string()
         .min(2, 'Name must be at least 2 characters long')
         .max(25, 'Name must be within 25 characters long'),
      email: z
         .string()
         .min(1, 'Email is required')
         .email('Invalid email address'),
      password: z
         .string()
         .min(6, 'Password must be at least 6 characters long')
         .regex(
            /^(?=.*[a-zA-Z])(?=.*[0-9])/,
            'Password must contain both letters and numbers'
         ),
      cPassword: z.string().min(1, 'Confirm Password is required'),
   })
   .refine((data) => data.password === data.cPassword, {
      message: "Passwords don't match",
      path: ['cPassword'], // path of error
   })
