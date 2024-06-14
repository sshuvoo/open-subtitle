import { IconBrandGoogle } from '@tabler/icons-react'
import { BottomGradient } from './bottom-gradient'
import { signinAction } from '@/server-actions/signin-action'

export default function SigninWithGoogle() {
   return (
      <form action={signinAction}>
         <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
         >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
               Google
            </span>
            <BottomGradient />
         </button>
      </form>
   )
}
