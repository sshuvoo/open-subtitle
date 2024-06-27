import { MovieCard } from '@/components/movie/movie-card'
import { getNewAdded } from '@/server-actions/get-new-added'
import { getNewArrival } from '@/server-actions/get-new-arrival'
import { getPopular } from '@/server-actions/getPopular'

export default async function Home() {
   const popular = await getPopular()
   const latest = await getNewArrival()
   const recent = await getNewAdded()

   return (
      <div className="dark:text-white">
         <div className="container space-y-16 py-10">
            <div>
               <div>
                  <h2 className="text-2xl font-light">Popular Downloads</h2>
               </div>
               <div className="mt-10 grid grid-cols-[auto,auto] justify-evenly gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-[auto,auto,auto,auto,auto]">
                  {popular.map((movie: any) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            </div>
            <div>
               <div>
                  <h2 className="text-2xl font-light">Recent Added</h2>
               </div>
               <div className="mt-10 grid grid-cols-[auto,auto] justify-evenly gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-[auto,auto,auto,auto,auto]">
                  {recent.map((movie: any) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            </div>
            <div>
               <div>
                  <h2 className="text-2xl font-light">Latest Collections</h2>
               </div>
               <div className="mt-10 grid grid-cols-[auto,auto] justify-evenly gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-[auto,auto,auto,auto,auto]">
                  {latest.map((movie: any) => (
                     <MovieCard key={movie.id} movie={movie} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
