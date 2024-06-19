'use server'

import { dbConnect } from '@/lib/db-connect'
import { Movie } from '@/models/movie'
import { MovieData } from '@/types/movie'

export const syncMongoDatabase = async (movie: MovieData) => {
   try {
      await dbConnect()
      const _id = await Movie.exists({
         id: movie.id,
         imdb_code: movie.imdb_code,
      })
      if (_id) {
         await Movie.findByIdAndUpdate(_id, movie)
      } else {
         await Movie.create(movie)
      }
   } catch (error) {
      console.log(error)
   }
}
