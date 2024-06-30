'use server'

import { auth } from '@/auth'
import { firebaseApp } from '@/firebase'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { postSubtitleReference } from './post-subtitle-reference'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { languages } from '@/static-data/languages'

const fileValidator = z
   .instanceof(File)
   .refine(
      (file) =>
         file.type === 'application/zip' ||
         file.type === 'application/x-zip-compressed',
      'File must be a .zip file'
   )

const schema = z.object({
   title: z.string().min(1, 'Title is required'),
   runtime: z.string().min(1, 'Runtime is required'),
   message: z.string().min(1, 'Message is required'),
   language: z.string().min(1, 'Language is required'),
   subtitleFile: fileValidator,
})

export const postSubtitle = async (prevState: any, formData: FormData) => {
   const session = await auth()
   if (!session) throw new Error('Please login to post a subtitle')

   const subtitleFile = formData.get('subtitle-file') as File
   const title = formData.get('title')?.toString()!
   const runtime = formData.get('runtime')?.toString()!
   const message = formData.get('message')?.toString()!
   const language = formData.get('language')?.toString()!

   const validatedFields = schema.safeParse({
      title,
      runtime,
      message,
      language,
      subtitleFile,
   })
   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }
   const lang_code = languages.find((lang) => lang.value === language)
   if (!lang_code) return { message: 'Invalid Language code' }
   const mongo_id = formData.get('mongo_id')?.toString()!
   const imdb_id = formData.get('imdb_id')?.toString()!
   const storage = getStorage(firebaseApp)
   const filePath = `${imdb_id}-${session.user?.id}-${Date.now()}.zip`
   const subtitleRef = ref(storage, `subtitles/${filePath}`)

   let subtitleId: string | null
   try {
      await uploadBytes(subtitleRef, subtitleFile)
      subtitleId = await postSubtitleReference({
         mongo_id,
         imdb_id,
         user_id: session.user?.id!,
         title,
         runtime,
         message,
         language: lang_code,
         filePath,
      })
   } catch (error: any) {
      console.log(error)
      return { message: error?.message }
   }
   if (subtitleId) redirect(`/subtitle/${subtitleId}`)
}
