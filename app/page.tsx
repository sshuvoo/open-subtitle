import { MovieCard } from '@/components/movie/movie-card'
import { getPopular } from '@/server-actions/getPopular'

export default async function Home() {
   const movies = await getPopular()

   return (
      <div className="dark:text-white">
         <div className="container py-10">
            <div>
               <h2 className="text-2xl font-light">Popular Downloads</h2>
            </div>
            <div className="mt-10 grid grid-cols-[auto,auto] justify-evenly gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-[auto,auto,auto,auto,auto]">
               {movies.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
               ))}
            </div>
         </div>
      </div>
   )
}
