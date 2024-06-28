import Image from 'next/image'
import { BackgroundGradient } from '../ui/background-gradient'
import Link from 'next/link'

interface Props {
   movie: any
   related?: boolean
}

export const MovieCard = ({ movie, related }: Props) => {
   const shortTitle =
      movie.title.lenght < 25 ? movie.title : movie.title.slice(0, 22)
   return (
      <Link className="w-fit" href={`/movie/${movie.imdb_code}`}>
         <BackgroundGradient containerClassName="w-fit">
            <div className="relative h-[225px] w-[150px] overflow-hidden rounded-md md:h-[300px] md:w-[200px]">
               <Image
                  fill
                  src={
                     related
                        ? movie.medium_cover_image
                        : movie.large_cover_image
                  }
                  alt={movie.title}
               />
            </div>
         </BackgroundGradient>
         <div className="mt-2 text-[#c9c9c9]">
            <h2 className="text-sm">
               {shortTitle} ({movie.year})
            </h2>
         </div>
      </Link>
   )
}
