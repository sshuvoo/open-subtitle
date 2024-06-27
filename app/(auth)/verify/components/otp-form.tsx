'use client'

import { Input } from '@/components/ui/input'
import { verifyEmail } from '@/server-actions/verify-otp'
import { ChangeEvent, useRef } from 'react'
import AuthSubmitButton from '../../components/auth-submit'
import LoadingIndicator from './loading-indicator'
import { useFormState } from 'react-dom'
import { requestNewOtp } from '@/server-actions/request-otp'

interface Props {
   searchParams: {
      email: string
      password: string
   }
}

export default function OtpForm({ searchParams }: Props) {
   const formRef = useRef<HTMLFormElement>(null)

   const [state, formAction] = useFormState(verifyEmail, { message: '' })
   const [newOtpState, newOtpAction] = useFormState(requestNewOtp, {
      message: '',
   })

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value === '') {
         const sibling =
            e.currentTarget.parentElement?.parentElement?.previousElementSibling
         if (sibling) {
            const child = sibling.childNodes[0]?.childNodes[0]
            if (child instanceof HTMLInputElement) {
               child.focus()
            }
         }
      } else if (!isNaN(Number(e.currentTarget.value))) {
         const sibling =
            e.currentTarget.parentElement?.parentElement?.nextElementSibling
         if (sibling) {
            const child = sibling.childNodes[0]?.childNodes[0]
            if (child instanceof HTMLInputElement) {
               child.focus()
            }
         } else {
            if (formRef.current) {
               console.log('ggggggg')
               const formData = new FormData(formRef.current)
               const digit1 = formData.get('digit1')
               const digit2 = formData.get('digit2')
               const digit3 = formData.get('digit3')
               const digit4 = formData.get('digit4')
               const digit5 = formData.get('digit5')
               if (digit1 && digit2 && digit3 && digit4 && digit5) {
                  console.log('ggggggg')
                  e.target.form?.requestSubmit()
               }
            }
         }
      }
   }

   return (
      <>
         <form ref={formRef} action={formAction} className="mt-10">
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
            <div>
               <input
                  type="text"
                  hidden
                  defaultValue={searchParams.email}
                  name="email"
               />
               <input
                  type="text"
                  hidden
                  defaultValue={searchParams.password}
                  name="password"
               />
            </div>
            <LoadingIndicator />
            {state?.message && (
               <div className="mt-6">
                  <p className="rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                     {state.message}
                  </p>
               </div>
            )}
         </form>
         <form action={newOtpAction} className="mt-10">
            <div>
               <input
                  type="text"
                  hidden
                  defaultValue={searchParams.email}
                  name="email"
               />
               <input
                  type="text"
                  hidden
                  defaultValue={searchParams.password}
                  name="password"
               />
            </div>
            <AuthSubmitButton
               pendingMsg="Requesting..."
               title="Request for new OTP"
            />
            {newOtpState?.message && (
               <div className="mt-6">
                  <p className="border-primary/60 bg-primary/10 text-primary rounded-md border px-4 py-3 text-sm">
                     {newOtpState.message}
                  </p>
               </div>
            )}
         </form>
      </>
   )
}
