import Link from 'next/link'
import SigninWithGoogle from '../components/signin-with-google'
import RegisterForm from './components/register-form'

export default function Signup() {
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

            <RegisterForm />
            <SigninWithGoogle />
            <div className="mt-5 flex justify-center gap-1 text-sm">
               <span>Already have account?</span>
               <Link className="underline" href="/login">
                  Sign in
               </Link>
            </div>
         </div>
      </div>
   )
}
