import { Textarea } from '@/components/ui/textarea'
import { getSingleFromMongo } from '@/server-actions/get-single-from-mongodb'
import { getSingleSubtitle } from '@/server-actions/get-single-subtitle'
import { LanguageObject } from '@/static-data/languages'
import { getBase64 } from '@/utils/get-base-64'
import moment from 'moment'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { HiOutlineDownload } from 'react-icons/hi'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { BsEmojiAngry } from 'react-icons/bs'
import { BsEmojiFrown } from 'react-icons/bs'
import { BsEmojiNeutral } from 'react-icons/bs'
import { BsEmojiSunglasses } from 'react-icons/bs'

interface Props {
   params: {
      subtitleId: string
   }
}

export default async function SubtitleDetails({ params }: Props) {
   const subtitle = await getSingleSubtitle(params.subtitleId)
   if (!subtitle) notFound()
   const movie: any = await getSingleFromMongo(subtitle.imdb_id)
   console.log(movie)
   if (!movie.large_cover_image) notFound()
   const { base64 } = await getBase64(movie?.large_cover_image)

   return (
      <div className="dark:text-gray-100">
         <div className="container mx-auto">
            <div className="mb-6 mt-10 grid grid-cols-[1fr,auto] gap-4 rounded-lg bg-white p-6 shadow dark:bg-secondary lg:mt-20">
               <div className="flex flex-col justify-between">
                  <h2 className="mb-4 text-4xl font-bold">
                     {movie.title_long}
                  </h2>
                  <div>
                     <p className="mb-2">Subtitle Title: {subtitle.title}</p>
                     <p className="mb-2">
                        Sub. Language: {LanguageObject[subtitle.language]}
                     </p>
                     <p className="mb-2">
                        Release Date:{' '}
                        {moment(subtitle.createdAt).format('DD-MM-YYYY')}
                     </p>
                     <p className="mb-2">Contributor: Saffaullah SHuvo</p>
                     <p>
                        প্রিয় দর্শকবৃন্দ, আসসালামু আলাইকুম! আপনারা সবাইকে
                        আন্তরিক শুভেচ্ছা জানাচ্ছি। আমরা অত্যন্ত আনন্দের সাথে
                        জানাচ্ছি যে, আপনাদের প্রিয় সিনেমা ডেডপুল ২-এর বাংলা
                        সাবটাইটেল আমরা এখানে আপলোড করেছি। এই সাবটাইটেলটি তৈরিতে
                        আমাদের প্রচুর সময় ও শ্রম ব্যয় হয়েছে। আমরা চেষ্টা
                        করেছি সর্বোত্তম মান বজায় রাখতে, যাতে আপনারা এই মজার ও
                        এক্সাইটিং সিনেমার প্রতিটি সংলাপ ও মুহূর্ত উপভোগ করতে
                        পারেন। সাবটাইটেলটি মূল সংলাপের সাথে যথাসম্ভব সঠিকভাবে
                        মিলিয়ে তৈরি করা হয়েছে।
                     </p>
                  </div>
                  <button className="flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black">
                     <HiOutlineDownload className="text-lg" />
                     <span>Download Subtitle</span>
                  </button>
               </div>
               <div className="h-fit w-fit rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-1">
                  <Image
                     className="rounded-md"
                     src={movie.large_cover_image}
                     width={250}
                     height={375}
                     alt={movie.title}
                     placeholder="blur"
                     blurDataURL={base64}
                  />
               </div>
            </div>
            {/*  */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-secondary">
               <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
               <div className="mb-4">
                  <div className="mb-4 flex items-center gap-3">
                     <button
                        title="1. Very dissatisfied"
                        className="text-3xl text-white/30"
                     >
                        <BsEmojiAngry />
                     </button>
                     <button
                        title="2. Dissatisfied"
                        className="text-3xl text-white/30"
                     >
                        <BsEmojiFrown />
                     </button>
                     <button
                        title="3. Neutral"
                        className="text-3xl text-white/30"
                     >
                        <BsEmojiNeutral />
                     </button>
                     <button
                        title="4. Satisfied"
                        className="text-3xl text-primary"
                     >
                        <BsEmojiSunglasses />
                     </button>
                     <button
                        title="5. Very satisfied"
                        className="text-3xl text-white/30"
                     >
                        <BsEmojiHeartEyes />
                     </button>
                  </div>
                  <Textarea placeholder="Write an appreciation" />
                  <button className="rounded bg-blue-500 px-4 py-2 text-white dark:bg-blue-700">
                     Submit
                  </button>
               </div>
               <div className="space-y-4">
                  <div className="rounded bg-gray-100 p-4 dark:bg-gray-700">
                     <p className="mb-1">Great subtitle! Helped a lot.</p>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        - Jane Doe, 5 stars
                     </p>
                  </div>
                  <div className="rounded bg-gray-100 p-4 dark:bg-gray-700">
                     <p className="mb-1">Good quality, thanks!</p>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        - John Smith, 4 stars
                     </p>
                  </div>
               </div>
            </div>
            {/*  */}

            <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-secondary">
               <h2 className="mb-4 text-2xl font-bold">
                  Contributor Information
               </h2>
               <div className="mb-4 flex items-center">
                  <img
                     src="https://via.placeholder.com/100"
                     alt="Contributor"
                     className="mr-4 h-24 w-24 rounded-full"
                  />
                  <div>
                     <p className="text-xl font-semibold">John Doe</p>
                     <p className="text-gray-600 dark:text-gray-400">
                        Subtitle Contributor
                     </p>
                  </div>
               </div>
               <p className="mb-2">
                  Bio: Passionate about movies and languages. Loves to
                  contribute to the community.
               </p>
               <div className="flex space-x-4">
                  <a href="#" className="text-blue-500">
                     Twitter
                  </a>
                  <a href="#" className="text-blue-500">
                     Facebook
                  </a>
                  <a href="#" className="text-blue-500">
                     LinkedIn
                  </a>
               </div>
            </div>
            {/*  */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-secondary">
               <h2 className="mb-4 text-2xl font-bold">
                  Popular Subtitles by this Contributor
               </h2>
               <ul className="space-y-2">
                  <li className="rounded bg-gray-100 p-4 dark:bg-gray-700">
                     <p>Subtitle 1</p>
                  </li>
                  <li className="rounded bg-gray-100 p-4 dark:bg-gray-700">
                     <p>Subtitle 2</p>
                  </li>
                  <li className="rounded bg-gray-100 p-4 dark:bg-gray-700">
                     <p>Subtitle 3</p>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}
