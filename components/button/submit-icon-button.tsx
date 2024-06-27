'use client'

import { useFormStatus } from 'react-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'

export default function SubmitIconButton() {
   const { pending } = useFormStatus()
   return (
      <button disabled={pending} type="submit">
         {pending ? (
            <ImSpinner2 className="animate-spin text-primary" />
         ) : (
            <AiOutlineDelete className="dark:text-white/50" />
         )}
      </button>
   )
}
