import { auth } from '@/auth'
import { getSingleFromMongo } from '@/server-actions/get-single-from-mongodb'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { SubtitleForm } from './components/subtitle-form'

interface Props {
   searchParams: {
      imdb_id: string
   }
}

export default async function AddSubtitle({ searchParams }: Props) {
   const session = await auth()
   if (!session) redirect('/login')
   const movie: any = await getSingleFromMongo(searchParams.imdb_id)
   if (!movie) notFound()

   return (
      <div>
         <div className="container">
            <div className="mt-20 grid grid-cols-1 justify-center gap-10 md:grid-cols-[auto,auto]">
               <div className="flex flex-col items-center">
                  <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                     <div className="relative h-60 w-40 md:h-[300px] md:w-[200px]">
                        <Image
                           className="rounded-md object-cover object-center"
                           src={movie.large_cover_image}
                           fill
                           alt={movie.title}
                        />
                     </div>
                  </div>
                  <div className="mt-2">
                     <h2>{movie.title_long}</h2>
                  </div>
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
