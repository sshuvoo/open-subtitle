'use server'

import { firebaseApp } from '@/firebase'
import { Subtitle } from '@/models/subtitle'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { revalidatePath } from 'next/cache'

export const requestDownload = async (filePath: string, sub_id: string) => {
   const storage = getStorage(firebaseApp)
   try {
      const subDownloadUrl = await getDownloadURL(
         ref(storage, `subtitles/${filePath}`)
      )
      if (subDownloadUrl) {
         await Subtitle.findByIdAndUpdate(
            sub_id,
            {
               $inc: { downloads: 1 },
            },
            { upsert: true }
         )
         revalidatePath(`/subtitle/${sub_id}`)
         return subDownloadUrl
      }
   } catch (error) {}
}
