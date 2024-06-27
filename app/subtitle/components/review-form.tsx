'use client'

import { Textarea } from '@/components/ui/textarea'
import {
   BsEmojiAngry,
   BsEmojiFrown,
   BsEmojiHeartEyes,
   BsEmojiNeutral,
   BsEmojiSunglasses,
} from 'react-icons/bs'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { SubmitButton } from '@/components/button/submit-button'
import { useFormState } from 'react-dom'
import { postReview } from '@/server-actions/post-review'

const ratingData = [
   { title: '1. Very dissatisfied', value: 1 },
   { title: '2. Dissatisfied', value: 2 },
   { title: '3. Neutral', value: 3 },
   { title: '4. Satisfied', value: 4 },
   { title: '5. Very satisfied', value: 5 },
]

interface Props {
   imdb_id: string
   sub_id: string
}

export default function ReviewForm({ imdb_id, sub_id }: Props) {
   const [rating, setRating] = useState<number>()
   const [state, formAction] = useFormState(postReview, { message: '' })

   return (
      <form action={formAction}>
         <div className="flex items-center gap-3">
            {ratingData.map(({ title, value }) => (
               <motion.button
                  type="button"
                  key={value}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  title={title}
                  className={`text-3xl hover:text-primary ${rating === value ? 'text-primary' : 'text-white/30'}`}
                  onClick={() => setRating(value)}
               >
                  {value === 1 && <BsEmojiAngry />}
                  {value === 2 && <BsEmojiFrown />}
                  {value === 3 && <BsEmojiNeutral />}
                  {value === 4 && <BsEmojiSunglasses />}
                  {value === 5 && <BsEmojiHeartEyes />}
               </motion.button>
            ))}
         </div>
         {state?.errors?.rating && (
            <p className="mt-1 text-xs text-red-500">{state.errors.rating}</p>
         )}
         <div className="mt-4"></div>
         <Textarea placeholder="Write an appreciation" name="review" />
         {state?.errors?.review && (
            <p className="mt-1 text-xs text-red-500">{state.errors.review}</p>
         )}
         <input value={rating} type="text" hidden name="rating" />
         <input value={imdb_id} type="text" hidden name="imdb_id" />
         <input value={sub_id} type="text" hidden name="sub_id" />
         {state?.message && (
            <div className="mb-4">
               <p className="rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {state.message}
               </p>
            </div>
         )}
         <div className="mt-2"></div>
         <SubmitButton pendingMsg="Submitting..." title="Submit" />
      </form>
   )
}
