import Link from 'next/link'
import SigninWithGoogle from '../components/signin-with-google'
import { LoginForm } from './components/login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SigninForm() {
   const session = await auth()
   if (session) redirect('/')

   return (
      <div>
         <div className="mx-auto mt-4 w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:mt-8 md:rounded-2xl md:p-8 lg:max-w-xl xl:mt-12">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-primary">
               Contribute to Open Subtitle
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
               Sing in your account to access and contribute to our extensive
               library of high-quality subtitles for movies and TV shows.
            </p>

            <LoginForm />
            <SigninWithGoogle />
            <div className="mt-5 flex justify-center gap-1 text-sm">
               <span>Already have account?</span>
               <Link className="underline" href="/register">
                  Sign up
               </Link>
            </div>
         </div>
      </div>
   )
}
