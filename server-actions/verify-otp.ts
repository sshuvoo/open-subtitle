'use server'

import { dbConnect } from '@/lib/db-connect'
import { User } from '@/models/user'
import { User_Mongo } from '@/types/user'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'

export const verifyEmail = async (prevValue: any, fData: FormData) => {
   const formData = Object.fromEntries(fData)
   const { digit1, digit2, digit3, digit4, digit5 } = formData
   const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}`

   try {
      await dbConnect()
      const user: User_Mongo | null = await User.findOne({
         email: formData.email.toString(),
      }).lean()
      if (user) {
         const isValidCredential = await compare(
            formData.password.toString(),
            user.password
         )
         if (isValidCredential) {
            const expired = new Date(user.verification.expiredAt).getTime()
            if (expired > Date.now()) {
               if (user.verification.otp === otp) {
                  await User.findByIdAndUpdate(user._id, {
                     emailVerified: new Date().toISOString(),
                  })
               } else {
                  return { message: 'You entered an incorrect OTP' }
               }
            } else {
               return { message: 'OTP is expired! Request a new one' }
            }
         } else {
            return { message: 'Invalid Email or Password' }
         }
      } else {
         return { message: 'User not found' }
      }
   } catch (error) {
      return { message: 'Enternal server error' }
   }
   redirect('/login')
}
