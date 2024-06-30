import { auth } from '@/auth'
import { bebas_neue } from '@/font'
import avatar from '@/public/assets/images/avatar.svg'
import Image from 'next/image'
import Link from 'next/link'
import { SearchBar } from './search-bar'

export default async function Header() {
   const session = await auth()

   return (
      <div className="border-b border-slate-100/20 dark:text-slate-200">
         <div className="container flex h-20 items-center justify-between">
            <div>
               <Link href="/" className="flex items-center gap-2">
                  <div className="relative w-fit rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-primary to-90% p-[3px]">
                     <div className="h-7 w-7 rounded bg-black"></div>
                  </div>
                  <div
                     className={`hidden translate-y-[2px] text-4xl tracking-widest md:block ${bebas_neue.className}`}
                  >
                     <h1>penSub</h1>
                  </div>
               </Link>
            </div>
            <div className="hidden md:block">
               <SearchBar />
            </div>
            <div className="md:hidden">
               <h1
                  className={`text-2xl font-bold tracking-widest ${bebas_neue.className}`}
               >
                  OpenSub
               </h1>
            </div>
            <div className="flex items-center gap-3">
               {session && (
                  <Link
                     href="/profile"
                     className="overflow-hidden rounded-full"
                  >
                     <Image
                        width={40}
                        height={40}
                        src={session.user?.image ? session.user.image : avatar}
                        alt="avatar"
                     />
                  </Link>
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
