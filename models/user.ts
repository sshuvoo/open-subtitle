import { User_T } from '@/types/user'
import { Schema, model, models } from 'mongoose'

const schema = new Schema<User_T>(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      emailVerified: Date,
      watch_list: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],   
      verification: {
         otp: {
            type: String,
            required: true,
         },
         expiredAt: {
            type: Date,
            required: true,
         },
      },
   },
   { timestamps: true }
)

export const User = models.User || model<User_T>('User', schema)
