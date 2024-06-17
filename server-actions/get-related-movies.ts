'use server'

export const getReletedMovies = async (movieId: string) => {
   try {
      const response = await fetch(
         `${process.env.SUGGESTED_MOVIES_API}?movie_id=${movieId}`
      )
      const json = await response.json()
      if (json.status === 'ok') {
         if (json?.data?.movies) {
            return json.data.movies
         } else return []
      } else return []
   } catch (error) {
      return []
   }
}
