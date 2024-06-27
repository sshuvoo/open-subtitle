'use server'

import { dbConnect } from '@/lib/db-connect'
import { User } from '@/models/user'
import { User_Mongo } from '@/types/user'
import { getOTPTemplate } from '@/utils/email-template'
import { getOTP } from '@/utils/get-otp'
import { compare } from 'bcryptjs'
import { createTransport } from 'nodemailer'

export const requestNewOtp = async (prevState: any, formData: FormData) => {
   const userData = Object.fromEntries(formData)

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
            if (user?.emailVerified === userData.email.toString()) {
               return { message: 'User does not found' }
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
               if (info.messageId) {
                  return { message: 'OTP has been sent. Check your email' }
               }
            }
         } else {
            return { message: 'Invalid Email or Password' }
         }
      } else {
         return { message: 'User does not found' }
      }
   } catch (error) {
      return { message: 'Enternal Server Error' }
   }
}
