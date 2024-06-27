'use server'

import { dbConnect } from '@/lib/db-connect'
import { Movie } from '@/models/movie'

export const syncMongoDatabase = async (movie: any) => {
   const { torrents, ...extract } = movie
   try {
      await dbConnect()
      const _id = await Movie.exists({
         imdb_code: extract.imdb_code,
      })
      if (_id) {
         await Movie.findByIdAndUpdate(_id, extract)
      } else {
         await Movie.create(extract)
      }
   } catch (error) {
      console.log(error)
   }
}
