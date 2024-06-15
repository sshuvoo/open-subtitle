import { auth, signOut } from '@/auth'
import Image from 'next/image'
import { MdLogout } from 'react-icons/md'
import Link from 'next/link'
import { SearchBar } from './search-bar'

export default async function Header() {
   const session = await auth()

   return (
      <div className="border-b border-slate-100/20 dark:text-slate-200">
         <div className="container flex h-20 items-center justify-between">
            <div>
               <h1 className="text-4xl font-extralight text-primary">OS</h1>
            </div>
            <SearchBar />
            <div className="flex items-center gap-3">
               {session?.user?.image && (
                  <div className="overflow-hidden rounded-full border-2 border-primary">
                     <Image
                        width={30}
                        height={30}
                        src={session.user.image}
                        alt="avatar"
                     />
                  </div>
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
                     href="/register"
                  >
                     Login/Register
                  </Link>
               )}
            </div>
         </div>
      </div>
   )
}
