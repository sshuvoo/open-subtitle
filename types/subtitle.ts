import { Schema } from 'mongoose'

export type Subtitle_T = {
   mongo_id: string | Schema.Types.ObjectId
   yts_id: string
   imdb_id: string
   user_id: string | Schema.Types.ObjectId
   title: string
   runtime: string
   language: string
   filePath: string
}
