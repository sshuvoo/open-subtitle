'use client'

import { IoBan, IoCloudUploadOutline } from 'react-icons/io5'
import { FaRegCheckCircle } from 'react-icons/fa'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { byteToKB } from '@/utils/byte-to-killobyte'

export const DragAndDrop = ({ error }: { error?: string }) => {
   const inputRef = useRef<HTMLInputElement>(null)
   const [status, setStatus] = useState<'allowed' | 'not-allowed' | 'idle'>(
      'idle'
   )

   const [file, setFile] = useState<File>()

   const handleClick = () => {
      if (inputRef.current) {
         inputRef.current.click()
      }
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         setFile(e.target.files[0])
      }
   }

   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (
         inputRef.current &&
         e.dataTransfer.files[0].type === 'application/x-zip-compressed' &&
         byteToKB(e.dataTransfer.files[0].size) < 400
      ) {
         inputRef.current.files = e.dataTransfer.files
         setFile(e.dataTransfer.files[0])
         console.log()
      }
      setStatus('idle')
   }

   const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
      const files = Array.from(e.dataTransfer.items)
      console.log(files[0].type === 'application/x-zip-compressed')

      if (files[0].type === 'application/x-zip-compressed') {
         setStatus('allowed')
      } else setStatus('not-allowed')
   }

   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setStatus('idle')
   }

   return (
      <div
         onDrop={handleDrop}
         onDragOver={handleDragEnter}
         onDragLeave={handleDragLeave}
         className={`relative flex h-52 w-full max-w-lg flex-col items-center space-y-4 rounded-md border border-dashed p-4 ${status === 'allowed' ? 'border-primary bg-primary/10' : ''} ${status === 'not-allowed' ? 'border-red-500 bg-red-500/10' : ''} ${status === 'idle' ? 'border-slate-500 bg-secondary' : ''}`}
      >
         {status === 'idle' && (
            <IoCloudUploadOutline className="pointer-events-none text-6xl" />
         )}
         {status === 'not-allowed' && (
            <IoBan className="pointer-events-none text-6xl text-red-500" />
         )}
         {status === 'allowed' && (
            <FaRegCheckCircle className="pointer-events-none text-6xl text-primary" />
         )}
         <h3 className="pointer-events-none text-xl">
            {file?.name ? file?.name : 'Upload Subtitle'}
         </h3>
         {status === 'idle' && (
            <p className="pointer-events-none text-sm">
               Drag and drop .zip files less than 400KB in size. <br />
               <span className="text-sm text-red-500">{error}</span>
            </p>
         )}
         {status === 'not-allowed' && (
            <p className="pointer-events-none text-sm text-red-500">
               Invalid file format or size.
            </p>
         )}
         {status === 'allowed' && (
            <p className="pointer-events-none text-sm text-primary">
               Everything looks good. Just Drop it.
            </p>
         )}
         <input
            onChange={handleChange}
            ref={inputRef}
            hidden
            type="file"
            accept=".zip"
            multiple={false}
            name="subtitle-file"
         />
         <button
            type="button"
            onClick={handleClick}
            className="absolute -bottom-4 flex w-1/2 items-center justify-center gap-2 rounded bg-primary py-2 text-sm font-semibold text-black hover:bg-primary/90"
         >
            Select File
         </button>
      </div>
   )
}
