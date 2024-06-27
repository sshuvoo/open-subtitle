'use server'

export const getSingleMovie = async (imdb_id: string) => {
   try {
      const response = await fetch(
         `${process.env.MOVIE_DETAILS_API}?imdb_id=${imdb_id}`
      )
      const json = await response.json()
      if (json.status === 'ok') {
         if (json?.data?.movie) {
            return json.data.movie
         } else return null
      } else return null
   } catch (error) {
      return null
   }
}
