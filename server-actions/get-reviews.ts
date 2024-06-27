'use server'

import { dbConnect } from '@/lib/db-connect'
import { Review } from '@/models/review'
import { Review_Mongo } from '@/types/review'

export const getReviews = async (sub_id: string) => {
   try {
      await dbConnect()
      const reviews: Review_Mongo[] = await Review.find({ sub_id })
         .populate('user_id', 'name image')
         .lean()

      if (reviews && reviews.length > 0) {
         return reviews
      } else []
   } catch (error) {
      return []
   }
}
