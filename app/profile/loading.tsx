import { ImSpinner2 } from 'react-icons/im'

export default function loading() {
   return (
      <div>
         <div className="container flex min-h-[calc(100vh-81px)] items-center justify-center">
            <ImSpinner2 className="animate-spin text-5xl text-primary" />
         </div>
      </div>
   )
}
