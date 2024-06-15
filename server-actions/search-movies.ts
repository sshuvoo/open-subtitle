'use server'

export const searchMovies = async (formData: FormData) => {
   const query_term = formData.get('query_term')

   try {
      const response = await fetch(
         `${process.env.LIST_MOVIES_API}?query_term=${query_term}&limit=6`
      )
      const json = await response.json()
      if (json.status === 'ok') {
         return json.data.movies
      } else return []
   } catch (error) {
      return []
   }
}
