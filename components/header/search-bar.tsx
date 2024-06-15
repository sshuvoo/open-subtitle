'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { searchMovies } from '@/server-actions/search-movies'
import { ChangeEvent } from 'react'
import { Input } from '../ui/input'
import { SearchSubmitButton } from './search-submit-button'

export const SearchBar = () => {
   const handleSearch = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
      e.target.form?.requestSubmit()
   }, 2000)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleSearch(e)
   }

   return (
      <form action={searchMovies} className="relative w-[500px]">
         <Input
            onChange={handleChange}
            placeholder="Search Movies"
            name="query_term"
            type="text"
         />
         <SearchSubmitButton />
      </form>
   )
}
