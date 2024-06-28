import { MovieCard } from '@/components/movie/movie-card'
import { SubtitleTable } from '@/components/table'
import { getReletedMovies } from '@/server-actions/get-related-movies'
import { getSingleMovie } from '@/server-actions/get-single-movie'
import { getSubtitles } from '@/server-actions/get-subtitles'
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

interface Props {
   params: {
      imdb_id: string
   }
}

export default async function MovieDetails({ params }: Props) {
   const movie: MovieData = await getSingleMovie(params.imdb_id)
   if (!movie.title) notFound()
   await syncMongoDatabase(movie)
   const relatedMovies = await getReletedMovies(params.imdb_id)
   const subtitles = await getSubtitles(movie.imdb_code)

   return (
      <div>
         <div className="container mt-20 space-y-8">
            <div className="grid grid-cols-[auto,1fr] gap-8">
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <Image
                     className="rounded-md"
                     src={movie.large_cover_image}
                     width={300}
                     height={450}
                     alt={movie.title}
                  />
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
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
                           <span>Rating</span>
                        </div>
                        <span className="text-white">{movie.rating}/10</span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <FaRegClock className="text-amber-600" />
                           <span>Runtime</span>
                        </div>
                        <span className="text-white">
                           {minuteToHour(movie.runtime)}
                        </span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <FaHeart className="text-primary" />
                           <span>Likes:</span>
                        </div>
                        <span className="text-white">{movie.like_count}</span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="flex items-center gap-4 text-xl">
                        <div className="flex items-center gap-2">
                           <IoLanguage className="text-purple-500" />
                           <span>Language:</span>
                        </div>
                        <span className="text-white">{movie.language}</span>
                     </h2>
                  </div>
                  <div>
                     <h2 className="text-xl font-semibold">Plot summary:</h2>
                     <p>{movie.description_full}</p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex gap-3">
                        <Link
                           className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm text-black"
                           href={`/add-subtitle?yts_id=${movie.id}&imdb_id=${movie.imdb_code}`}
                        >
                           <FiPlusCircle className="text-xl" />
                           <span>Add Subtitle</span>
                        </Link>
                        <Link
                           className="flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm text-primary"
                           href="/add-subtitle"
                        >
                           <FaRegBookmark />
                           <span>Save To Watch Later</span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            {subtitles.length > 0 && (
               <div>
                  <SubtitleTable subtitles={subtitles} />
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
