import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import avatar from '@/public/assets/images/avatar.jpg'
import Image from 'next/image'

export default async function Profile() {
   const session = await auth()
   if (!session) redirect('/login')

   return (
      <div>
         <div className="container my-10 lg:my-20">
            <div className="grid grid-cols-[auto,1fr] gap-4">
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <div className="relative h-24 w-24">
                     <Image
                        className="rounded-md"
                        src={session.user?.image ? session.user?.image : avatar}
                        alt={session.user.name || 'Profile Avatar'}
                        fill
                     />
                  </div>
               </div>
               <div>
                  <div className="flex items-start gap-3">
                     <h2 className="text-3xl">{session.user.name}</h2>
                     <span className="inline-flex items-center rounded-md bg-green-50/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-600/20">
                        New Contributor
                     </span>
                  </div>
                  <h3>{session.user.email}</h3>
                  <h3>01521565326</h3>
               </div>
            </div>
            <div className='mt-5'>
               <p className='p-3 bg-secondary'>
                  John Doe, a web developer with expertise in React and Next.js,
                  excels in creating responsive designs with Tailwind CSS. An
                  active open-source contributor, he enjoys tech blogging,
                  exploring new technologies, and working on subtitle sharing
                  platforms.
               </p>
            </div>
            <div>
               
            </div>
         </div>
      </div>
   )
}
