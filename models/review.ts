import { Review_T } from '@/types/review'
import { Schema, model, models } from 'mongoose'

const schema = new Schema<Review_T>(
   {
      imdb_id: {
         type: String,
         required: true,
      },
      user_id: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      sub_id: {
         type: Schema.Types.ObjectId,
         ref: 'Subtitle',
         required: true,
      },
      review: {
         type: String,
         required: true,
      },
      rating: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
)

export const Review = models.Review || model<Review_T>('Review', schema)
