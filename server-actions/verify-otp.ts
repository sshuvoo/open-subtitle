'use server'

import { dbConnect } from '@/lib/db-connect'
import { User } from '@/models/user'
import { User_Mongo } from '@/types/user'
import { compare } from 'bcryptjs'

interface Props {
   otp: string
   email: string
   password: string
}

export const verifyEmail = async ({ otp, email, password }: Props) => {
   try {
      await dbConnect()
      const user: User_Mongo | null = await User.findOne({ email }).lean()
      if (user) {
         const isValidCredential = await compare(password, user.password)
         if (isValidCredential) {
            const expired = new Date(user.verification.expiredAt).getTime()
            if (expired > Date.now()) {
               if (user.verification.otp === otp) {
                  await User.findByIdAndUpdate(user._id, {
                     emailVerified: email,
                  })
               } else {
                  console.log('Otp does not match')
               }
            } else {
               console.log('Expired')
            }
         } else {
            console.log('Invalid Credential')
         }
      } else {
         console.log('User not found')
      }
   } catch (error) {}
}
