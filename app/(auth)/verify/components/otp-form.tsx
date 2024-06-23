'use client'

import { Input } from '@/components/ui/input'
import { verifyEmail } from '@/server-actions/verify-otp'
import { ChangeEvent, useRef } from 'react'
import AuthSubmitButton from '../../components/auth-submit'
import LoadingIndicator from './loading-indicator'

interface Props {
   searchParams: {
      email: string
      password: string
   }
}

export default function OtpForm({ searchParams }: Props) {
   // const [otps, setOtps] = useState<string[]>(Array(5).fill(''))

   const formRef = useRef<HTMLFormElement>(null)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      // const index =
      //    Number(e.currentTarget.name[e.currentTarget.name.length - 1]) - 1
      // setOtps(otps.map((otp, i) => (i === index ? e.currentTarget.value : otp)))

      if (e.currentTarget.value === '') {
         const sibling =
            e.currentTarget.parentElement?.parentElement?.previousElementSibling
         if (sibling) {
            const child = sibling.childNodes[0].childNodes[0]
            if (child instanceof HTMLInputElement) {
               child.focus()
            }
         }
      } else if (!isNaN(Number(e.currentTarget.value))) {
         const sibling =
            e.currentTarget.parentElement?.parentElement?.nextElementSibling
         if (sibling) {
            const child = sibling.childNodes[0].childNodes[0]
            if (child instanceof HTMLInputElement) {
               child.focus()
            }
         } else {
            if (formRef.current) {
               const formData = new FormData(formRef.current)
               const digit1 = formData.get('digit1')
               const digit2 = formData.get('digit2')
               const digit3 = formData.get('digit3')
               const digit4 = formData.get('digit4')
               const digit5 = formData.get('digit5')
               if (digit1 && digit2 && digit3 && digit4 && digit5) {
                  e.target.form?.requestSubmit()
               }
            }
         }
      }
   }

   const updatedAction = verifyEmail.bind(null, {
      otp: `12345`,
      email: searchParams.email,
      password: searchParams.password,
   })

   return (
      <>
         <form ref={formRef} action={updatedAction} className="mt-10">
            <div className="flex justify-center gap-4">
               <div className="w-fit">
                  <Input
                     maxLength={1}
                     onChange={handleChange}
                     type="text"
                     className="h-12 w-12 text-center text-2xl"
                     name="digit1"
                  />
               </div>
               <div className="w-fit">
                  <Input
                     maxLength={1}
                     onChange={handleChange}
                     type="text"
                     className="h-12 w-12 text-center text-2xl"
                     name="digit2"
                  />
               </div>
               <div className="w-fit">
                  <Input
                     maxLength={1}
                     onChange={handleChange}
                     type="text"
                     className="h-12 w-12 text-center text-2xl"
                     name="digit3"
                  />
               </div>
               <div className="w-fit">
                  <Input
                     maxLength={1}
                     onChange={handleChange}
                     type="text"
                     className="h-12 w-12 text-center text-2xl"
                     name="digit4"
                  />
               </div>
               <div className="w-fit">
                  <Input
                     maxLength={1}
                     onChange={handleChange}
                     type="text"
                     className="h-12 w-12 text-center text-2xl"
                     name="digit5"
                  />
               </div>
            </div>
            <LoadingIndicator />
         </form>
         <form className="mt-10">
            <AuthSubmitButton
               pendingMsg="Requesting..."
               title="Request for new OTP"
            />
         </form>
      </>
   )
}
