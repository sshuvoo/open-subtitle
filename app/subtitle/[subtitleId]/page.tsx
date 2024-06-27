import { auth } from '@/auth'
import avatar from '@/public/assets/images/avatar.jpg'
import { getContributor } from '@/server-actions/get-contributor'
import { getReviews } from '@/server-actions/get-reviews'
import { getSingleFromMongo } from '@/server-actions/get-single-from-mongodb'
import { getSingleSubtitle } from '@/server-actions/get-single-subtitle'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { DownloadForm } from '../components/download-button'
import PublicReviews from '../components/public-reviews'
import RatingStat from '../components/rating-stat'
import ReviewForm from '../components/review-form'

interface Props {
   params: {
      subtitleId: string
   }
}

export default async function SubtitleDetails({ params }: Props) {
   const subtitle = await getSingleSubtitle(params.subtitleId)
   if (!subtitle) notFound()
   const contributor = await getContributor(subtitle.user_id)
   const movie: any = await getSingleFromMongo(subtitle.imdb_id)
   const reviews = await getReviews(params.subtitleId)
   const session = await auth()

   return (
      <div className="dark:text-gray-100">
         <div className="container mx-auto">
            <div className="mb-6 mt-10 grid grid-cols-[1fr,auto] gap-4 rounded-lg bg-white p-6 shadow dark:bg-secondary lg:mt-20">
               <div className="flex flex-col justify-between">
                  <h2 className="mb-4 text-4xl font-bold">
                     {movie.title_long}
                  </h2>
                  <div>
                     <p className="mb-2">Subtitle Title: {subtitle.title}</p>
                     <p className="mb-2">
                        Sub. Language: {subtitle.language.label}
                     </p>
                     <p className="mb-2">
                        Release Date:{' '}
                        {moment(subtitle.createdAt).format('DD-MM-YYYY')}
                     </p>
                     <p className="mb-2">
                        Contributor: {contributor?.name || 'Annonymus'}
                     </p>
                     <p>{subtitle.message}</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <DownloadForm
                        sub_id={subtitle._id}
                        title={subtitle.title}
                        filePath={subtitle.filePath}
                     />
                     <h3 className="text-5xl font-semibold">
                        {subtitle?.downloads || 0}{' '}
                        <span className="text-base text-white/60">
                           Downloads
                        </span>
                     </h3>
                  </div>
               </div>
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <Image
                     className="rounded-md"
                     src={movie.large_cover_image}
                     width={250}
                     height={375}
                     alt={movie.title}
                  />
               </div>
            </div>
            {/*  */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-secondary">
               <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
               <div className="mt-4 grid grid-cols-2">
                  <ReviewForm
                     imdb_id={subtitle.imdb_id}
                     sub_id={params.subtitleId}
                  />
                  <RatingStat />
               </div>
               {reviews && reviews?.length > 0 && (
                  <PublicReviews
                     session_id={session?.user.id}
                     reviews={reviews}
                  />
               )}
            </div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-secondary">
               <h2 className="mb-4 text-2xl font-bold">
                  Contributor Information
               </h2>
               <div className="mb-4 flex items-center">
                  <Image
                     src={avatar}
                     alt="Contributor"
                     className="mr-4 h-24 w-24 rounded-full"
                  />
                  <div>
                     <p className="text-xl font-semibold">
                        {contributor?.name || 'Anonymous'}
                     </p>
                     <p className="text-gray-600 dark:text-gray-400">
                        Subtitle Contributor
                     </p>
                  </div>
               </div>
               <p className="mb-2">
                  Passionate about movies and languages. Loves to contribute to
                  the community.
               </p>
               <div className="flex space-x-4">
                  <Link
                     href="#"
                     className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-[#1877F2]"
                  >
                     <FaFacebook /> Facebook
                  </Link>
                  <Link
                     href="#"
                     className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-[#25D366]"
                  >
                     <FaWhatsapp /> Whatsapp
                  </Link>
                  <Link
                     href="#"
                     className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-[#0077B5]"
                  >
                     <FaLinkedin /> LinkedIn
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
