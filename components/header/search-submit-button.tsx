import { ImSpinner2 } from 'react-icons/im'
import { FiSearch } from 'react-icons/fi'
import { useFormStatus } from 'react-dom'

export const SearchSubmitButton = () => {
   const { pending } = useFormStatus()

   return (
      <button
         disabled={pending}
         type="submit"
         className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-primary"
      >
         {pending ? <ImSpinner2 className="animate-spin" /> : <FiSearch />}
      </button>
   )
}
