'use client'

import { useFormStatus } from 'react-dom'
import { FaRegBookmark } from 'react-icons/fa'
import { FaBookmark } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'

export default function WatchLaterSubmit({
   isWatchlisted,
}: {
   isWatchlisted: boolean
}) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         className="flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm text-primary"
      >
         {pending ? (
            <ImSpinner2 className="animate-spin text-base" />
         ) : isWatchlisted ? (
            <FaBookmark />
         ) : (
            <FaRegBookmark />
         )}
         {pending ? (
            <span>Saving...</span>
         ) : isWatchlisted ? (
            <span>Saved</span>
         ) : (
            <span>Save To Watch Later</span>
         )}
      </button>
   )
}
