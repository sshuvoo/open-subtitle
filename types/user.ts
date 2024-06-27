import { Schema } from 'mongoose'

export type User_T = {
   name: string
   email: string
   password: string
   emailVerified?: Date
   verification: {
      otp: string
      expiredAt: Date
   }
}

export type User_Mongo = {
   _id: Schema.Types.ObjectId
   name: string
   email: string
   password: string
   verification: {
      otp: string
      expiredAt: Date
   }
   emailVerified?: string | null
   createdAt: Date
   updatedAt: Date
}
