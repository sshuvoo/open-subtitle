import { useEffect, useRef } from 'react'

export const useClickOutside = (isOpen: boolean, onClose: () => void) => {
   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            onClose()
         }
      }

      if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside)
      } else {
         document.removeEventListener('mousedown', handleClickOutside)
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [isOpen, onClose])

   return ref
}
