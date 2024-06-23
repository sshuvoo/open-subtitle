import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

export default function LoadingIndicator() {
   const { pending } = useFormStatus()

   return (
      pending && (
         <div className="mt-5 flex items-center justify-center gap-3 text-primary">
            <ImSpinner2 className="animate-spin text-lg" />
            <span>Connecting...</span>
         </div>
      )
   )
}
