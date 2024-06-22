'use server'

import { dbConnect } from '@/lib/db-connect'
import { Subtitle } from '@/models/subtitle'
import { Subtitle_G } from '@/types/subtitle'

export const getSingleSubtitle = async (subId: string) => {
   try {
      await dbConnect()
      const buffer: Subtitle_G | null = await Subtitle.findById(subId).lean()
      if (buffer) {
         return {
            ...buffer,
            _id: buffer._id.toString(),
            mongo_id: buffer.mongo_id.toString(),
            user_id: buffer.user_id.toString(),
         }
      }
      return null
   } catch (error) {
      console.log(error)
      return null
   }
}
