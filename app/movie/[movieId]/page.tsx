import { MovieCard } from '@/components/movie/movie-card'
import { getReletedMovies } from '@/server-actions/get-related-movies'
import { getSingleMovie } from '@/server-actions/get-single-movie'
import { YouTubeEmbed } from '@next/third-parties/google'
import Image from 'next/image'
import { LiaImdb } from 'react-icons/lia'
import { FaHeart } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa'
import { minuteToHour } from '@/utils/minute-to-hour'
import { IoLanguage } from 'react-icons/io5'
import { getBase64 } from '@/utils/get-base-64'
import { notFound } from 'next/navigation'

interface Props {
   params: {
      movieId: string
   }
}

export default async function MovieDetails({ params }: Props) {
   const movie = await getSingleMovie(params.movieId)
   if (!movie.title) notFound()
   const relatedMovies = await getReletedMovies(params.movieId)
   const { base64 } = await getBase64(movie?.large_cover_image)

   return (
      <div>
         <div className="container mt-20 space-y-8">
            <div className="grid grid-cols-[auto,1fr] gap-8">
               <div className="w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <Image
                     className="rounded-md"
                     src={movie.large_cover_image}
                     width={300}
                     height={450}
                     alt={movie.title}
                     placeholder="blur"
                     blurDataURL={base64}
                  />
               </div>
               <div className="space-y-4">
                  <div>
                     <h2 className="text-2xl font-semibold">
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
               </div>
            </div>
            <div>
               <h2 className="text-xl font-semibold">Plot summary:</h2>
               <p>{movie.description_full}</p>
            </div>
            {movie?.yt_trailer_code && (
               <div>
                  <h2 className="text-xl">Trailer</h2>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                     <YouTubeEmbed
                        videoid={movie.yt_trailer_code}
                        height={400}
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
                  <div className="mt-5 grid grid-cols-[auto,auto] justify-start gap-6 md:grid-cols-[auto,auto,auto] lg:grid-cols-[auto,auto,auto,auto]">
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
