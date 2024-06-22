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
   },
   { timestamps: true }
)

export const User = models.User || model<User_T>('User', schema)
