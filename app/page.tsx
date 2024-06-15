import { auth } from '@/auth'

export default async function Home() {
   const session = await auth()

   return (
      <>
         <div className="dark:text-white">
            <h1>{session?.user?.name}</h1>
            <h1>{session?.user?.id}</h1>
         </div>
      </>
   )
}
