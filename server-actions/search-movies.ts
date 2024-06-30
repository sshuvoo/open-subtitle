'use server'

export const searchMovies = async (formData: FormData) => {
   const query_term = formData.get('query_term')

   try {
      if (query_term) {
         const response = await fetch(
            `${process.env.LIST_MOVIES_API}?query_term=${query_term}&limit=30`
         )
         const json = await response.json()
         if (json.status === 'ok') {
            if (json?.data?.movies) {
               return json.data.movies
            } else return []
         } else return []
      } else return []
   } catch (error) {
      return []
   }
}
