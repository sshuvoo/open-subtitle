'use server'

import { dbConnect } from '@/lib/db-connect'
import { loginSchema } from '@/lib/zod-schema'
import { User } from '@/models/user'
import { User_Mongo } from '@/types/user'
import { getOTPTemplate } from '@/utils/email-template'
import { getOTP } from '@/utils/get-otp'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createTransport } from 'nodemailer'
import { loginWithCredential } from './login-with-credential'

export const loginUser = async (prevState: any, formData: FormData) => {
   const userData = Object.fromEntries(formData)

   const validatedFields = loginSchema.safeParse(userData)

   // Return early if the form data is invalid
   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }

   let info

   try {
      await dbConnect()
      const user: User_Mongo | null = await User.findOne({
         email: userData.email.toString(),
      }).lean()
      if (user) {
         const isValidPass = await compare(
            userData.password.toString(),
            user.password
         )
         if (isValidPass) {
            if (user?.emailVerified) {
               await loginWithCredential({
                  email: userData.email.toString(),
                  password: userData.password.toString(),
               })
            } else {
               const otp = getOTP()
               const verification = {
                  otp,
                  expiredAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
               }
               await User.findByIdAndUpdate(user._id, { verification })
               const transporter = createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  auth: {
                     user: process.env.SMTP_USER,
                     pass: process.env.SMTP_PASS,
                  },
               })
               info = await transporter.sendMail({
                  from: `"Open Subtitle" <${process.env.SMTP_USER}>`,
                  to: user.email.toString(),
                  subject: 'Open Subtitle - Verification',
                  html: getOTPTemplate({ name: user.name.toString(), otp }),
               })
            }
         } else {
            return { message: 'Invalid Email or Password' }
         }
      } else {
         return { message: 'User does not found' }
      }
   } catch (error) {
      console.log(error)
      return { message: 'Failed to sign in. Server Error' }
   }
   if (info?.messageId) {
      redirect(
         `/verify?email=${userData.email.toString()}&password=${userData.password.toString()}`
      )
   } else {
      redirect(`/`)
   }
}
