'use server'

import { Movie } from '@/models/movie'

export const getSingleFromMongo = async (movieId: string) => {
   try {
      const movie = await Movie.findOne({ id: movieId }).lean()
      if (movie) {
         return movie
      } else return null
   } catch (error) {
      return null
   }
}
