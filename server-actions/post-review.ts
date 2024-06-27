'use server'

import { auth } from '@/auth'
import { dbConnect } from '@/lib/db-connect'
import { Review } from '@/models/review'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
   review: z.string().min(1, { message: 'Please write something' }),
   rating: z
      .number({ message: 'Please select a rating' })
      .int({ message: 'Please select a rating' })
      .gte(1, { message: 'Rating must be between 1 to 5' })
      .lte(5, { message: 'Rating must be between 1 to 5' }),
})

export const postReview = async (prev: any, fData: FormData) => {
   const session = await auth()
   if (!session) return { message: 'Please login first' }

   const formData = Object.fromEntries(fData)

   const validatedFields = schema.safeParse({
      review: fData.get('review'),
      rating: Number(fData.get('rating')),
   })

   if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors }
   }

   try {
      await dbConnect()
      await Review.create({
         ...formData,
         user_id: session.user.id,
      })
   } catch (error) {
      console.log(error)
   }
   revalidatePath(`/subtitle/${formData.sub_id}`)
}
