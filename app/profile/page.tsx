import { auth, signOut } from '@/auth'
import { SubtitleTable } from '@/components/table'
import avatar from '@/public/assets/images/avatar.svg'
import { getPrsonalSubtitles } from '@/server-actions/get-personal-subtitles'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

export default async function Profile() {
   const session = await auth()
   if (!session) redirect('/login')
   const subtitles = await getPrsonalSubtitles(session.user.id)

   return (
      <div>
         <div className="container my-10 lg:my-20">
            <div className="grid grid-cols-[auto,1fr] gap-4">
               <div className="relative h-24 w-24 bg-black">
                  <Image
                     className="rounded-md"
                     src={session.user?.image ? session.user?.image : avatar}
                     alt={session.user.name || 'Profile Avatar'}
                     fill
                  />
               </div>
               <div className="flex justify-between">
                  <div>
                     <h2 className="text-3xl">{session.user.name}</h2>
                     <h4 className="inline-flex items-center rounded-md bg-green-50/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-600/20">
                        New Contributor
                     </h4>
                     <h4 className="mt-2 text-sm">Joined: 24-03-2024</h4>
                  </div>
                  <div className="hidden md:flex md:flex-col md:items-end md:justify-between">
                     <form
                        action={async () => {
                           'use server'
                           await signOut()
                        }}
                        className="flex items-center rounded bg-secondary px-4 py-2"
                     >
                        <button
                           type="submit"
                           className="flex items-center gap-1"
                        >
                           <MdLogout className="text-xl text-red-400" />
                           <span>Logout</span>
                        </button>
                     </form>
                     <div>
                        <button
                           type="button"
                           className="flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
                        >
                           <CiEdit className="text-xl" />
                           <span>Edit Profile</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-5 flex justify-between md:hidden">
               <form
                  action={async () => {
                     'use server'
                     await signOut()
                  }}
                  className="flex items-center rounded bg-secondary px-4 py-2"
               >
                  <button type="submit" className="flex items-center gap-1">
                     <MdLogout className="text-xl text-red-400" />
                     <span>Logout</span>
                  </button>
               </form>
               <div>
                  <button
                     type="button"
                     className="flex items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
                  >
                     <CiEdit className="text-xl" />
                     <span>Edit Profile</span>
                  </button>
               </div>
            </div>
            <div className="mt-5">
               <p className="bg-secondary p-3">
                  John Doe, a web developer with expertise in React and Next.js,
                  excels in creating responsive designs with Tailwind CSS. An
                  active open-source contributor, he enjoys tech blogging,
                  exploring new technologies, and working on subtitle sharing
                  platforms.
               </p>
            </div>

            <div className="mt-5 flex justify-center space-x-4">
               <Link
                  target="_blank"
                  href="#"
                  className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-[#1877F2]"
               >
                  <FaFacebook /> Facebook
               </Link>
               <Link
                  target="_blank"
                  href="#"
                  className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-[#25D366]"
               >
                  <FaWhatsapp /> Whatsapp
               </Link>
               <Link
                  target="_blank"
                  href="#"
                  className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-[#0077B5]"
               >
                  <FaLinkedin /> LinkedIn
               </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5 md:gap-10">
               <div className="flex flex-col items-center gap-2 bg-emerald-950/50 p-3 md:gap-5 md:p-5">
                  <h3 className="text-sm">Total Uploads:</h3>
                  <h2 className="text-2xl font-semibold md:text-5xl">20</h2>
               </div>
               <div className="flex flex-col items-center gap-2 bg-sky-950/50 p-3 md:gap-5 md:p-5">
                  <h3 className="text-sm">Achievement:</h3>
                  <h2 className="text-2xl font-semibold md:text-5xl">
                     Veteran
                  </h2>
               </div>
            </div>
            {subtitles.length > 0 && (
               <div className="mt-10">
                  <h2 className="py-5 text-2xl">My Subtitles</h2>
                  <SubtitleTable subtitles={subtitles} />
               </div>
            )}
         </div>
      </div>
   )
}
