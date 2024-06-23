'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconBrandGoogle } from '@tabler/icons-react'
import { FormEvent } from 'react'
import { BottomGradient } from '../components/bottom-gradient'
import { LabelInputContainer } from '../components/labelInput-container'
import SigninWithGoogle from '../components/signin-with-google'

export default function SigninForm() {
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('Form submitted')
   }

   return (
      <div>
         <div className="mx-auto mt-4 w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:mt-8 md:rounded-2xl md:p-8 lg:max-w-xl xl:mt-12">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-primary">
               Contribute to Open Subtitle
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
               Create your account to access and contribute to our extensive
               library of high-quality subtitles for movies and TV shows.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                     id="email"
                     placeholder="jacksparrow@captain.com"
                     type="email"
                  />
               </LabelInputContainer>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" type="password" />
               </LabelInputContainer>
               <button
                  className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
               >
                  Sign in
                  <BottomGradient />
               </button>
               <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>
            <SigninWithGoogle />
         </div>
      </div>
   )
}
