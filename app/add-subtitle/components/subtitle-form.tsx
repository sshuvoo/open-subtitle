'use client'

import { DragAndDrop } from '@/components/add-subtitle/drag-and-drop'
import { SubmitButton } from '@/components/button/submit-button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { postSubtitle } from '@/server-actions/post-subtitle'
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
         <DragAndDrop />
         <div className="w-full max-w-lg">
            <div className="mt-10 space-y-4">
               {state?.errors?.subtitleFile && (
                  <p className="text-xs font-medium text-red-500">
                     {state?.errors?.subtitleFile[0]}
                  </p>
               )}
               <Input placeholder="Title" name="title" />
               {state?.errors?.title && (
                  <p className="text-xs font-medium text-red-500">
                     {state?.errors?.title[0]}
                  </p>
               )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
               <Input placeholder="Runtime" name="runtime" />
               <Select options={languages} name="language" />
            </div>
            {state?.errors?.runtime && (
               <p className="text-xs font-medium text-red-500">
                  {state?.errors?.runtime[0]}
               </p>
            )}
            {state?.errors?.language && (
               <p className="text-xs font-medium text-red-500">
                  {state?.errors?.language[0]}
               </p>
            )}
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
                  <p className="text-xs font-medium text-red-500">
                     {state.message}
                  </p>
               )}
            </div>
         </div>
      </form>
   )
}

// languages.js
const languages = [
   { value: 'en', label: 'English' },
   { value: 'es', label: 'Spanish' },
   { value: 'fr', label: 'French' },
   { value: 'de', label: 'German' },
   { value: 'zh', label: 'Chinese' },
   { value: 'ja', label: 'Japanese' },
   { value: 'hi', label: 'Hindi' },
   { value: 'ar', label: 'Arabic' },
   { value: 'ru', label: 'Russian' },
   { value: 'pt', label: 'Portuguese' },
   { value: 'bn', label: 'Bengali' },
   { value: 'pa', label: 'Punjabi' },
   { value: 'jv', label: 'Javanese' },
   { value: 'ko', label: 'Korean' },
   { value: 'vi', label: 'Vietnamese' },
   { value: 'te', label: 'Telugu' },
   { value: 'mr', label: 'Marathi' },
   { value: 'tr', label: 'Turkish' },
   { value: 'ta', label: 'Tamil' },
   { value: 'it', label: 'Italian' },
   { value: 'fa', label: 'Persian' },
   { value: 'pl', label: 'Polish' },
   { value: 'uk', label: 'Ukrainian' },
   { value: 'ro', label: 'Romanian' },
   { value: 'nl', label: 'Dutch' },
]
