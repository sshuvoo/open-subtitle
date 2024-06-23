'use server'

import { dbConnect } from '@/lib/db-connect'
import { registerSchema } from '@/lib/zod-schema'
import { User } from '@/models/user'
import { getOTPTemplate } from '@/utils/email-template'
import { getOTP } from '@/utils/get-otp'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createTransport } from 'nodemailer'

export const registerUser = async (prevState: any, formData: FormData) => {
   const user = Object.fromEntries(formData)

   const validatedFields = registerSchema.safeParse(user)

   // Return early if the form data is invalid
   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }

   try {
      await dbConnect()
      const alreadyExist = await User.exists({ email: user.email })
      if (alreadyExist) {
         return { message: 'User already exist. Please Login' }
      } else {
         const hashPass = await hash(user.password.toString(), 10)
         const otp = getOTP()
         const verification = {
            otp,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
         }
         await User.create({ ...user, password: hashPass, verification })
         const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
               user: process.env.SMTP_USER,
               pass: process.env.SMTP_PASS,
            },
         })
         await transporter.sendMail({
            from: `"Open Subtitle" <${process.env.SMTP_USER}>`,
            to: user.email.toString(),
            subject: 'Open Subtitle - Verification',
            html: getOTPTemplate({ name: user.name.toString(), otp }),
         })
      }
   } catch (error) {
      console.log(error)
      return { message: 'Failed to register. Server Error' }
   }
   redirect(
      `/verify?email=${user.email.toString()}&password=${user.password.toString()}`
   )
}
