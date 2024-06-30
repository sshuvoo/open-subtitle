'use server'

import { auth } from '@/auth'
import { Movie } from '@/models/movie'
import { User } from '@/models/user'
import { Schema } from 'mongoose'
import { revalidatePath } from 'next/cache'

interface Doc {
   _id: Schema.Types.ObjectId
}

export const saveToWatchList = async (imdb_code: string) => {
   const session = await auth()
   if (!session) throw new Error('You must be logged in')
   try {
      const doc: Doc | null = await Movie.exists({ imdb_code })
      await User.findByIdAndUpdate(session.user.id, {
         $addToSet: { watch_list: doc?._id },
      })
      revalidatePath(`/movie/${imdb_code}`)
   } catch (error) {
      throw new Error('Failed to save in watchlist')
   }
}
