import { auth, signOut } from '@/auth'
import Image from 'next/image'
import { MdLogout } from 'react-icons/md'
import Link from 'next/link'
import { SearchBar } from './search-bar'
import avatar from '@/public/assets/images/avatar.jpg'

export default async function Header() {
   const session = await auth()

   return (
      <div className="border-b border-slate-100/20 dark:text-slate-200">
         <div className="container flex h-20 items-center justify-between">
            <div>
               <Link href="/" className="font-extralight">
                  <div className="relative rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[3px]">
                     <div className="h-7 w-7 rounded bg-black"></div>
                  </div>
               </Link>
            </div>
            <div className="hidden md:block">
               <SearchBar />
            </div>
            <div className="flex items-center gap-3">
               {session && (
                  <Link
                     href="/profile"
                     className="overflow-hidden rounded-full border-2 border-primary"
                  >
                     <Image
                        width={30}
                        height={30}
                        src={session.user?.image ? session.user.image : avatar}
                        alt="avatar"
                     />
                  </Link>
               )}
               {session && (
                  <form
                     action={async () => {
                        'use server'
                        await signOut()
                     }}
                     className="flex items-center"
                  >
                     <button type="submit" className="flex items-center gap-1">
                        <MdLogout className="text-xl text-red-400" />
                        <span>Logout</span>
                     </button>
                  </form>
               )}
               {!session && (
                  <Link
                     className="rounded bg-primary px-4 py-2 text-sm text-black"
                     href="/login"
                  >
                     Login/Register
                  </Link>
               )}
            </div>
         </div>
         <div className="container mb-4 md:hidden">
            <SearchBar />
         </div>
      </div>
   )
}
