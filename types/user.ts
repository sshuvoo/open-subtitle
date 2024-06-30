import { Schema } from 'mongoose'

export type User_T = {
   name: string
   email: string
   password: string
   watch_list?: Schema.Types.ObjectId[]
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
   watch_list?: Schema.Types.ObjectId[]
   verification: {
      otp: string
      expiredAt: Date
   }
   emailVerified?: Date | null
   createdAt: Date
   updatedAt: Date
}

export type WatchList = {
   _id: Schema.Types.ObjectId
   title_long: string
   imdb_code: string
}

export type User_Populate = {
   _id: Schema.Types.ObjectId
   name: string
   email: string
   password: string
   watch_list?: WatchList[]
   verification: {
      otp: string
      expiredAt: Date
   }
   emailVerified?: Date | null
   createdAt: Date
   updatedAt: Date
}
