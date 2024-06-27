'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/server-actions/login-user'
import { useFormState } from 'react-dom'
import AuthSubmitButton from '../../components/auth-submit'
import { LabelInputContainer } from '../../components/labelInput-container'

export const LoginForm = () => {
   const [state, formAction] = useFormState(loginUser, { message: '' })

   return (
      <form className="my-8" action={formAction}>
         {state?.message && (
            <div className="mb-4">
               <p className="rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {state.message}
               </p>
            </div>
         )}
         <LabelInputContainer
            error={state?.errors?.email && state?.errors?.email[0]}
            className="mb-4"
         >
            <Label htmlFor="email">Email Address</Label>
            <Input
               id="email"
               placeholder="jacksparrow@captain.com"
               type="email"
               name="email"
            />
         </LabelInputContainer>
         <LabelInputContainer
            error={state?.errors?.password && state?.errors?.password[0]}
            className="mb-4"
         >
            <Label htmlFor="password">Password</Label>
            <Input
               id="password"
               placeholder="••••••••"
               type="password"
               name="password"
            />
         </LabelInputContainer>
         <AuthSubmitButton pendingMsg="Connecting..." title="Sign in" />
         <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
   )
}
