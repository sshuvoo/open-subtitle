'use server'

import { dbConnect } from '@/lib/db-connect'
import { Subtitle } from '@/models/subtitle'
import { User } from '@/models/user'
import { Subtitle_Res } from '@/types/subtitle'
import { groupBy } from '@/utils/groupBy'

export const getSubtitles = async (imdb_id: string) => {
   try {
      await dbConnect()
      await User.findById(undefined)
      const buffers: Subtitle_Res[] = await Subtitle.find({ imdb_id })
         .populate('user_id', 'name')
         .lean()
      const subLists = buffers.map((sub) => ({
         ...sub,
         _id: sub._id.toString(),
         mongo_id: sub.mongo_id.toString(),
         user_id: {
            ...sub.user_id,
            _id: sub.user_id._id.toString(),
         },
      }))
      const listByLanguage = Object.entries(
         groupBy(subLists, (item) => item.language)
      )
      return listByLanguage
   } catch (error) {
      console.log(error)
      return []
   }
}
