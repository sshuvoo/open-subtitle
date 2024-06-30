'use server'

export const getReletedMovies = async (movie_id: number) => {
   try {
      const response = await fetch(
         `${process.env.SUGGESTED_MOVIES_API}?movie_id=${movie_id}`
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
