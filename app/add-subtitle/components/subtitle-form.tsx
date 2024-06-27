'use client'

import { DragAndDrop } from '@/components/add-subtitle/drag-and-drop'
import { SubmitButton } from '@/components/button/submit-button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { postSubtitle } from '@/server-actions/post-subtitle'
import { languages } from '@/static-data/languages'
import { useFormState } from 'react-dom'

interface Props {
   searchParams: {
      yts_id: string
      imdb_id: string
   }
   mongo_id: string
}

export const SubtitleForm = ({ searchParams, mongo_id }: Props) => {
   const [state, formAction] = useFormState(postSubtitle, { message: '' })

   return (
      <form action={formAction}>
         <DragAndDrop
            error={
               state?.errors?.subtitleFile && state?.errors?.subtitleFile[0]
            }
         />
         <div className="w-full max-w-lg">
            <div className="mt-10">
               <Input
                  placeholder="Title - Avatar.The.Way.Of.Water(2022)[1080p]"
                  name="title"
               />
               {state?.errors?.title && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                     {state?.errors?.title[0]}
                  </p>
               )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
               <Input placeholder="Runtime - 1h 35m" name="runtime" />
               <Select options={languages} name="language" />
            </div>
            {state?.errors?.runtime && (
               <p className="mt-1 text-xs font-medium text-red-500">
                  {state?.errors?.runtime[0]}
               </p>
            )}
            <div className="mt-5">
               <Textarea
                  rows={3}
                  placeholder="Write a message for audiences"
                  name="message"
               />
               {state?.errors?.message && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                     {state?.errors?.message[0]}
                  </p>
               )}
            </div>
            <div>
               <input name="yts_id" defaultValue={searchParams.yts_id} hidden />
               <input
                  name="imdb_id"
                  defaultValue={searchParams.imdb_id}
                  hidden
               />
               <input name="mongo_id" defaultValue={mongo_id} hidden />
            </div>
            <div className="mt-5">
               <SubmitButton pendingMsg="Uploading" title="Submit" />
            </div>
            <div>
               {state?.message && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                     {state.message}
                  </p>
               )}
            </div>
         </div>
      </form>
   )
}
