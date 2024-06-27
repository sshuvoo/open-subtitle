import { Subtitle_C } from '@/types/subtitle'
import moment from 'moment'
import Link from 'next/link'
import { Fragment } from 'react'

interface Props {
   subtitles: Subtitle_C[]
}

export const SubtitleTable = ({ subtitles }: Props) => {
   let currentLang: string | null = subtitles[0].language.value

   return (
      <table className="min-w-full border-collapse rounded-lg bg-white shadow-lg dark:bg-secondary">
         <thead>
            <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600 dark:bg-secondary dark:text-primary">
               <th className="px-6 py-3 text-left">Language</th>
               <th className="px-6 py-3 text-left">Title</th>
               <th className="px-6 py-3 text-left">Runtime</th>
               <th className="px-6 py-3 text-left">Upload On</th>
               <th className="px-6 py-3 text-left">Contributor</th>
            </tr>
         </thead>
         <tbody className="text-sm font-light text-gray-600 dark:text-gray-300">
            {subtitles.map((subtitle) => {
               const isSameLang = currentLang === subtitle.language.value
               currentLang = subtitle.language.value
               return (
                  <Fragment key={subtitle._id}>
                     {!isSameLang && (
                        <tr className="group h-11 transition-colors duration-200 dark:odd:bg-black dark:even:bg-secondary">
                           <td colSpan={5} />
                        </tr>
                     )}
                     <tr className="group transition-colors duration-200 odd:bg-black even:bg-white hover:bg-gray-100 dark:border-gray-700 dark:even:bg-secondary dark:hover:bg-white/10">
                        <td className="px-6 py-3 text-left">
                           {subtitle.language.label}
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-left">
                           <Link
                              className="font-medium group-hover:text-primary"
                              href={`/subtitle/${subtitle._id}`}
                           >
                              {subtitle.title}
                           </Link>
                        </td>
                        <td className="px-6 py-3 text-left">
                           {subtitle.runtime}
                        </td>
                        <td className="px-6 py-3 text-left">
                           {moment(subtitle.createdAt).format('DD-MM-YYYY')}
                        </td>
                        <td className="px-6 py-3 text-left">
                           <Link href={`/contributor/${subtitle.user_id._id}`}>
                              {subtitle.user_id.name}
                           </Link>
                        </td>
                     </tr>
                  </Fragment>
               )
            })}
         </tbody>
      </table>
   )
}
