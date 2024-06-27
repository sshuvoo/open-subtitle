'use server'

export const getNewAdded = async () => {
   try {
      const response = await fetch(
         `${process.env.LIST_MOVIES_API}?sort_by=date_added&limit=10`
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
