import SubmitIconButton from '@/components/button/submit-icon-button'
import avatar from '@/public/assets/images/avatar.svg'
import { deleteReview } from '@/server-actions/delete-review'
import { Review_Mongo } from '@/types/review'
import moment from 'moment'
import Image from 'next/image'

interface Props {
   reviews: Review_Mongo[]
   session_id?: string
}

export default function PublicReviews({ reviews, session_id }: Props) {
   return (
      <div className="mt-10 w-1/2 space-y-4">
         {reviews.map((review) => {
            const updateDeleteAction = deleteReview.bind(
               null,
               review._id.toString()
            )
            return (
               <div
                  key={review._id.toString()}
                  className="relative grid grid-cols-[auto,1fr] gap-3 rounded bg-gray-100 p-2 dark:bg-white/10"
               >
                  <div>
                     <Image
                        src={avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                     />
                  </div>
                  <div>
                     <p className="mb-1 text-sm dark:text-white/50">
                        Saffaullah Shuvo
                     </p>
                     <p className="mb-1 text-white/80">{review.review}</p>
                     <p className="text-xs text-white/50 dark:text-white/50">
                        {moment(review.createdAt).fromNow()}
                     </p>
                  </div>
                  {session_id === review.user_id._id.toString() && (
                     <form
                        action={updateDeleteAction}
                        className="absolute right-2 top-2"
                     >
                        <SubmitIconButton />
                     </form>
                  )}
               </div>
            )
         })}
      </div>
   )
}
