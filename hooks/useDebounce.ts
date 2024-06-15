import { useRef } from 'react'

export const useDebounce = <T extends any[]>(
   fn: (...args: T) => void,
   delay: number
) => {
   const timeoutId = useRef<NodeJS.Timeout | undefined>()

   return (...args: T) => {
      if (timeoutId.current) {
         clearTimeout(timeoutId.current)
      }
      timeoutId.current = setTimeout(() => {
         fn(...args)
      }, delay)
   }
}
