'use client'

import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   title: string
   pendingMsg: string
}

export const SubmitButton = ({ pendingMsg, title }: Props) => {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2 text-sm font-semibold text-black disabled:bg-gray-600"
      >
         {pending ? (
            <>
               <ImSpinner2 className="animate-spin text-base" />
               {pendingMsg}
            </>
         ) : (
            title
         )}
      </button>
   )
}
