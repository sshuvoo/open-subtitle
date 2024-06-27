'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { searchMovies } from '@/server-actions/search-movies'
import { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { SearchSubmitButton } from './search-submit-button'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'

const dropdownVariants = {
   hidden: { opacity: 0, y: -20 },
   visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.1,
         type: 'spring',
         stiffness: 50,
      },
   }),
}

export const SearchBar = () => {
   const [searchResult, setSearchResult] = useState([])
   const [isOpen, setIsOpen] = useState(false)
   const modalRef = useClickOutside(isOpen, () => setIsOpen(false))

   const handleSearch = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
         e.target.form?.requestSubmit()
      }
   }, 1000)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleSearch(e)
   }

   const clientAction = async (formData: FormData) => {
      try {
         const movies = await searchMovies(formData)
         if (movies.length > 0) setIsOpen(true)
         setSearchResult(movies)
      } catch (error) {}
   }

   return (
      <form action={clientAction} className="relative w-full md:w-[500px]">
         <Input
            onChange={handleChange}
            placeholder="Search Movies"
            name="query_term"
            type="text"
         />
         <SearchSubmitButton />
         <AnimatePresence>
            {searchResult.length > 0 && isOpen && (
               <motion.div
                  ref={modalRef}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute top-14 z-[1000] max-h-[571px] w-full divide-y divide-white/5 overflow-y-auto rounded border-2 border-white/20 bg-secondary p-2 shadow-xl"
               >
                  {searchResult.map((movie: any, index) => (
                     <motion.div
                        custom={index}
                        variants={dropdownVariants}
                        key={movie.id}
                        onClick={() => setIsOpen(false)}
                     >
                        <Link
                           href={`/movie/${movie.imdb_code}`}
                           className="flex gap-2 rounded p-2 hover:bg-white/10"
                        >
                           <Image
                              src={movie.medium_cover_image}
                              alt=""
                              width={50}
                              height={20}
                           />
                           <div className="text-[#c9c9c9]">
                              <h2>{movie.title}</h2>
                              <h3 className="text-sm text-[#858585]">
                                 {movie.year}
                              </h3>
                              <h3 className="text-sm text-[#858585]">
                                 {movie.genres.length < 3
                                    ? movie.genres.join('/')
                                    : movie.genres.slice(0, 3).join('/')}
                              </h3>
                           </div>
                        </Link>
                     </motion.div>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </form>
   )
}
