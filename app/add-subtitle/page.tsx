import { auth } from '@/auth'
import { getSingleFromMongo } from '@/server-actions/get-single-from-mongodb'
import { getBase64 } from '@/utils/get-base-64'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { SubtitleForm } from './components/subtitle-form'

interface Props {
   searchParams: {
      yts_id: string
      imdb_id: string
   }
}

export default async function AddSubtitle({ searchParams }: Props) {
   const session = await auth()
   if (!session) redirect('/login')
   const movie: any = await getSingleFromMongo(searchParams.yts_id)
   if (!movie.title) notFound()
   const { base64 } = await getBase64(movie?.large_cover_image)

   return (
      <div>
         <div className="container">
            <div className="mt-20 grid grid-cols-1 justify-center gap-10 md:grid-cols-[auto,auto]">
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
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
               <SubtitleForm
                  searchParams={searchParams}
                  mongo_id={movie._id.toString()}
               />
            </div>
         </div>
      </div>
   )
}
