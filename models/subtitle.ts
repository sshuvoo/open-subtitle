import { Subtitle_T } from '@/types/subtitle'
import { Schema, model, models } from 'mongoose'

const schema = new Schema<Subtitle_T>(
   {
      mongo_id: {
         type: Schema.Types.ObjectId,
         ref: 'Movie',
         required: true,
      },
      yts_id: {
         type: String,
         required: true,
      },
      imdb_id: {
         type: String,
         required: true,
      },
      user_id: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      runtime: {
         type: String,
         required: true,
      },
      language: {
         type: String,
         required: true,
      },
      filePath: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

export const Subtitle = models.Subtitle || model<Subtitle_T>('Subtitle', schema)
