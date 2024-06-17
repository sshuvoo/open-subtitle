'use server'

export const getSingleMovie = async (movieId: string) => {
   try {
      const response = await fetch(
         `${process.env.MOVIE_DETAILS_API}?movie_id=${movieId}`
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
