'use server'

import { dbConnect } from '@/lib/db-connect'
import { User } from '@/models/user'
import { Schema } from 'mongoose'

interface User_Mongo {
   _id: Schema.Types.ObjectId
   name: string
}

export const getContributor = async (id: string) => {
   try {
      await dbConnect()
      const user: User_Mongo | null = await User.findById(id, 'name').lean()
      if (user) return user
   } catch (error) {
      console.log(error)
   }
}
