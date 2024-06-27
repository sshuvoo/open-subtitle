import { Schema } from 'mongoose'

export type Review_T = {
   user_id: string | Schema.Types.ObjectId
   sub_id: string | Schema.Types.ObjectId
   imdb_id: string
   review: string
   rating: number
}

export type Review_Mongo = {
   _id: Schema.Types.ObjectId
   imdb_id: string
   user_id: {
      _id: Schema.Types.ObjectId
      name: string
   }
   sub_id: Schema.Types.ObjectId
   review: string
   rating: number
   createdAt: Date
   updatedAt: Date
}

export type Review_M = {
   _id: Schema.Types.ObjectId
   imdb_id: string
   user_id: Schema.Types.ObjectId
   sub_id: Schema.Types.ObjectId
   review: string
   rating: number
   createdAt: Date
   updatedAt: Date
}
