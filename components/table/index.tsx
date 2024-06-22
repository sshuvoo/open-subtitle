import { LanguageObject } from '@/static-data/languages'
import { Subtitle_C } from '@/types/subtitle'
import moment from 'moment'
import Link from 'next/link'

interface Props {
   subtitles: Subtitle_C[]
   language: string
}

export const SubtitleTable = ({ subtitles, language }: Props) => {
   return (
      <>
         <div className="text-sm uppercase leading-normal text-white/80">
            <h2 className="py-3 text-left text-xl font-medium">
               {LanguageObject[language]}
            </h2>
         </div>
         <table className="min-w-full border-collapse rounded-lg bg-white shadow-lg dark:bg-secondary">
            <thead>
               <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600 dark:bg-secondary dark:text-primary">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Runtime</th>
                  <th className="px-6 py-3 text-left">Upload On</th>
                  <th className="px-6 py-3 text-left">Contributor</th>
               </tr>
            </thead>
            <tbody className="text-sm font-light text-gray-600 dark:text-gray-300">
               {subtitles.map((subtitle) => (
                  <tr
                     key={subtitle._id}
                     className="group transition-colors duration-200 odd:bg-black even:bg-white hover:bg-gray-100 dark:border-gray-700 dark:even:bg-secondary dark:hover:bg-white/10"
                  >
                     <td className="whitespace-nowrap px-6 py-3 text-left">
                        <Link
                           className="font-medium group-hover:text-primary"
                           href={`/subtitle/${subtitle._id}`}
                        >
                           {subtitle.title}
                        </Link>
                     </td>
                     <td className="px-6 py-3 text-left">{subtitle.runtime}</td>
                     <td className="px-6 py-3 text-left">
                        {moment(subtitle.createdAt).format('DD-MM-YYYY')}
                     </td>
                     <td className="px-6 py-3 text-left">
                        <Link href={`/contributor/${subtitle.user_id._id}`}>
                           {subtitle.user_id.name}
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   )
}
