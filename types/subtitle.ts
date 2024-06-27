import { Schema } from 'mongoose'

export type Subtitle_T = {
   mongo_id: string | Schema.Types.ObjectId
   yts_id: string
   imdb_id: string
   user_id: string | Schema.Types.ObjectId
   title: string
   runtime: string
   downloads?: number
   language: {
      value: string
      label: string
   }
   message: string
   filePath: string
}

export type Subtitle_Res = {
   _id: Schema.Types.ObjectId
   mongo_id: Schema.Types.ObjectId
   yts_id: string
   imdb_id: string
   user_id: {
      _id: Schema.Types.ObjectId
      name: string
   }
   title: string
   runtime: string
   downloads?: number
   language: {
      value: string
      label: string
   }
   message: string
   filePath: string
   createdAt: Date
   updatedAt: Date
}

export type Subtitle_C = {
   _id: string
   mongo_id: string
   user_id: {
      _id: string
      name: string
   }
   yts_id: string
   imdb_id: string
   title: string
   runtime: string
   downloads?: number
   language: {
      value: string
      label: string
   }
   message: string
   filePath: string
   createdAt: Date
   updatedAt: Date
}

export type Subtitle_G = {
   _id: Schema.Types.ObjectId
   mongo_id: Schema.Types.ObjectId
   yts_id: string
   imdb_id: string
   user_id: Schema.Types.ObjectId
   title: string
   runtime: string
   message: string
   downloads?: number
   language: {
      value: string
      label: string
   }
   filePath: string
   createdAt: Date
   updatedAt: Date
}
