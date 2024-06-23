'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerUser } from '@/server-actions/register-user'
import { useFormState } from 'react-dom'
import AuthSubmitButton from '../../components/auth-submit'
import { LabelInputContainer } from '../../components/labelInput-container'

export default function RegisterForm() {
   const [state, formAction] = useFormState(registerUser, { message: '' })

   return (
      <form className="my-8" action={formAction}>
         {state?.message && (
            <div className="mb-4">
               <p className="bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {state.message}
               </p>
            </div>
         )}
         <LabelInputContainer
            error={state?.errors?.name && state.errors.name[0]}
            className="mb-4"
         >
            <Label htmlFor="fullname">Full Name</Label>
            <Input
               id="fullname"
               placeholder="Jack Sparrow"
               type="text"
               name="name"
            />
         </LabelInputContainer>
         <LabelInputContainer
            error={state?.errors?.email && state.errors.email[0]}
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
            error={state?.errors?.password && state.errors.password[0]}
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
         <LabelInputContainer
            error={state?.errors?.cPassword && state.errors.cPassword[0]}
            className="mb-4"
         >
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
               id="confirmPassword"
               placeholder="••••••••"
               type="password"
               name="cPassword"
            />
         </LabelInputContainer>
         <AuthSubmitButton title="Sign up" pendingMsg="Submitting..." />
         <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
   )
}
