'use server'

import { auth } from '@/auth'
import { Review } from '@/models/review'
import { Review_M } from '@/types/review'
import { revalidatePath } from 'next/cache'

export const deleteReview = async (review_id: string) => {
   const session = await auth()
   if (!session) throw new Error('Please login first')
   let review: Review_M | null = null
   try {
      review = await Review.findById(review_id).lean()
      if (review && review.user_id.toString() === session.user.id) {
         await Review.findByIdAndDelete(review_id)
      }
   } catch (error) {}
   revalidatePath(`/subtitle/${review?.sub_id.toString()}`)
}
