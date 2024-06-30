import { MovieCard } from '@/components/movie/movie-card'
import { SubtitleTable } from '@/components/table'
import { getReletedMovies } from '@/server-actions/get-related-movies'
import { getSingleMovie } from '@/server-actions/get-single-movie'
import { getSubtitles } from '@/server-actions/get-subtitles'
import { saveToWatchList } from '@/server-actions/save-to-watchlist'
import { syncMongoDatabase } from '@/server-actions/sync-mongo-database'
import { MovieData } from '@/types/movie'
import { minuteToHour } from '@/utils/minute-to-hour'
import { YouTubeEmbed } from '@next/third-parties/google'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaHeart, FaRegBookmark, FaRegClock } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { IoLanguage } from 'react-icons/io5'
import { LiaImdb } from 'react-icons/lia'
import WatchLaterSubmit from '../components/watch-later-submit'
import { auth } from '@/auth'

interface Props {
   params: {
      imdb_id: string
   }
}

export default async function MovieDetails({ params }: Props) {
   const movie: MovieData = await getSingleMovie(params.imdb_id)
   if (!movie) notFound()
   if (!movie?.title) notFound()
   await syncMongoDatabase(movie)
   const relatedMovies = await getReletedMovies(movie.id)
   const subtitles = await getSubtitles(movie.imdb_code)
   const saveToAction = saveToWatchList.bind(null, movie.imdb_code)
   const session = await auth()
   const isWatchlisted =
      session?.user.watch_list?.some(
         (item) => item.imdb_code === movie.imdb_code
      ) || false
      
   return (
      <div>
         <div className="container mt-20 space-y-8">
            <div className="grid grid-cols-[auto,1fr] gap-8">
               <div className="col-span-full space-y-1 lg:hidden">
                  <h2 className="text-4xl font-semibold text-white/80">
                     {movie.title} ({movie.year})
                  </h2>
                  {movie?.genres.length > 0 && (
                     <h2 className="font-medium">{movie.genres.join('/')}</h2>
                  )}
               </div>
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <div className="relative h-60 w-40 md:h-[450px] md:w-[300px]">
                     <Image
                        className="rounded-md object-cover object-center"
                        src={movie.large_cover_image}
                        fill
                        alt={movie.title}
                     />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="hidden space-y-1 lg:block">
                     <h2 className="text-4xl font-semibold text-white/80">
                        {movie.title} ({movie.year})
                     </h2>
                     {movie?.genres.length > 0 && (
                        <h2 className="font-medium">
                           {movie.genres.join('/')}
                        </h2>
                     )}
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <LiaImdb className="text-4xl text-yellow-400" />
                           <span className="text-sm md:text-base">Rating</span>
                        </div>
                        <span className="text-sm text-white md:text-base">
                           {movie.rating}/10
                        </span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <FaRegClock className="text-amber-600" />
                           <span className="text-sm md:text-base">Runtime</span>
                        </div>
                        <span className="text-sm text-white md:text-base">
                           {minuteToHour(movie.runtime)}
                        </span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <FaHeart className="text-primary" />
                           <span className="text-sm md:text-base">Likes:</span>
                        </div>
                        <span className="text-sm text-white md:text-base">
                           {movie.like_count}
                        </span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <IoLanguage className="text-purple-500" />
                           <span className="text-sm md:text-base">
                              Language:
                           </span>
                        </div>
                        <span className="text-sm text-white md:text-base">
                           {movie.language}
                        </span>
                     </h2>
                  </div>
                  <div className="hidden lg:block">
                     <h2 className="text-xl font-semibold">Plot summary:</h2>
                     <p>{movie.description_full}</p>
                  </div>
                  <div className="hidden space-y-4 lg:block">
                     <div className="flex gap-3">
                        <Link
                           className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm text-black"
                           href={`/add-subtitle?imdb_id=${movie.imdb_code}`}
                        >
                           <FiPlusCircle className="text-xl" />
                           <span>Add Subtitle</span>
                        </Link>
                        <form action={saveToAction}>
                           <WatchLaterSubmit isWatchlisted={isWatchlisted} />
                        </form>
                     </div>
                  </div>
               </div>
               <div className="col-span-full lg:hidden">
                  <h2 className="text-xl font-semibold">Plot summary:</h2>
                  <p>{movie.description_full}</p>
               </div>
               <div className="col-span-full space-y-4 lg:hidden">
                  <div className="flex gap-3">
                     <Link
                        className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm text-black"
                        href={`/add-subtitle?imdb_id=${movie.imdb_code}`}
                     >
                        <FiPlusCircle className="text-xl" />
                        <span>Add Subtitle</span>
                     </Link>
                     <form action={saveToAction}>
                        <WatchLaterSubmit isWatchlisted={isWatchlisted} />
                     </form>
                  </div>
               </div>
            </div>

            {subtitles.length > 0 && (
               <div className="overflow-x-auto">
                  <SubtitleTable subtitles={subtitles} />
               </div>
            )}
            {movie.cast.length > 0 && (
               <div>
                  <h2 className="text-xl">Top Cast</h2>
                  <div className="mt-5 grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                     {movie.cast.map((c) => (
                        <div key={c.imdb_code} className="flex gap-4">
                           <div className="relative h-16 w-16">
                              <Image
                                 className="rounded-full object-cover object-center"
                                 src={c.url_small_image}
                                 fill
                                 alt={c.name}
                              />
                           </div>
                           <div>
                              <h2 className="font-medium">{c.name}</h2>
                              <h3 className="text-sm">as {c.character_name}</h3>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
            {movie?.yt_trailer_code && (
               <div>
                  <h2 className="text-xl">Trailer</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                     <YouTubeEmbed
                        videoid={movie.yt_trailer_code}
                        params="controls=0&rel=0"
                     />
                     <Image
                        className="hidden aspect-video md:block"
                        src={movie.background_image_original}
                        width={800}
                        height={450}
                        alt=""
                     />
                  </div>
               </div>
            )}
            {relatedMovies.length > 0 && (
               <div>
                  <h2 className="text-xl">You May Also Like</h2>
                  <div className="mt-10 grid grid-cols-[auto,auto] justify-evenly gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto] xl:grid-cols-[auto,auto,auto,auto,auto]">
                     {relatedMovies.map((rMovie: any) => (
                        <MovieCard movie={rMovie} key={rMovie.id} related />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
