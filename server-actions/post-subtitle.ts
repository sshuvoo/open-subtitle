'use server'

import { auth } from '@/auth'
import { firebaseApp } from '@/firebase'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { postSubtitleReference } from './post-subtitle-reference'
import { z } from 'zod'

const fileValidator = z
   .instanceof(File)
   .refine(
      (file) =>
         file.type === 'application/zip' ||
         file.type === 'application/x-zip-compressed',
      'file must be a .zip file'
   )

const schema = z.object({
   title: z.string().min(1, 'title is required'),
   runtime: z.string().min(1, 'runtime is required'),
   language: z.string().min(1, 'language is required'),
   subtitleFile: fileValidator,
})

export const postSubtitle = async (prevState: any, formData: FormData) => {
   const session = await auth()
   if (!session) throw new Error('Please login to post a subtitle')

   const subtitleFile = formData.get('subtitle-file') as File
   const title = formData.get('title')?.toString()!
   const runtime = formData.get('runtime')?.toString()!
   const language = formData.get('language')?.toString()!

   const validatedFields = schema.safeParse({
      title,
      runtime,
      language,
      subtitleFile,
   })
   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
      }
   }

   const mongo_id = formData.get('mongo_id')?.toString()!
   const yts_id = formData.get('yts_id')?.toString()!
   const imdb_id = formData.get('imdb_id')?.toString()!
   const storage = getStorage(firebaseApp)
   const filePath = `${mongo_id}-${session.user?.id}-${Date.now()}.zip`
   const subtitleRef = ref(storage, filePath)
   try {
      await uploadBytes(subtitleRef, subtitleFile)
      await postSubtitleReference({
         mongo_id,
         yts_id,
         imdb_id,
         user_id: session.user?.id!,
         title,
         runtime,
         language,
         filePath,
      })
   } catch (error: any) {
      return { message: error?.message }
   }
}
