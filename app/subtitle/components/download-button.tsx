'use client'

import { requestDownload } from '@/server-actions/request-download'
import { useFormStatus } from 'react-dom'
import { HiOutlineDownload } from 'react-icons/hi'
import { ImSpinner2 } from 'react-icons/im'

export const DownloadSubmit = () => {
   const { pending } = useFormStatus()

   return (
      <button
         type="submit"
         disabled={pending}
         className="flex w-fit items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
      >
         {pending ? (
            <>
               <ImSpinner2 className="animate-spin text-lg" />
               <span>Downloading...</span>
            </>
         ) : (
            <>
               <HiOutlineDownload className="text-lg" />
               <span>Download Subtitle</span>
            </>
         )}
      </button>
   )
}

interface Props {
   filePath: string
   title: string
   sub_id: string
}

export const DownloadForm = ({ filePath, sub_id }: Props) => {
   const clientAction = async () => {
      try {
         const downloadUrl = await requestDownload(filePath, sub_id)
         if (downloadUrl) {
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = 'my-subtitle.zip'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
         }
      } catch (error) {}
   }

   return (
      <form action={clientAction}>
         <DownloadSubmit />
      </form>
   )
}
