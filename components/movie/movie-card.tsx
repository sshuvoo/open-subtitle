'use client'

import Image from 'next/image'
import { BackgroundGradient } from '../ui/background-gradient'
import Link from 'next/link'

export const MovieCard = ({ movie }: { movie: any }) => {
   const shortTitle =
      movie.title.lenght < 25 ? movie.title : movie.title.slice(0, 22)
   return (
      <Link href={`/movie/${movie.id}`}>
         <BackgroundGradient containerClassName="w-fit">
            <div className="overflow-hidden rounded-md">
               <Image
                  src={movie.large_cover_image}
                  alt={movie.title}
                  width={200}
                  height={300}
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
