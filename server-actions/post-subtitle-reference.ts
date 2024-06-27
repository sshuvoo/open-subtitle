'use server'

import { Subtitle } from '@/models/subtitle'
import { Subtitle_T } from '@/types/subtitle'

export const postSubtitleReference = async (subtitle: Subtitle_T) => {
   const response = await Subtitle.create(subtitle)
   if (response) return response._id.toString()
}
