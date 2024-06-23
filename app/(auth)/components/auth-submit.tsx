import { useFormStatus } from 'react-dom'
import { BottomGradient } from './bottom-gradient'
import { ImSpinner2 } from 'react-icons/im'

interface Props {
   title: string
   pendingMsg: string
}

export default function AuthSubmitButton({ pendingMsg, title }: Props) {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         className="group/btn relative flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
         type="submit"
      >
         {pending ? (
            <>
               <ImSpinner2 className="animate-spin text-base" />
               {pendingMsg}
            </>
         ) : (
            title
         )}
         <BottomGradient />
      </button>
   )
}
